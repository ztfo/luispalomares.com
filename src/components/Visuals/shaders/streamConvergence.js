// Stream Convergence — angled bands of light sweeping across a vignette.
//
// Ported from ThreeUI's `stream-convergence` by Meng To (MIT licence, see
// https://github.com/MengTo/threeui). Upstream drives the three bands into the
// raw r/g/b channels for a violet-indigo look; here each band is tinted with a
// colour from the site's green → blue ramp instead, so it matches the rest of
// the accent work.
//
// Lighter than ribbonField (no dot matrix, no hashing), which makes it a better
// fit behind content that scrolls, e.g. project card headers.

export const streamConvergence = {
  name: 'stream-convergence',

  staticTime: 4.0,

  defaults: {
    speed: 1,
    fidelity: 0.5,
    opacity: 1,
    hue: 0,
    saturation: 1,
    brightness: 1,
  },

  uniforms: {
    resolution: 'u_resolution',
    time: 'u_time',
  },

  // Effect-specific floats, mapped from settings key -> GLSL uniform name.
  scalars: {
    fidelity: 'u_fidelity',
  },

  vertex: `
    attribute vec2 position;
    varying vec2 vUv;
    void main() {
      vUv = position * 0.5 + 0.5;
      gl_Position = vec4(position, 0.0, 1.0);
    }
  `,

  fragment: `
    precision highp float;

    uniform float u_time;
    uniform vec2 u_resolution;
    uniform float u_fidelity;
    varying vec2 vUv;

    mat2 rotate2d(float angle) {
      return mat2(cos(angle), -sin(angle),
                  sin(angle),  cos(angle));
    }

    void main() {
      vec2 p = vUv * 2.0 - 1.0;
      p.x *= u_resolution.x / u_resolution.y;
      p = rotate2d(0.55) * p;

      vec3 green = vec3(0.259, 0.722, 0.514);
      vec3 blue  = vec3(0.243, 0.443, 0.980);
      vec3 mint  = vec3(0.404, 0.855, 0.643);

      vec3 color = vec3(0.0);
      float spread = 0.06 * (0.3 + u_fidelity * 0.7);

      // Three offset bands, each tinted and phase-shifted so they read as
      // separate streams converging rather than one thick stripe.
      for (int i = 0; i < 3; i++) {
        float offset = float(1 - i) * spread;
        float y = p.y + offset + (sin(p.x * 2.5 - u_time * 1.5) * 0.12);
        float wave = smoothstep(0.85, 0.99, sin(y * 6.0 + u_time * 2.0) * 0.5 + 0.5);

        if (i == 0) color += green * wave * 1.10;
        if (i == 1) color += mint  * wave * 0.55;
        if (i == 2) color += blue  * wave * 1.40;
      }

      float vignette = exp(-length(vUv * 2.0 - 1.0) * 0.8);
      color *= vignette;

      vec3 base = vec3(0.004, 0.016, 0.035);
      gl_FragColor = vec4(base + color, 1.0);
    }
  `,
}
