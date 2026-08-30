<template lang="pug">
.shader-canvas(ref="rootRef" :style="gradeStyle" :class="[`shader-canvas--${resolved.name}`, { 'is-unsupported': !supported }]")
  canvas.shader-canvas__surface(ref="canvasRef" aria-hidden="true")
</template>

<script setup>
import { computed } from 'vue'
import { useShaderCanvas } from '@/composables/useShaderCanvas'
import { getEffect } from './shaders'

const props = defineProps({
  // Registry name (e.g. 'ribbon-field') or an effect module object.
  effect: { type: [String, Object], required: true },

  // Left undefined so the effect's own defaults win unless explicitly set.
  speed: { type: Number, default: undefined },
  pointerAmount: { type: Number, default: undefined },
  smoothing: { type: Number, default: undefined },
  fidelity: { type: Number, default: undefined },

  // Colour grading. Applied as a CSS filter on the canvas rather than in GLSL:
  // it costs nothing on the GPU and means one shader can be re-tinted per
  // placement without recompiling.
  opacity: { type: Number, default: undefined },
  hue: { type: Number, default: undefined },
  saturation: { type: Number, default: undefined },
  brightness: { type: Number, default: undefined },
})

// Read once: the program is compiled in onMounted and never recompiled, so a
// computed here would imply a reactivity the runtime does not honour.
const resolved = getEffect(props.effect)

const settings = computed(() => {
  const merged = { ...resolved.defaults }
  // Iterate the props, not the defaults: an effect that omits a key from its
  // defaults would otherwise silently ignore that prop.
  for (const key of Object.keys(props)) {
    if (key !== 'effect' && props[key] !== undefined) merged[key] = props[key]
  }
  return merged
})

// Settings are read fresh each frame, so prop changes take effect without
// recompiling the program.
const { rootRef, canvasRef, supported, ready } = useShaderCanvas({
  effect: resolved,
  getSettings: () => settings.value,
})

// On the wrapper rather than the canvas, so the no-WebGL gradient fallback is
// graded to match instead of showing at full strength.
const gradeStyle = computed(() => {
  const { opacity = 1, hue = 0, saturation = 1, brightness = 1 } = settings.value
  // An identity filter is still a filter: it forces a compositing layer and a
  // full-surface pass on every repaint. The home page passes no grading at all.
  const graded = hue !== 0 || saturation !== 1 || brightness !== 1

  return {
    // Held at 0 until there is something to show — a drawn frame, or the CSS
    // fallback when WebGL is unavailable.
    opacity: ready.value ? opacity : 0,
    filter: graded
      ? `hue-rotate(${hue}deg) saturate(${saturation}) brightness(${brightness})`
      : 'none',
  }
})
</script>

<style scoped lang="scss">
.shader-canvas {
  position: absolute;
  inset: 0;
  overflow: hidden;
  transition: opacity 0.6s ease;
  // Purely decorative: never intercept clicks or text selection. Pointer
  // tracking still works — the runtime listens on the positioned ancestor,
  // which does receive events.
  pointer-events: none;
}

.shader-canvas__surface {
  display: block;
  width: 100%;
  height: 100%;
}


// No WebGL (old browser, blocklisted GPU, headless): fall back to a static
// wash in the same palette instead of a black hole where the effect should be.
.shader-canvas.is-unsupported {
  // The third stop stands in for the top-left cluster the ribbon shader
  // paints. Placements whose mask closes that corner simply never show it.
  background:
    radial-gradient(circle at 78% 38%, rgba(62, 113, 250, 0.16), transparent 55%),
    radial-gradient(circle at 62% 78%, rgba(66, 184, 131, 0.12), transparent 55%),
    radial-gradient(circle at 8% 4%, rgba(66, 184, 131, 0.10), transparent 45%);

  .shader-canvas__surface {
    display: none;
  }
}
</style>
