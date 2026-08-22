# Third-party notice

The shader effects in this folder are ported from [ThreeUI](https://threeui.com)
([MengTo/threeui](https://github.com/MengTo/threeui)), which is MIT licensed.

Nothing is installed from the `@designcodeio/threeui` package. Each effect's
GLSL was copied and adapted by hand, and the React wrappers were replaced with
our own Vue runtime (`src/composables/useShaderCanvas.js` +
`src/components/Visuals/ShaderCanvas.vue`). Only Community-tier components —
the ones published under MIT — were used; no Pro components are included.

Changes made to the upstream shaders:

- Palettes retuned from upstream's teal/indigo/violet to this site's
  green (`#42b883`) → blue (`#3e71fa`) accent ramp.
- Background base colours matched to `--black` (`#010409`).
- `stream-convergence`: upstream drives its three bands straight into the r/g/b
  channels; here each band is tinted with a palette colour instead.

Ported effects: `ribbon-field`, `stream-convergence`.

---

MIT License

Copyright (c) 2026 Meng To

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
