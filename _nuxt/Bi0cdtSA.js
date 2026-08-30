import{o as A,c as _,a as i,w as ne,a0 as he,_ as T,a1 as G,B as q,v as p,g as se,f as re,G as ke,I as D,m as pe,a2 as ye,a3 as _e,N as xe,a4 as Se,A as g,d as we,F as Ce,i as ve,L as le,p as W,e as Le,n as ge,x as j,D as Ge,l as Ae,a5 as Te,a6 as Ee}from"./BfaCmbdT.js";const Fe="data:image/svg+xml,%3csvg%20width='44'%20height='44'%20viewBox='0%200%2044%2044'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M4%2040L40%2040L40%204L4.00001%204L4%2040ZM44%2044L44%202.6226e-06L6.46921e-06%20-1.224e-06L2.6226e-06%2044L44%2044Z'%20fill='url(%23paint0_linear_524_4)'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M12%2032L36%2032L36%2036L8%2036L8%208L36%208L36%2028L16%2028L16%2016L28%2016L28%2020L20%2020L20%2024L32%2024L32%2012L12%2012L12%2032Z'%20fill='url(%23paint1_linear_524_4)'/%3e%3cdefs%3e%3clinearGradient%20id='paint0_linear_524_4'%20x1='-17.1525'%20y1='16.1333'%20x2='59.2874'%20y2='15.9022'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%233E71FA'/%3e%3cstop%20offset='1'%20stop-color='%2342B883'/%3e%3c/linearGradient%3e%3clinearGradient%20id='paint1_linear_524_4'%20x1='-2.91525'%20y1='18.2667'%20x2='45.7284'%20y2='18.1196'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%233E71FA'/%3e%3cstop%20offset='1'%20stop-color='%2342B883'/%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e",De={class:"logo-nav mr-4"};function Me(t,e,r,c,n,a){return A(),_("div",De,[i("img",{class:"clickable-logo",src:Fe,alt:"Square Galaxy",role:"button",tabindex:"0","aria-label":"Play the secret snake game",onClick:e[0]||(e[0]=(...l)=>a.triggerSnakeGame&&a.triggerSnakeGame(...l)),onKeydown:[e[1]||(e[1]=ne((...l)=>a.triggerSnakeGame&&a.triggerSnakeGame(...l),["enter"])),e[2]||(e[2]=ne(he((...l)=>a.triggerSnakeGame&&a.triggerSnakeGame(...l),["prevent"]),["space"]))]},null,32)])}const Ie={name:"LogoNavComponent",emits:["trigger-snake-game"],methods:{triggerSnakeGame(){this.$emit("trigger-snake-game")}}},Pe=T(Ie,[["render",Me],["__scopeId","data-v-4e82d445"]]),Re=globalThis.setInterval,Oe={name:"SecretSnakeGame",props:{isActive:{type:Boolean,default:!1}},data(){return{canvasSize:400,snake:[],food:{},direction:"right",gameLoop:null,score:0,gameOver:!1,gameSpeed:150,ctx:null,gameStartTime:null,totalFoodEaten:0,maxScore:0}},watch:{isActive(t){t?this.$nextTick(()=>{this.initGame(),this.startGameLoop(),this.trackGameDiscovery()}):(this.stopGameLoop(),this.gameStartTime&&this.trackGameSession())}},methods:{trackGameDiscovery(){G("easter_egg_discovered",{feature_name:"secret_snake_game",location:"portfolio_bio_section",trigger_method:"square_icon_click"})},trackGameStart(){this.gameStartTime=Date.now(),G("game_started",{game_name:"secret_snake_game",initial_speed:this.gameSpeed})},trackFoodEaten(){this.totalFoodEaten++,this.maxScore=Math.max(this.maxScore,this.score),G("food_eaten",{game_name:"secret_snake_game",current_score:this.score,food_count:this.totalFoodEaten,game_speed:this.gameSpeed})},trackGameOver(){const t=this.gameStartTime?Date.now()-this.gameStartTime:0;G("game_over",{game_name:"secret_snake_game",final_score:this.score,max_score:this.maxScore,total_food_eaten:this.totalFoodEaten,session_duration_ms:t,session_duration_seconds:Math.round(t/1e3)})},trackGameRestart(){G("game_restarted",{game_name:"secret_snake_game",previous_score:this.score})},trackGameSession(){if(!this.gameStartTime)return;const t=Date.now()-this.gameStartTime;G("game_session_ended",{game_name:"secret_snake_game",final_score:this.score,max_score:this.maxScore,total_food_eaten:this.totalFoodEaten,session_duration_ms:t,session_duration_seconds:Math.round(t/1e3),exit_method:"user_closed"})},initGame(){const t=this.$refs.gameCanvas;this.ctx=t.getContext("2d"),this.snake=[{x:8,y:8},{x:7,y:8},{x:6,y:8}],this.direction="right",this.score=0,this.gameOver=!1,this.gameSpeed=150,this.totalFoodEaten=0,this.maxScore=0,this.generateFood(),t.focus(),this.trackGameStart()},generateFood(){const t=this.canvasSize/20;for(this.food={x:Math.floor(Math.random()*t),y:Math.floor(Math.random()*t)};this.snake.some(e=>e.x===this.food.x&&e.y===this.food.y);)this.food={x:Math.floor(Math.random()*t),y:Math.floor(Math.random()*t)}},startGameLoop(){this.gameLoop=Re(()=>{this.updateGame(),this.drawGame()},this.gameSpeed)},stopGameLoop(){this.gameLoop&&(clearInterval(this.gameLoop),this.gameLoop=null)},updateGame(){if(this.gameOver)return;const t={...this.snake[0]};switch(this.direction){case"up":t.y--;break;case"down":t.y++;break;case"left":t.x--;break;case"right":t.x++;break}const e=this.canvasSize/20;if(t.x<0||t.x>=e||t.y<0||t.y>=e){this.endGame();return}if(this.snake.some(r=>r.x===t.x&&r.y===t.y)){this.endGame();return}this.snake.unshift(t),t.x===this.food.x&&t.y===this.food.y?(this.score+=10,this.generateFood(),this.trackFoodEaten(),this.gameSpeed>50&&(this.gameSpeed-=2,this.stopGameLoop(),this.startGameLoop())):this.snake.pop()},drawGame(){if(!this.ctx)return;this.ctx.fillStyle="#000000",this.ctx.fillRect(0,0,this.canvasSize,this.canvasSize);const t=this.canvasSize/20;if(this.snake.length>0){const n=this.snake[0],a=this.snake[this.snake.length-1],l=this.ctx.createLinearGradient(n.x*t,n.y*t,a.x*t,a.y*t);l.addColorStop(0,"#42b883"),l.addColorStop(1,"#3e71fa"),this.snake.forEach((s,o)=>{o===0?(this.ctx.fillStyle=l,this.ctx.fillRect(s.x*t,s.y*t,t,t)):(this.ctx.fillStyle=l,this.ctx.fillRect(s.x*t,s.y*t,t,t))})}this.ctx.fillStyle="#42b883";const e=this.food.x*t+t/2,r=this.food.y*t+t/2,c=t/2;this.ctx.beginPath(),this.ctx.arc(e,r,c,0,2*Math.PI),this.ctx.fill()},handleKeyPress(t){switch(t.preventDefault(),t.key){case"ArrowUp":this.direction!=="down"&&(this.direction="up");break;case"ArrowDown":this.direction!=="up"&&(this.direction="down");break;case"ArrowLeft":this.direction!=="right"&&(this.direction="left");break;case"ArrowRight":this.direction!=="left"&&(this.direction="right");break;case"Escape":this.closeGame();break}},endGame(){this.gameOver=!0,this.stopGameLoop(),this.trackGameOver()},restartGame(){this.gameOver=!1,this.score=0,this.gameSpeed=150,this.totalFoodEaten=0,this.maxScore=0,this.initGame(),this.startGameLoop(),this.trackGameRestart()},closeGame(){this.$emit("close-game"),this.trackGameSession()},handleOverlayClick(){this.gameStartTime&&G("game_closed",{game_name:"secret_snake_game",close_method:"overlay_click",final_score:this.score,session_duration_ms:Date.now()-this.gameStartTime}),this.closeGame()}},beforeUnmount(){this.stopGameLoop(),this.gameStartTime&&this.trackGameSession()}},ze={class:"canvas-wrapper"},Ne=["width","height"],Be={key:0,class:"game-over-overlay"},Ue={class:"game-over-content"},$e={class:"score-display"};function Ke(t,e,r,c,n,a){const l=q("font-awesome-icon");return r.isActive?(A(),_("div",{key:0,class:"secret-snake-overlay",onClick:e[5]||(e[5]=(...s)=>a.handleOverlayClick&&a.handleOverlayClick(...s))},[i("div",{class:"snake-game-container",onClick:e[4]||(e[4]=he(()=>{},["stop"]))},[i("button",{onClick:e[0]||(e[0]=(...s)=>a.closeGame&&a.closeGame(...s)),class:"close-button","aria-label":"Close game"},[p(l,{icon:["fas","xmark"]})]),i("div",ze,[i("canvas",{ref:"gameCanvas",width:n.canvasSize,height:n.canvasSize,onKeydown:e[1]||(e[1]=(...s)=>a.handleKeyPress&&a.handleKeyPress(...s)),tabindex:"0",class:"snake-canvas"},null,40,Ne)]),n.gameOver?(A(),_("div",Be,[i("div",Ue,[e[6]||(e[6]=i("h3",null,"Game Over!",-1)),i("p",null,"Score: "+se(n.score),1),i("button",{onClick:e[2]||(e[2]=(...s)=>a.restartGame&&a.restartGame(...s)),class:"restart-btn"},"Play Again"),i("button",{onClick:e[3]||(e[3]=(...s)=>a.closeGame&&a.closeGame(...s)),class:"close-btn"},"Close")])])):re("",!0),i("div",$e,"Score: "+se(n.score),1)])])):re("",!0)}const be=T(Oe,[["render",Ke],["__scopeId","data-v-54a716e7"]]),qe=Symbol.for("nuxt:client-only"),We=ke({name:"ClientOnly",inheritAttrs:!1,props:["fallback","placeholder","placeholderTag","fallbackTag"],setup(t,{slots:e,attrs:r}){const c=D(!1);pe(()=>{c.value=!0});const n=Se();return n&&(n._nuxtClientOnly=!0),ye(qe,!0),()=>{if(c.value){const o=e.default?.();return o&&o.length===1?[_e(o[0],r)]:o}const a=e.fallback||e.placeholder;if(a)return xe(a);const l=t.fallback||t.placeholder||"",s=t.fallbackTag||t.placeholderTag||"span";return _(s,r,l)}}}),je={class:"inner-bio"},Ve={class:"is-size-2 pb-0 rise",style:{"--rise-index":"1"}},He={class:"is-size-5 is-size-6-mobile my-6 rise",style:{"--rise-index":"2"}},Xe={class:"is-size-6 mb-2 rise",style:{"--rise-index":"3"}},Ye={class:"contact-links is-size-6 mb-6 rise",style:{"--rise-index":"4"}},Ze={class:"grid rise",style:{"--rise-index":"5"}},Qe={class:"cell"};function Je(t,e,r,c,n,a){const l=q("LogoNavComponent"),s=q("font-awesome-icon"),o=be,f=We;return A(),_(Ce,null,[i("div",je,[i("h1",Ve,[p(l,{onTriggerSnakeGame:a.activateSnakeGame},null,8,["onTriggerSnakeGame"]),e[8]||(e[8]=i("span",null,"Hi, I'm Luis.",-1))]),i("p",He,[e[12]||(e[12]=i("span",null,"A mission-driven ",-1)),i("a",{class:"link",href:"https://www.linkedin.com/in/luis-palomares/",target:"_blank",onClick:e[0]||(e[0]=u=>a.trackClick("LinkedIn Profile"))},[e[9]||(e[9]=i("span",null,"product leader ",-1)),p(s,{class:"is-size-7 icon is-small has-text-grey",icon:"arrow-up-right-from-square"})]),e[13]||(e[13]=g(" ")),e[14]||(e[14]=i("span",null,".",-1)),e[15]||(e[15]=g(" I've championed tech initiatives that guard families against wire fraud in real estate, amplify transparency in mortgage lending, and open credit avenues for immigrants, steering startups from ")),i("a",{class:"link",href:"https://tucson.com/business/article_cf74558c-5f18-552b-81a0-cf60679257cf.html",target:"_blank",onClick:e[1]||(e[1]=u=>a.trackClick("Tucson Tech Article"))},[e[10]||(e[10]=i("span",null,"seed ",-1)),p(s,{class:"is-size-7 icon is-small has-text-grey",icon:"arrow-up-right-from-square"})]),e[16]||(e[16]=g("  to ")),i("a",{class:"link",href:"https://www.businesswire.com/news/home/20250715516305/en/CertifID-Raises-%2447.5-Million-Series-C-Led-by-Centana-Growth-Partners",target:"_blank",onClick:e[2]||(e[2]=u=>a.trackClick("CertifID Series C Article"))},[e[11]||(e[11]=i("span",null,"Series C ",-1)),p(s,{class:"is-size-7 icon is-small has-text-grey",icon:"arrow-up-right-from-square"})]),e[17]||(e[17]=g(" ")),e[18]||(e[18]=i("span",null,".",-1))]),i("p",Xe,[e[19]||(e[19]=g("Product @ ")),i("a",{class:"link",href:"https://certifid.com",target:"_blank",onClick:e[3]||(e[3]=u=>a.trackClick("CertifID Website"))},"CertifID")]),i("p",Ye,[e[26]||(e[26]=g("I like to ")),i("a",{class:"link",href:"https://dribbble.com/luispalomares",target:"_blank",onClick:e[4]||(e[4]=u=>a.trackClick("Dribbble Profile"))},[p(s,{icon:["fab","dribbble"]}),e[20]||(e[20]=g(" ")),e[21]||(e[21]=i("span",null,"design",-1))]),e[27]||(e[27]=g(", ")),i("a",{class:"link",href:"https://github.com/ztfo",target:"_blank",onClick:e[5]||(e[5]=u=>a.trackClick("GitHub Profile"))},[p(s,{icon:["fab","github"]}),e[22]||(e[22]=g(" ")),e[23]||(e[23]=i("span",null,"code",-1))]),e[28]||(e[28]=g(", ")),e[29]||(e[29]=i("span",null,"build with AI",-1)),e[30]||(e[30]=g(", and ")),i("a",{class:"link",href:"https://7thst.music",target:"_blank",onClick:e[6]||(e[6]=u=>a.trackClick("7thSt Music Website"))},[p(s,{icon:["fas","circle-play"]}),e[24]||(e[24]=g(" ")),e[25]||(e[25]=i("span",null,"make dance music.",-1))])]),i("div",Ze,[i("div",Qe,[i("a",{class:"button is-primary mb-3",href:"mailto:hello@builtwithwords.ai",target:"_blank",onClick:e[7]||(e[7]=u=>a.trackClick("Email Link"))},"Email Me")])])]),p(f,null,{default:we(()=>[p(o,{isActive:n.snakeGameActive,onCloseGame:a.deactivateSnakeGame},null,8,["isActive","onCloseGame"])]),_:1})],64)}const et={name:"HomePanelComponent",components:{LogoNavComponent:Pe,SecretSnakeGame:be},data(){return{snakeGameActive:!1}},methods:{activateSnakeGame(){this.snakeGameActive=!0,this.trackClick("Secret Snake Game Triggered")},deactivateSnakeGame(){this.snakeGameActive=!1},trackClick(t){const r={"LinkedIn Profile":{url:"https://www.linkedin.com/in/luis-palomares/",linkType:"social_professional",location:"bio_section"},"Tucson Tech Article":{url:"https://tucson.com/business/article_cf74558c-5f18-552b-81a0-cf60679257cf.html",linkType:"media_article",location:"bio_section",additionalData:{article_topic:"startup_investment"}},"CertifID Series C Article":{url:"https://www.businesswire.com/news/home/20250715516305/en/CertifID-Raises-%2447.5-Million-Series-C-Led-by-Centana-Growth-Partners",linkType:"media_article",location:"bio_section",additionalData:{article_topic:"series_c_funding"}},"CertifID Website":{url:"https://certifid.com",linkType:"company_website",location:"bio_section",additionalData:{company:"CertifID"}},"Dribbble Profile":{url:"https://dribbble.com/luispalomares",linkType:"social_creative",location:"interests_section",additionalData:{interest_type:"design"}},"GitHub Profile":{url:"https://github.com/ztfo",linkType:"social_technical",location:"interests_section",additionalData:{interest_type:"coding"}},"7thSt Music Website":{url:"https://7thst.music",linkType:"personal_website",location:"interests_section",additionalData:{interest_type:"music"}},"Email Link":{url:"mailto:hello@builtwithwords.ai",linkType:"contact",location:"contact_section",additionalData:{contact_method:"email"}},"Secret Snake Game Triggered":{url:"internal_game",linkType:"secret_feature",location:"bio_section",additionalData:{feature_type:"easter_egg",game:"snake"}}}[t];r&&ve({url:r.url,label:t,linkType:r.linkType,location:r.location,additionalData:r.additionalData||{}})}}},tt=T(et,[["render",Je]]),at={class:"mt-6"};function it(t,e,r,c,n,a){return A(),_("p",at,[e[1]||(e[1]=i("span",null,"📍I live in Austin with my wife ",-1)),i("a",{class:"link",href:"https://katieannclay.com",target:"_blank",onClick:e[0]||(e[0]=(...l)=>a.trackFooterLink&&a.trackFooterLink(...l))},"Katie, a Ceramic Artist"),e[2]||(e[2]=i("span",null," & our 🐕 Bingley.",-1))])}const ot={name:"FooterComponent",methods:{trackFooterLink(){ve({url:"https://katieannclay.com",label:"Katie Clay Website",linkType:"personal",location:"footer"})}}},nt=T(ot,[["render",it],["__scopeId","data-v-43b6b2ab"]]),st=2;function ce(t,e,r,c){const n=t.createShader(e);return n?(t.shaderSource(n,r),t.compileShader(n),t.getShaderParameter(n,t.COMPILE_STATUS)?n:(console.error(`[shader-canvas] ${c} failed to compile:`,t.getShaderInfoLog(n)),t.deleteShader(n),null)):null}function rt(t,e,r){const c=ce(t,t.VERTEX_SHADER,e,"vertex shader");if(!c)return null;const n=ce(t,t.FRAGMENT_SHADER,r,"fragment shader");if(!n)return t.deleteShader(c),null;const a=t.createProgram();return a?(t.attachShader(a,c),t.attachShader(a,n),t.linkProgram(a),t.getProgramParameter(a,t.LINK_STATUS)?{program:a,vertex:c,fragment:n}:(console.error("[shader-canvas] program failed to link:",t.getProgramInfoLog(a)),t.deleteShader(c),t.deleteShader(n),t.deleteProgram(a),null)):(t.deleteShader(c),t.deleteShader(n),null)}function lt({effect:t,getSettings:e}){const r=D(null),c=D(null),n=D(!0),a=D(!1);return pe(()=>{const l=r.value,s=c.value;if(!l||!s)return;const o=s.getContext("webgl",{alpha:!0,antialias:!1,premultipliedAlpha:!1,depth:!1,stencil:!1});if(!o){n.value=!1,a.value=!0;return}const f=t.uniforms||{},u=t.scalars||{};let d=null,x=null,b={},z={};const y=t.pointerOrigin||[.5,.5];let N=y[0],B=y[1],V=y[0],H=y[1],S=0,U=!0,M=!1,$=0,w=0;const C=window.matchMedia("(prefers-reduced-motion: reduce)");let I=C.matches;function X(){if(d=rt(o,t.vertex,t.fragment),!d)return n.value=!1,!1;n.value=!0,o.useProgram(d.program),x=o.createBuffer(),o.bindBuffer(o.ARRAY_BUFFER,x),o.bufferData(o.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),o.STATIC_DRAW);const m=o.getAttribLocation(d.program,"position");o.enableVertexAttribArray(m),o.vertexAttribPointer(m,2,o.FLOAT,!1,0,0),b={resolution:f.resolution?o.getUniformLocation(d.program,f.resolution):null,time:f.time?o.getUniformLocation(d.program,f.time):null,pointer:f.pointer?o.getUniformLocation(d.program,f.pointer):null},z={};for(const[k,v]of Object.entries(u))z[k]=o.getUniformLocation(d.program,v);return!0}function K(){const m=l.getBoundingClientRect(),k=Math.min(window.devicePixelRatio||1,st),v=Math.max(1,Math.floor(m.width*k)),h=Math.max(1,Math.floor(m.height*k)),L=s.width!==v||s.height!==h;L&&(s.width=v,s.height=h),o.viewport(0,0,v,h),b.resolution&&o.uniform2f(b.resolution,v,h),L&&!S&&P(w||0)}function Y(m){if(!b.pointer)return;const v=e().pointerAmount??1,h=l.getBoundingClientRect(),L=(m.clientX-h.left)/Math.max(h.width,1),O=1-(m.clientY-h.top)/Math.max(h.height,1);V=y[0]+(L-y[0])*v,H=y[1]+(O-y[1])*v}function P(m){const k=e();if(I)$=t.staticTime??0;else{const h=w?m-w:0;$+=Math.min(h,100)*.001*(k.speed??1)}w=m;const v=k.smoothing??.035;N+=(V-N)*v,B+=(H-B)*v,b.time&&o.uniform1f(b.time,$),b.pointer&&o.uniform2f(b.pointer,N,B);for(const[h,L]of Object.entries(z)){if(!L)continue;const O=k[h];typeof O=="number"&&o.uniform1f(L,O)}o.drawArrays(o.TRIANGLES,0,6),a.value=!0}function Z(m){P(m),S=Q()?requestAnimationFrame(Z):0}function Q(){return U&&!document.hidden&&!I&&!M}function E(){if(!(S||M)){if(!Q()){P(w||0);return}w=0,S=requestAnimationFrame(Z)}}function F(){S&&(cancelAnimationFrame(S),S=0)}function J(){document.hidden?F():E()}function R(m){I=m.matches,I?(F(),P(w||0)):E()}function ee(m){m.preventDefault(),M=!0,F()}function te(){X()&&(M=!1,K(),E())}if(!X()){a.value=!0,le(()=>o.getExtension("WEBGL_lose_context")?.loseContext());return}const ae=new ResizeObserver(K);ae.observe(l);const ie=new IntersectionObserver(([m])=>{U=m?.isIntersecting??!0,U?E():F()},{rootMargin:"80px"});ie.observe(l);const oe=l.parentElement||l;oe.addEventListener("pointermove",Y,{passive:!0}),document.addEventListener("visibilitychange",J),s.addEventListener("webglcontextlost",ee),s.addEventListener("webglcontextrestored",te),C.addEventListener?C.addEventListener("change",R):C.addListener(R),K(),E(),le(()=>{F(),ae.disconnect(),ie.disconnect(),oe.removeEventListener("pointermove",Y),document.removeEventListener("visibilitychange",J),s.removeEventListener("webglcontextlost",ee),s.removeEventListener("webglcontextrestored",te),C.removeEventListener?C.removeEventListener("change",R):C.removeListener(R),x&&o.deleteBuffer(x),d&&(o.detachShader(d.program,d.vertex),o.detachShader(d.program,d.fragment),o.deleteShader(d.vertex),o.deleteShader(d.fragment),o.deleteProgram(d.program)),o.getExtension("WEBGL_lose_context")?.loseContext()})}),{rootRef:r,canvasRef:c,supported:n,ready:a}}const de={name:"dot-cloud",staticTime:5,defaults:{speed:1,opacity:1,hue:0,saturation:1,brightness:1},uniforms:{resolution:"resolution",time:"time"},vertex:`
    attribute vec2 position;
    void main() {
      gl_Position = vec4(position, 0.0, 1.0);
    }
  `,fragment:`
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
  `},me={name:"ribbon-field",pointerOrigin:[.72,.42],staticTime:6.5,defaults:{speed:1,pointerAmount:1,smoothing:.035,opacity:1,hue:0,saturation:1,brightness:1},uniforms:{resolution:"resolution",time:"time",pointer:"pointer"},vertex:`
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

      // Second cluster, hugging the top-left corner above the heading. uv.y
      // runs bottom-up here (gl_FragCoord), so ~0.97 is the top edge. Two lobes
      // on different periods, so it breathes instead of pulsing as one blob.
      // It is added outside rightFade — that fade exists to keep the copy
      // column black, and this sits above the copy — so its reach is set by the
      // radii alone: wide and shallow, fading out before the paragraph.
      float corner = cloud(uv, vec2(0.10, 0.99 + 0.010 * sin(t * 0.8)), vec2(0.26, 0.085));
      corner += 0.55 * cloud(uv, vec2(0.35, 0.955 + 0.012 * cos(t * 1.1)), vec2(0.17, 0.055));
      col += mint * corner * 0.26;
      col += green * corner * 0.20;

      // Dot-matrix texture: the ribbons are only visible through this grid,
      // which is what gives the effect its screen-print feel.
      vec2 grid = fract(gl_FragCoord.xy / 7.0) - 0.5;
      float dotShape = smoothstep(0.29, 0.11, length(grid));
      float noise = hash(floor(gl_FragCoord.xy / 7.0));
      float scan = 0.72 + 0.28 * sin((uv.x + uv.y) * 38.0 + time * 1.3);
      float dots = dotShape * (0.48 + 0.52 * noise) * scan;

      float micro = hash(gl_FragCoord.xy + time) * 0.035;
      float alpha = clamp((glow * 1.55 + bloom * 0.50) * dots * rightFade, 0.0, 1.0);
      alpha *= 1.0 - centerDark * 0.72;
      // Added after the fades rather than folded into glow, so the corner
      // survives rightFade and centerDark zeroing everything on the left.
      alpha = clamp(alpha + corner * dots * 0.62, 0.0, 1.0);

      // Matches --black so the canvas is indistinguishable from the panel
      // wherever the effect fades out.
      vec3 base = vec3(0.004, 0.016, 0.035);
      vec3 finalColor = mix(base, col, clamp(alpha * 1.55, 0.0, 1.0));
      finalColor += micro * max(rightFade, corner);

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `},ue={name:"stream-convergence",staticTime:4,defaults:{speed:1,fidelity:.5,opacity:1,hue:0,saturation:1,brightness:1},uniforms:{resolution:"u_resolution",time:"u_time"},scalars:{fidelity:"u_fidelity"},vertex:`
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
  `},fe={[de.name]:de,[me.name]:me,[ue.name]:ue};function ct(t){if(t&&typeof t=="object")return t;const e=fe[t];if(!e)throw new Error(`[shader-canvas] unknown effect "${t}". Available: ${Object.keys(fe).join(", ")}`);return e}const dt={__name:"ShaderCanvas",props:{effect:{type:[String,Object],required:!0},speed:{type:Number,default:void 0},pointerAmount:{type:Number,default:void 0},smoothing:{type:Number,default:void 0},fidelity:{type:Number,default:void 0},opacity:{type:Number,default:void 0},hue:{type:Number,default:void 0},saturation:{type:Number,default:void 0},brightness:{type:Number,default:void 0}},setup(t){const e=t,r=ct(e.effect),c=W(()=>{const f={...r.defaults};for(const u of Object.keys(e))u!=="effect"&&e[u]!==void 0&&(f[u]=e[u]);return f}),{rootRef:n,canvasRef:a,supported:l,ready:s}=lt({effect:r,getSettings:()=>c.value}),o=W(()=>{const{opacity:f=1,hue:u=0,saturation:d=1,brightness:x=1}=c.value,b=u!==0||d!==1||x!==1;return{opacity:s.value?f:0,filter:b?`hue-rotate(${u}deg) saturate(${d}) brightness(${x})`:"none"}});return(f,u)=>(A(),_("div",{class:ge(["shader-canvas",[`shader-canvas--${j(r).name}`,{"is-unsupported":!j(l)}]]),ref_key:"rootRef",ref:n,style:Le(o.value)},[i("canvas",{class:"shader-canvas__surface",ref_key:"canvasRef",ref:a,"aria-hidden":"true"},null,512)],6))}},mt=T(dt,[["__scopeId","data-v-7a85fe84"]]),ut={class:"home-panel left"},ft={class:"panel-content"},ht={class:"home-panel right"},pt={__name:"default",setup(t){const e=Ge(),r=W(()=>e.path.startsWith("/project")),c=Ae(null);return Te(()=>e.path,()=>c.value?.scrollTo({top:0})),(n,a)=>(A(),_("div",{class:ge(["home",{"detail-first":j(r)}])},[i("div",ut,[p(mt,{class:"panel-shader",effect:"ribbon-field",opacity:.55}),a[1]||(a[1]=i("div",{class:"panel-scrim"},null,-1)),i("div",ft,[a[0]||(a[0]=i("div",{class:"long-divider"},null,-1)),p(tt),p(nt,{class:"rise",style:{"--rise-index":"6"}})])]),i("div",ht,[i("div",{class:"inner-scroll",ref_key:"innerScroll",ref:c},[Ee(n.$slots,"default",{},void 0)],512)])],2))}},gt=T(pt,[["__scopeId","data-v-c5a32673"]]);export{gt as default};
