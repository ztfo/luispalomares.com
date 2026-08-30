// Registry of shader effects. Each module is plain data — GLSL plus the uniform
// names it declares — so adding one never touches the runtime.
//
// Shape: { name, vertex, fragment, uniforms, scalars?, defaults, pointerOrigin?,
// staticTime? }. See ribbonField.js for a worked example.

import { dotCloud } from './dotCloud'
import { ribbonField } from './ribbonField'
import { streamConvergence } from './streamConvergence'

export const effects = {
  [dotCloud.name]: dotCloud,
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

