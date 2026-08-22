<template lang="pug">
.shader-canvas(ref="rootRef" :class="[`shader-canvas--${resolved.name}`, { 'is-unsupported': !supported }]")
  canvas.shader-canvas__surface(ref="canvasRef" :style="canvasStyle" aria-hidden="true")
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

const resolved = computed(() => getEffect(props.effect))

const settings = computed(() => {
  const merged = { ...resolved.value.defaults }
  for (const key of Object.keys(merged)) {
    if (props[key] !== undefined) merged[key] = props[key]
  }
  // Effect-specific scalars aren't always present in defaults.
  if (props.fidelity !== undefined) merged.fidelity = props.fidelity
  return merged
})

// Settings are read fresh each frame, so prop changes take effect without
// recompiling the program.
const { rootRef, canvasRef, supported } = useShaderCanvas({
  effect: resolved.value,
  getSettings: () => settings.value,
})

const canvasStyle = computed(() => {
  const { opacity = 1, hue = 0, saturation = 1, brightness = 1 } = settings.value
  return {
    opacity,
    filter: `hue-rotate(${hue}deg) saturate(${saturation}) brightness(${brightness})`,
  }
})
</script>

<style scoped lang="scss">
.shader-canvas {
  position: absolute;
  inset: 0;
  overflow: hidden;
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
  background:
    radial-gradient(circle at 78% 38%, rgba(62, 113, 250, 0.16), transparent 55%),
    radial-gradient(circle at 62% 78%, rgba(66, 184, 131, 0.12), transparent 55%);

  .shader-canvas__surface {
    display: none;
  }
}
</style>
