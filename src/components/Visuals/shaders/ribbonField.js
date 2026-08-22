// Ribbon Field — drifting light ribbons behind a dot matrix.
//
// Ported from ThreeUI's `ribbon-field` by Meng To (MIT licence, see
// https://github.com/MengTo/threeui). The shader maths is upstream's; the
// palette is retuned from upstream's teal/indigo/purple to this site's
// green → blue accent ramp, and the background base is matched to --black
// (#010409) so the canvas blends into the panel it sits behind.

export const ribbonField = {
  name: 'ribbon-field',

  // The ribbons are biased toward the right of the canvas and darkened around
  // the left-centre, which is why upstream anchors the pointer off-centre.
  pointerOrigin: [0.72, 0.42],

  // Frame shown when the visitor prefers reduced motion. Picked so the ribbons
  // are mid-sweep rather than the flat gradient you get at t=0.
  staticTime: 6.5,

  defaults: {
    speed: 1,
    pointerAmount: 1,
    smoothing: 0.035,
    opacity: 1,
    hue: 0,
    saturation: 1,
    brightness: 1,
  },

  uniforms: {
    resolution: 'resolution',
    time: 'time',
    pointer: 'pointer',
  },

  vertex: `
    attribute vec2 position;
    void main() {
      gl_Position = vec4(position, 0.0, 1.0);
    }
  `,

  fragment: `
    precision highp float;
    uniform vec2 resolution;
    uniform float time;
    uniform vec2 pointer;

    float hash(vec2 p) {
      p = fract(p * vec2(123.34, 456.21));
      p += dot(p, p + 45.32);
      return fract(p.x * p.y);
    }

    // A soft horizontal band whose centre line wobbles with two sines.
    float ribbon(vec2 uv, float offset, float width, float phase) {
      float y = 0.55 + 0.20 * sin((uv.x * 2.15) + phase) + 0.045 * sin((uv.x * 7.0) - phase * 0.7);
      float d = abs(uv.y - y - offset);
      return exp(-(d * d) / width);
    }

    void main() {
      vec2 uv = gl_FragCoord.xy / resolution.xy;

      float t = time * 0.22;
      float drift = (pointer.x - 0.5) * 0.06;

      // Keeps the left edge (where the bio copy sits) close to flat black and
      // lets the glow build toward the panel divider on the right.
      float rightFade = smoothstep(0.28, 0.72, uv.x);
      float centerDark = 1.0 - smoothstep(0.0, 0.88, distance(uv, vec2(0.18, 0.48)));

      float r1 = ribbon(vec2(uv.x + drift, uv.y), 0.03, 0.0065, t + 0.9);
      float r2 = ribbon(vec2(uv.x - drift * 0.7, uv.y), -0.23, 0.0085, t + 3.25);
      float r3 = ribbon(vec2(uv.x + drift * 0.4, uv.y), 0.25, 0.014, t + 1.85);

      float glow = r1 * 1.14 + r2 * 1.05 + r3 * 0.48;

      // Site palette: --green through --lightblue.
      vec3 green    = vec3(0.259, 0.722, 0.514);
      vec3 mint     = vec3(0.404, 0.855, 0.643);
      vec3 blue     = vec3(0.243, 0.443, 0.980);
      vec3 deepBlue = vec3(0.180, 0.353, 0.870);
      vec3 sky      = vec3(0.353, 0.612, 1.000);

      vec3 col = vec3(0.0);
      col += mint * r1 * 0.92;
      col += green * r1 * 0.62;
      col += blue * r3 * 0.42;
      col += deepBlue * r2 * 0.66;
      col += blue * (r2 + r3) * 0.30;

      float bloom = exp(-pow(distance(uv, vec2(0.76, 0.40 + 0.035 * sin(t))), 2.0) / 0.050);
      bloom += exp(-pow(distance(uv, vec2(0.71, 0.75 + 0.025 * cos(t))), 2.0) / 0.030);
      col += sky * bloom * 0.34;

      // Dot-matrix texture: the ribbons are only visible through this grid,
      // which is what gives the effect its screen-print feel.
      vec2 grid = fract(gl_FragCoord.xy / 7.0) - 0.5;
      float dotShape = smoothstep(0.29, 0.11, length(grid));
      float noise = hash(floor(gl_FragCoord.xy / 7.0));
      float scan = 0.72 + 0.28 * sin((uv.x + uv.y) * 38.0 + time * 1.3);
      float dots = dotShape * (0.48 + 0.52 * noise) * scan;

      float micro = hash(gl_FragCoord.xy + time) * 0.035;
      float alpha = clamp((glow * 1.55 + bloom * 0.50) * dots * rightFade, 0.0, 1.0);
      alpha *= 1.0 - centerDark * 0.56;

      // Matches --black so the canvas is indistinguishable from the panel
      // wherever the effect fades out.
      vec3 base = vec3(0.004, 0.016, 0.035);
      vec3 finalColor = mix(base, col, clamp(alpha * 1.55, 0.0, 1.0));
      finalColor += micro * rightFade;

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `,
}
