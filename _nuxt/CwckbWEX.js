import{C as F,E as oe,I as H,_ as re,y as K,o as ne,c as ie,a as ae,e as se,n as le,k as Q}from"./CBNMOWfU.js";const ce=2;function J(e,i,d,a){const o=e.createShader(i);return o?(e.shaderSource(o,d),e.compileShader(o),e.getShaderParameter(o,e.COMPILE_STATUS)?o:(console.error(`[shader-canvas] ${a} failed to compile:`,e.getShaderInfoLog(o)),e.deleteShader(o),null)):null}function ue(e,i,d){const a=J(e,e.VERTEX_SHADER,i,"vertex shader");if(!a)return null;const o=J(e,e.FRAGMENT_SHADER,d,"fragment shader");if(!o)return e.deleteShader(a),null;const s=e.createProgram();return s?(e.attachShader(s,a),e.attachShader(s,o),e.linkProgram(s),e.getProgramParameter(s,e.LINK_STATUS)?{program:s,vertex:a,fragment:o}:(console.error("[shader-canvas] program failed to link:",e.getProgramInfoLog(s)),e.deleteShader(a),e.deleteShader(o),e.deleteProgram(s),null)):(e.deleteShader(a),e.deleteShader(o),null)}function fe({effect:e,getSettings:i}){const d=F(null),a=F(null),o=F(!0),s=F(!1);return oe(()=>{const h=d.value,c=a.value;if(!h||!c)return;const t=c.getContext("webgl",{alpha:!0,antialias:!1,premultipliedAlpha:!1,depth:!1,stencil:!1});if(!t){o.value=!1,s.value=!0;return}const u=e.uniforms||{},m=e.scalars||{};let r=null,b=null,v={},M={};const g=e.pointerOrigin||[.5,.5];let P=g[0],T=g[1],O=g[0],I=g[1],y=0,B=!0,E=!1,N=0,x=0;const _=window.matchMedia("(prefers-reduced-motion: reduce)");let L=_.matches;function D(){if(r=ue(t,e.vertex,e.fragment),!r)return o.value=!1,!1;t.useProgram(r.program),b=t.createBuffer(),t.bindBuffer(t.ARRAY_BUFFER,b),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),t.STATIC_DRAW);const n=t.getAttribLocation(r.program,"position");t.enableVertexAttribArray(n),t.vertexAttribPointer(n,2,t.FLOAT,!1,0,0),v={resolution:u.resolution?t.getUniformLocation(r.program,u.resolution):null,time:u.time?t.getUniformLocation(r.program,u.time):null,pointer:u.pointer?t.getUniformLocation(r.program,u.pointer):null},M={};for(const[p,f]of Object.entries(m))M[p]=t.getUniformLocation(r.program,f);return!0}function U(){const n=h.getBoundingClientRect(),p=Math.min(window.devicePixelRatio||1,ce),f=Math.max(1,Math.floor(n.width*p)),l=Math.max(1,Math.floor(n.height*p)),w=c.width!==f||c.height!==l;w&&(c.width=f,c.height=l),t.viewport(0,0,f,l),v.resolution&&t.uniform2f(v.resolution,f,l),w&&!y&&C(x||0)}function j(n){if(!v.pointer)return;const f=i().pointerAmount??1,l=h.getBoundingClientRect(),w=(n.clientX-l.left)/Math.max(l.width,1),k=1-(n.clientY-l.top)/Math.max(l.height,1);O=g[0]+(w-g[0])*f,I=g[1]+(k-g[1])*f}function C(n){const p=i();if(L)N=e.staticTime??0;else{const l=x?n-x:0;N+=Math.min(l,100)*.001*(p.speed??1)}x=n;const f=p.smoothing??.035;P+=(O-P)*f,T+=(I-T)*f,v.time&&t.uniform1f(v.time,N),v.pointer&&t.uniform2f(v.pointer,P,T);for(const[l,w]of Object.entries(M)){if(!w)continue;const k=p[l];typeof k=="number"&&t.uniform1f(w,k)}t.drawArrays(t.TRIANGLES,0,6),s.value=!0}function z(n){C(n),y=$()?requestAnimationFrame(z):0}function $(){return B&&!document.hidden&&!L&&!E}function S(){if(!(y||E)){if(!$()){C(x||0);return}x=0,y=requestAnimationFrame(z)}}function A(){y&&(cancelAnimationFrame(y),y=0)}function X(){document.hidden?A():S()}function R(n){L=n.matches,L?(A(),C(x||0)):S()}function Y(n){n.preventDefault(),E=!0,A()}function q(){D()&&(E=!1,U(),S())}if(!D()){H(()=>t.getExtension("WEBGL_lose_context")?.loseContext());return}const G=new ResizeObserver(U);G.observe(h);const V=new IntersectionObserver(([n])=>{B=n?.isIntersecting??!0,B?S():A()},{rootMargin:"80px"});V.observe(h);const W=h.parentElement||h;W.addEventListener("pointermove",j,{passive:!0}),document.addEventListener("visibilitychange",X),c.addEventListener("webglcontextlost",Y),c.addEventListener("webglcontextrestored",q),_.addEventListener?_.addEventListener("change",R):_.addListener(R),U(),S(),H(()=>{A(),G.disconnect(),V.disconnect(),W.removeEventListener("pointermove",j),document.removeEventListener("visibilitychange",X),c.removeEventListener("webglcontextlost",Y),c.removeEventListener("webglcontextrestored",q),_.removeEventListener?_.removeEventListener("change",R):_.removeListener(R),b&&t.deleteBuffer(b),r&&(t.detachShader(r.program,r.vertex),t.detachShader(r.program,r.fragment),t.deleteShader(r.vertex),t.deleteShader(r.fragment),t.deleteProgram(r.program)),t.getExtension("WEBGL_lose_context")?.loseContext()})}),{rootRef:d,canvasRef:a,supported:o,ready:s}}const Z={name:"ribbon-field",pointerOrigin:[.72,.42],staticTime:6.5,defaults:{speed:1,pointerAmount:1,smoothing:.035,opacity:1,hue:0,saturation:1,brightness:1},uniforms:{resolution:"resolution",time:"time",pointer:"pointer"},vertex:`
    attribute vec2 position;
    void main() {
      gl_Position = vec4(position, 0.0, 1.0);
    }
  `,fragment:`
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
  `},ee={name:"stream-convergence",staticTime:4,defaults:{speed:1,fidelity:.5,opacity:1,hue:0,saturation:1,brightness:1},uniforms:{resolution:"u_resolution",time:"u_time"},scalars:{fidelity:"u_fidelity"},vertex:`
    attribute vec2 position;
    varying vec2 vUv;
    void main() {
      vUv = position * 0.5 + 0.5;
      gl_Position = vec4(position, 0.0, 1.0);
    }
  `,fragment:`
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
  `},te={[Z.name]:Z,[ee.name]:ee};function de(e){if(e&&typeof e=="object")return e;const i=te[e];if(!i)throw new Error(`[shader-canvas] unknown effect "${e}". Available: ${Object.keys(te).join(", ")}`);return i}const me={__name:"ShaderCanvas",props:{effect:{type:[String,Object],required:!0},speed:{type:Number,default:void 0},pointerAmount:{type:Number,default:void 0},smoothing:{type:Number,default:void 0},fidelity:{type:Number,default:void 0},opacity:{type:Number,default:void 0},hue:{type:Number,default:void 0},saturation:{type:Number,default:void 0},brightness:{type:Number,default:void 0}},setup(e){const i=e,d=de(i.effect),a=K(()=>{const u={...d.defaults};for(const m of Object.keys(i))m!=="effect"&&i[m]!==void 0&&(u[m]=i[m]);return u}),{rootRef:o,canvasRef:s,supported:h,ready:c}=fe({effect:d,getSettings:()=>a.value}),t=K(()=>{const{opacity:u=1,hue:m=0,saturation:r=1,brightness:b=1}=a.value,v=m!==0||r!==1||b!==1;return{opacity:c.value?u:0,filter:v?`hue-rotate(${m}deg) saturate(${r}) brightness(${b})`:"none"}});return(u,m)=>(ne(),ie("div",{class:le(["shader-canvas",[`shader-canvas--${Q(d).name}`,{"is-unsupported":!Q(h)}]]),ref_key:"rootRef",ref:o,style:se(t.value)},[ae("canvas",{class:"shader-canvas__surface",ref_key:"canvasRef",ref:s,"aria-hidden":"true"},null,512)],6))}},he=re(me,[["__scopeId","data-v-1258e192"]]);export{he as S};
