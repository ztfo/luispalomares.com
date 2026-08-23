// Minimal WebGL runtime for full-bleed fragment-shader backgrounds.
//
// Every effect is a single fragment shader drawn over two triangles covering
// the viewport, so there is no scene graph to maintain.
//
// Approach ported from ThreeUI by Meng To (MIT) — see shaders/NOTICE.md.
//
// Everything runs inside onMounted, so `nuxi generate` prerenders the markup
// without touching WebGL; the canvas stays empty until hydration.

import { onBeforeUnmount, onMounted, shallowRef } from 'vue'

// Retina is worth it, but past 2x we're burning fill rate nobody can see.
const MAX_PIXEL_RATIO = 2

function compileShader(gl, type, source, label) {
  const shader = gl.createShader(type)
  if (!shader) return null

  gl.shaderSource(shader, source)
  gl.compileShader(shader)

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    // A shader that fails to compile is a bug we want to see in dev, but it
    // must never take the page down — the caller falls back to a flat panel.
    console.error(`[shader-canvas] ${label} failed to compile:`, gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
  }

  return shader
}

function createProgram(gl, vertexSource, fragmentSource) {
  const vertex = compileShader(gl, gl.VERTEX_SHADER, vertexSource, 'vertex shader')
  if (!vertex) return null

  const fragment = compileShader(gl, gl.FRAGMENT_SHADER, fragmentSource, 'fragment shader')
  if (!fragment) {
    gl.deleteShader(vertex)
    return null
  }

  const program = gl.createProgram()
  if (!program) {
    gl.deleteShader(vertex)
    gl.deleteShader(fragment)
    return null
  }

  gl.attachShader(program, vertex)
  gl.attachShader(program, fragment)
  gl.linkProgram(program)

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('[shader-canvas] program failed to link:', gl.getProgramInfoLog(program))
    gl.deleteShader(vertex)
    gl.deleteShader(fragment)
    gl.deleteProgram(program)
    return null
  }

  // The shaders are linked into the program now; the standalone objects are
  // only kept alive so we can detach them explicitly on teardown.
  return { program, vertex, fragment }
}

/**
 * Drives a fragment shader on a canvas.
 *
 * @param {object} options
 * @param {object} options.effect        Effect module (see shaders/index.js).
 * @param {Function} options.getSettings Returns the current settings object.
 *                                       Read fresh every frame so prop changes
 *                                       apply without recompiling the program.
 * @returns {{ rootRef, canvasRef, supported }}
 */
export function useShaderCanvas({ effect, getSettings }) {
  const rootRef = shallowRef(null)
  const canvasRef = shallowRef(null)
  // Drives the CSS fallback: when WebGL is unavailable the component shows a
  // static gradient instead of an empty black rectangle.
  const supported = shallowRef(true)
  // "There is something to show" — the first frame has drawn, or we've fallen
  // back to CSS. Lets the component fade in instead of snapping to full opacity.
  const ready = shallowRef(false)

  onMounted(() => {
    const root = rootRef.value
    const canvas = canvasRef.value
    if (!root || !canvas) return

    // `premultipliedAlpha: false` keeps the shader's own alpha maths intact;
    // antialiasing is pointless for a fullscreen quad with no geometry edges.
    const gl = canvas.getContext('webgl', {
      alpha: true,
      antialias: false,
      premultipliedAlpha: false,
      depth: false,
      stencil: false,
    })

    if (!gl) {
      // No WebGL: the CSS gradient fallback is what shows, and it is ready now.
      supported.value = false
      ready.value = true
      return
    }

    const uniformNames = effect.uniforms || {}
    const scalarNames = effect.scalars || {}

    let compiled = null
    let quadBuffer = null
    let uniforms = {}
    let scalarUniforms = {}

    // Pointer state. Targets are set by pointermove; the rendered values chase
    // them each frame so the motion eases instead of snapping to the cursor.
    const origin = effect.pointerOrigin || [0.5, 0.5]
    let pointerX = origin[0]
    let pointerY = origin[1]
    let targetX = origin[0]
    let targetY = origin[1]

    let frame = 0
    let visible = true
    let contextLost = false
    // Accumulated shader time. Tracked separately from wall-clock so that
    // pausing (offscreen, hidden tab) freezes the animation rather than
    // letting it jump forward when it resumes.
    let elapsed = 0
    let lastTimestamp = 0

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    // Enforced centrally: one static frame, no rAF loop.
    let reducedMotion = reducedMotionQuery.matches

    function setup() {
      compiled = createProgram(gl, effect.vertex, effect.fragment)
      if (!compiled) {
        supported.value = false
        return false
      }

      // Cleared on success: a prior failed restore may have set this false, and
      // `.is-unsupported` display:none-s the canvas we are about to draw into.
      supported.value = true
      gl.useProgram(compiled.program)

      quadBuffer = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer)
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
        gl.STATIC_DRAW,
      )

      const position = gl.getAttribLocation(compiled.program, 'position')
      gl.enableVertexAttribArray(position)
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

      uniforms = {
        resolution: uniformNames.resolution
          ? gl.getUniformLocation(compiled.program, uniformNames.resolution)
          : null,
        time: uniformNames.time
          ? gl.getUniformLocation(compiled.program, uniformNames.time)
          : null,
        pointer: uniformNames.pointer
          ? gl.getUniformLocation(compiled.program, uniformNames.pointer)
          : null,
      }

      // Effect-specific floats (fidelity, spread, …) declared by the module.
      scalarUniforms = {}
      for (const [key, glslName] of Object.entries(scalarNames)) {
        scalarUniforms[key] = gl.getUniformLocation(compiled.program, glslName)
      }

      return true
    }

    function resize() {
      const rect = root.getBoundingClientRect()
      const ratio = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO)
      const width = Math.max(1, Math.floor(rect.width * ratio))
      const height = Math.max(1, Math.floor(rect.height * ratio))

      const resized = canvas.width !== width || canvas.height !== height
      if (resized) {
        canvas.width = width
        canvas.height = height
      }

      // Re-uploaded unconditionally, not just on a size change: after a context
      // restore the canvas is the same size but the new program's uniforms start
      // at zero, and both shaders divide by resolution.
      gl.viewport(0, 0, width, height)
      if (uniforms.resolution) gl.uniform2f(uniforms.resolution, width, height)

      // A resize while paused would otherwise leave a stretched stale frame.
      if (resized && !frame) draw(lastTimestamp || 0)
    }

    function onPointerMove(event) {
      if (!uniforms.pointer) return

      const settings = getSettings()
      const amount = settings.pointerAmount ?? 1
      const rect = root.getBoundingClientRect()

      const x = (event.clientX - rect.left) / Math.max(rect.width, 1)
      // Flip Y: pointer events are top-down, gl_FragCoord is bottom-up.
      const y = 1 - (event.clientY - rect.top) / Math.max(rect.height, 1)

      targetX = origin[0] + (x - origin[0]) * amount
      targetY = origin[1] + (y - origin[1]) * amount
    }

    function draw(timestamp) {
      const settings = getSettings()

      if (reducedMotion) {
        // Hold a representative still frame rather than t=0, which for most of
        // these effects is an uninteresting flat gradient.
        elapsed = effect.staticTime ?? 0
      } else {
        const delta = lastTimestamp ? timestamp - lastTimestamp : 0
        // Clamp so a backgrounded tab or a long frame can't lurch the animation.
        elapsed += Math.min(delta, 100) * 0.001 * (settings.speed ?? 1)
      }
      lastTimestamp = timestamp

      const smoothing = settings.smoothing ?? 0.035
      pointerX += (targetX - pointerX) * smoothing
      pointerY += (targetY - pointerY) * smoothing

      if (uniforms.time) gl.uniform1f(uniforms.time, elapsed)
      if (uniforms.pointer) gl.uniform2f(uniforms.pointer, pointerX, pointerY)

      for (const [key, location] of Object.entries(scalarUniforms)) {
        if (!location) continue
        const value = settings[key]
        if (typeof value === 'number') gl.uniform1f(location, value)
      }

      gl.drawArrays(gl.TRIANGLES, 0, 6)
      ready.value = true
    }

    function loop(timestamp) {
      draw(timestamp)
      frame = shouldAnimate() ? requestAnimationFrame(loop) : 0
    }

    function shouldAnimate() {
      return visible && !document.hidden && !reducedMotion && !contextLost
    }

    function start() {
      if (frame || contextLost) return
      if (!shouldAnimate()) {
        // Still paint once so a paused/reduced-motion canvas isn't blank.
        draw(lastTimestamp || 0)
        return
      }
      // Reset the wall-clock anchor so resuming doesn't skip ahead.
      lastTimestamp = 0
      frame = requestAnimationFrame(loop)
    }

    function stop() {
      if (!frame) return
      cancelAnimationFrame(frame)
      frame = 0
    }

    function onVisibilityChange() {
      if (document.hidden) stop()
      else start()
    }

    function onReducedMotionChange(event) {
      reducedMotion = event.matches
      if (reducedMotion) {
        stop()
        draw(lastTimestamp || 0)
      } else {
        start()
      }
    }

    // WebGL contexts are dropped by the browser under memory pressure or on GPU
    // reset. Without this the canvas would silently freeze forever.
    function onContextLost(event) {
      event.preventDefault()
      contextLost = true
      stop()
    }

    function onContextRestored() {
      // Only clear the flag on success: a failed restore leaves stale uniform
      // locations and no bound program, and must stay parked.
      if (!setup()) return
      contextLost = false
      resize()
      start()
    }

    if (!setup()) {
      // The gradient fallback paints on the same wrapper `ready` gates, so it
      // stays invisible unless we mark it ready here.
      ready.value = true
      // Release the context: a GPU that can't compile the shader would otherwise
      // leak one live context per mount until the browser force-loses others.
      onBeforeUnmount(() => gl.getExtension('WEBGL_lose_context')?.loseContext())
      return
    }

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(root)

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry?.isIntersecting ?? true
        if (visible) start()
        else stop()
      },
      { rootMargin: '80px' },
    )
    intersectionObserver.observe(root)

    // The canvas wrapper sets `pointer-events: none` so it can never swallow a
    // click, which also means it never receives pointermove. Listen on the
    // positioned ancestor instead — it covers the same box and does get events.
    const pointerTarget = root.parentElement || root
    pointerTarget.addEventListener('pointermove', onPointerMove, { passive: true })
    document.addEventListener('visibilitychange', onVisibilityChange)
    canvas.addEventListener('webglcontextlost', onContextLost)
    canvas.addEventListener('webglcontextrestored', onContextRestored)

    // Safari <14 only supports the deprecated addListener signature.
    if (reducedMotionQuery.addEventListener) {
      reducedMotionQuery.addEventListener('change', onReducedMotionChange)
    } else {
      reducedMotionQuery.addListener(onReducedMotionChange)
    }

    resize()
    start()

    onBeforeUnmount(() => {
      stop()
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      pointerTarget.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      canvas.removeEventListener('webglcontextlost', onContextLost)
      canvas.removeEventListener('webglcontextrestored', onContextRestored)

      if (reducedMotionQuery.removeEventListener) {
        reducedMotionQuery.removeEventListener('change', onReducedMotionChange)
      } else {
        reducedMotionQuery.removeListener(onReducedMotionChange)
      }

      if (quadBuffer) gl.deleteBuffer(quadBuffer)
      if (compiled) {
        gl.detachShader(compiled.program, compiled.vertex)
        gl.detachShader(compiled.program, compiled.fragment)
        gl.deleteShader(compiled.vertex)
        gl.deleteShader(compiled.fragment)
        gl.deleteProgram(compiled.program)
      }
      // Frees the GPU-side context immediately instead of waiting for GC.
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    })
  })

  return { rootRef, canvasRef, supported, ready }
}
