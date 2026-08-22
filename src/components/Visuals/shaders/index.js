// Registry of available shader effects.
//
// Effects are plain data — GLSL plus a description of which uniform names that
// GLSL uses — so adding one never means touching the runtime. Drop a module in
// this folder, register it here, and it works with <ShaderCanvas effect="…">.
//
// Effect module shape:
//   name          string   registry key, also used as a CSS hook
//   vertex        string   vertex shader source (must declare `attribute vec2 position`)
//   fragment      string   fragment shader source
//   uniforms      object   { resolution?, time?, pointer? } -> GLSL uniform names
//   scalars       object   optional { settingsKey -> GLSL uniform name } floats
//   defaults      object   default settings (speed, opacity, hue, …)
//   pointerOrigin [x, y]   rest position for the pointer uniform (default [0.5, 0.5])
//   staticTime    number   time value rendered when prefers-reduced-motion is set

import { ribbonField } from './ribbonField'
import { streamConvergence } from './streamConvergence'

export const effects = {
  [ribbonField.name]: ribbonField,
  [streamConvergence.name]: streamConvergence,
}

export function getEffect(effect) {
  if (effect && typeof effect === 'object') return effect

  const found = effects[effect]
  if (!found) {
    throw new Error(
      `[shader-canvas] unknown effect "${effect}". Available: ${Object.keys(effects).join(', ')}`,
    )
  }
  return found
}

export { ribbonField, streamConvergence }
