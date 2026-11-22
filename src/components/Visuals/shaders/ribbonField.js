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
    // 0 corners (the original), 1 edge seam, 2 horizon, 3 full field dimmed,
    // 4 header strip. Prototype switch: see the ?dither= query in default.vue.
    placement: 0,
    // The content column, in CSS px from the canvas's left and top edges.
    // Measured by the layout; 0 falls back to the desktop padding.
    contentLeft: 0,
    contentRight: 0,
    dividerTop: 0,
  },

  uniforms: {
    resolution: 'resolution',
    time: 'time',
    pointer: 'pointer',
    pixelRatio: 'pixelRatio',
  },

  scalars: {
    placement: 'placement',
    contentLeft: 'contentLeft',
    contentRight: 'contentRight',
    dividerTop: 'dividerTop',
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
    uniform float pixelRatio;
    uniform float placement;
    uniform float contentLeft;
    uniform float contentRight;
    uniform float dividerTop;

    float hash(vec2 p) {
      p = fract(p * vec2(123.34, 456.21));
      p += dot(p, p + 45.32);
      return fract(p.x * p.y);
    }

    // A soft elliptical falloff. Separate x/y radii because uv is normalised
    // per axis: on a tall panel an isotropic falloff would read as a column.
    float cloud(vec2 uv, vec2 centre, vec2 radii) {
      vec2 d = (uv - centre) / radii;
      return exp(-dot(d, d));
    }

    // A soft horizontal band whose centre line wobbles with two sines.
    float ribbon(vec2 uv, float offset, float width, float phase) {
      float y = 0.55 + 0.20 * sin((uv.x * 2.15) + phase) + 0.045 * sin((uv.x * 7.0) - phase * 0.7);
      float d = abs(uv.y - y - offset);
      return exp(-(d * d) / width);
    }

    void main() {
      vec2 uv = gl_FragCoord.xy / resolution.xy;

      // CSS-pixel space, top-down, for placements tied to the content column
      // rather than to a share of the canvas.
      float pr = max(pixelRatio, 1.0);
      vec2 size = resolution.xy / pr;
      vec2 css = vec2(gl_FragCoord.x / pr, size.y - gl_FragCoord.y / pr);
      bool measured = contentRight > 0.0;
      float colLeft = measured ? contentLeft : 80.0;
      float colRight = measured ? contentRight : size.x - 80.0;
      float divTop = dividerTop > 0.0 ? dividerTop : 48.0;

      float t = time * 0.22;
      float drift = (pointer.x - 0.5) * 0.06;

      // Header strip: the block between the panel's top edge and the divider,
      // as wide as the divider (the content column).
      vec4 strip = vec4(colLeft, 0.0, max(colRight - colLeft, 1.0), max(divTop - 8.0, 8.0));
      vec2 sl = clamp((css - strip.xy) / strip.zw, 0.0, 1.0);

      // Ribbon space. Horizon squeezes all three ribbons into the bottom
      // third; the header strip maps them into the strip's own box.
      vec2 ruv = uv;
      float wk = 1.0;
      if (placement > 1.5 && placement < 2.5) {
        ruv = vec2(uv.x, uv.y * 1.9 + 0.22);
        wk = 1.6;
      }
      if (placement > 3.5) {
        ruv = vec2(sl.x, 0.88 - sl.y * 0.66);
        wk = 1.2;
      }

      float r1 = ribbon(vec2(ruv.x + drift, ruv.y), 0.03, 0.0065 * wk, t + 0.9);
      float r2 = ribbon(vec2(ruv.x - drift * 0.7, ruv.y), -0.23, 0.0085 * wk, t + 3.25);
      float r3 = ribbon(vec2(ruv.x + drift * 0.4, ruv.y), 0.25, 0.014 * wk, t + 1.85);

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

      float bloom = exp(-pow(distance(ruv, vec2(0.76, 0.40 + 0.035 * sin(t))), 2.0) / 0.050);
      bloom += exp(-pow(distance(ruv, vec2(0.71, 0.75 + 0.025 * cos(t))), 2.0) / 0.030);
      col += sky * bloom * 0.34;

      // Dot-matrix texture: the ribbons are only visible through this grid,
      // which is what gives the effect its screen-print feel.
      vec2 cell = floor(gl_FragCoord.xy / 7.0);
      vec2 grid = fract(gl_FragCoord.xy / 7.0) - 0.5;
      float dotShape = smoothstep(0.29, 0.11, length(grid));
      float noise = hash(cell);
      float scan = 0.72 + 0.28 * sin((uv.x + uv.y) * 38.0 + time * 1.3);
      float dots = dotShape * (0.48 + 0.52 * noise) * scan;

      float micro = hash(gl_FragCoord.xy + time) * 0.035;

      // Matches --black so the canvas is indistinguishable from the panel
      // wherever the effect fades out.
      vec3 base = vec3(0.004, 0.016, 0.035);
      vec3 finalColor;

      if (placement < 0.5) {
        // Corners: the original placement, shaped further by the CSS mask in
        // default.vue. Keeps the left edge (where the bio copy sits) close to
        // flat black and lets the glow build toward the divider on the right.
        float rightFade = smoothstep(0.28, 0.72, uv.x);
        float centerDark = 1.0 - smoothstep(0.0, 0.88, distance(uv, vec2(0.18, 0.48)));

        // Second cluster, hugging the top-left corner above the heading. uv.y
        // runs bottom-up here (gl_FragCoord), so ~0.97 is the top edge.
        float corner = cloud(uv, vec2(0.10, 0.99 + 0.010 * sin(t * 0.8)), vec2(0.26, 0.085));
        corner += 0.55 * cloud(uv, vec2(0.35, 0.955 + 0.012 * cos(t * 1.1)), vec2(0.17, 0.055));
        col += mint * corner * 0.26;
        col += green * corner * 0.20;

        float alpha = clamp((glow * 1.55 + bloom * 0.50) * dots * rightFade, 0.0, 1.0);
        alpha *= 1.0 - centerDark * 0.72;
        alpha = clamp(alpha + corner * dots * 0.62, 0.0, 1.0);

        finalColor = mix(base, col, clamp(alpha * 1.55, 0.0, 1.0));
        finalColor += micro * max(rightFade, corner);

      } else if (placement < 1.5) {
        // Edge seam: a full-height band in the right gutter, beside the
        // projects column, fading out before the copy.
        float gutter = max(size.x - colRight, 1.0);
        float edge = smoothstep(colRight - min(70.0, gutter * 0.9), size.x, css.x);
        edge *= 0.55 + 0.45 * edge;
        float cur = 0.5 + 0.5 * sin(uv.y * 7.0 - t * 2.2 + 1.5 * sin(uv.y * 2.3 + t));
        float curtain = (0.45 + 0.75 * cur) * edge;
        col += mix(mint, blue, 0.5 + 0.5 * sin(uv.y * 3.2 + t * 0.8)) * curtain * 0.60;

        float alpha = clamp((glow * 1.55 + bloom * 0.50 + curtain * 1.15) * dots * edge, 0.0, 1.0);
        finalColor = mix(base, col, clamp(alpha * 1.55, 0.0, 1.0));
        finalColor += micro * edge;

      } else if (placement < 2.5) {
        // Horizon: a ground plane under the Email button and footer, fading
        // out before the bio paragraph.
        float hz = 1.0 - smoothstep(0.06, 0.43, uv.y);
        hz *= hz;
        float ground = exp(-uv.y / 0.075);
        col += mix(green, blue, uv.x) * ground * 0.55;

        float alpha = clamp((glow * 1.55 + bloom * 0.50 + ground * 0.9) * dots * hz, 0.0, 1.0) * 0.92;
        finalColor = mix(base, col, clamp(alpha * 1.55, 0.0, 1.0));
        finalColor += micro * hz;

      } else if (placement < 3.5) {
        // Full field, dimmed: dots everywhere, held low under the copy and
        // rising toward the edges.
        vec2 q = abs(uv - 0.5) * 2.0;
        float ed = smoothstep(0.40, 1.0, max(q.x, q.y * 0.94));
        float strength = mix(0.20, 1.0, ed * ed);
        float amb = 0.30 + 0.20 * sin(uv.x * 3.1 + t * 1.4) * sin(uv.y * 2.7 - t);
        col += mix(green, blue, clamp(uv.x * 0.8 + 0.15 * sin(t + uv.y * 3.0), 0.0, 1.0)) * amb * 0.5;

        float alpha = clamp((glow * 1.3 + bloom * 0.50 + amb * 0.8) * dots, 0.0, 1.0) * strength;
        finalColor = mix(base, col, clamp(alpha * 1.55, 0.0, 1.0));
        finalColor += micro * strength;

      } else {
        // Header strip: a hard-edged block from the top edge down to the
        // divider. Tested on each dot's centre so the block ends on whole dots.
        vec2 cc = (cell + 0.5) * 7.0 / pr;
        vec2 cpx = vec2(cc.x, size.y - cc.y);
        float inside = step(strip.x, cpx.x) * step(cpx.x, strip.x + strip.z)
                     * step(strip.y, cpx.y) * step(cpx.y, strip.y + strip.w);
        float ramp = 0.55 + 0.45 * smoothstep(0.0, 1.0, sl.x);
        float sweep = 0.5 + 0.5 * sin(sl.x * 9.0 - time * 0.9 + sl.y * 2.0);
        float fill = ramp * (0.55 + 0.45 * sweep);
        col += mix(mint, blue, sl.x) * fill * 1.1;

        float alpha = clamp((glow * 1.4 + bloom * 0.4 + fill * 1.9) * dots, 0.0, 1.0) * inside;
        finalColor = mix(base, col, clamp(alpha * 1.55, 0.0, 1.0));
        finalColor += micro * inside;
      }

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `,
}
