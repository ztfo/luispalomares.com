// Dot Cloud — the bio panel's dot matrix, on its own.
//
// ribbonField's screen-print texture (7px grid, hashed brightness, scan line)
// lit by two drifting elliptical lobes, with the ribbons, bloom and directional
// fades removed. It exists so a small surface — a project header strip — can
// carry the same visual language as the left panel without the ribbon
// composition, which is framed for a tall column and reads as streaks in a
// short one. No pointer input and no per-pixel noise: cheaper than either of
// the other two effects.

export const dotCloud = {
  name: 'dot-cloud',

  // Reduced motion: a frame where the two lobes have drifted apart, rather than
  // the stacked t=0 position.
  staticTime: 5.0,

  defaults: {
    speed: 1,
    opacity: 1,
    hue: 0,
    saturation: 1,
    brightness: 1,
  },

  uniforms: {
    resolution: 'resolution',
    time: 'time',
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

    float hash(vec2 p) {
      p = fract(p * vec2(123.34, 456.21));
      p += dot(p, p + 45.32);
      return fract(p.x * p.y);
    }

    // Soft elliptical falloff. Separate x/y radii because uv is normalised per
    // axis: one radius would track the surface's aspect instead of the shape.
    float cloud(vec2 uv, vec2 centre, vec2 radii) {
      vec2 d = (uv - centre) / radii;
      return exp(-dot(d, d));
    }

    void main() {
      vec2 uv = gl_FragCoord.xy / resolution.xy;

      float t = time * 0.22;

      // Two lobes on different periods, so the cluster breathes rather than
      // pulsing as one blob.
      float glow = cloud(uv, vec2(0.78 + 0.020 * sin(t * 0.8), 0.52), vec2(0.30, 0.42));
      glow += 0.62 * cloud(uv, vec2(0.62 + 0.016 * cos(t * 1.1), 0.40), vec2(0.18, 0.30));

      // Site palette: --green through --lightblue.
      vec3 mint = vec3(0.404, 0.855, 0.643);
      vec3 sky  = vec3(0.353, 0.612, 1.000);
      vec3 col = mix(mint, sky, 0.35) * glow;

      // Dot-matrix texture: the glow is only visible through this grid, which
      // is what gives the effect its screen-print feel.
      vec2 grid = fract(gl_FragCoord.xy / 7.0) - 0.5;
      float dotShape = smoothstep(0.29, 0.11, length(grid));
      float noise = hash(floor(gl_FragCoord.xy / 7.0));
      float scan = 0.72 + 0.28 * sin((uv.x + uv.y) * 38.0 + time * 1.3);
      float dots = dotShape * (0.48 + 0.52 * noise) * scan;

      float alpha = clamp(glow * dots * 1.35, 0.0, 1.0);

      // Matches --black so the canvas is indistinguishable from the panel
      // wherever the effect fades out.
      vec3 base = vec3(0.004, 0.016, 0.035);
      gl_FragColor = vec4(mix(base, col, clamp(alpha * 1.55, 0.0, 1.0)), 1.0);
    }
  `,
}
