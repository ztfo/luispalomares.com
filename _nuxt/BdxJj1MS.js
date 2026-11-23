import{o as T,c as x,a as o,w as le,a0 as ge,_ as A,a1 as G,B as K,v as g,g as ce,f as de,G as ye,I as F,m as X,a2 as _e,a3 as xe,N as Se,a4 as we,A as k,d as Ce,F as Le,i as ve,L as V,p as H,e as Ge,n as be,x as N,D as Te,l as z,a5 as Ae,a6 as Re}from"./DnN8c3B5.js";const Ee="data:image/svg+xml,%3csvg%20width='44'%20height='44'%20viewBox='0%200%2044%2044'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M4%2040L40%2040L40%204L4.00001%204L4%2040ZM44%2044L44%202.6226e-06L6.46921e-06%20-1.224e-06L2.6226e-06%2044L44%2044Z'%20fill='url(%23paint0_linear_524_4)'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M12%2032L36%2032L36%2036L8%2036L8%208L36%208L36%2028L16%2028L16%2016L28%2016L28%2020L20%2020L20%2024L32%2024L32%2012L12%2012L12%2032Z'%20fill='url(%23paint1_linear_524_4)'/%3e%3cdefs%3e%3clinearGradient%20id='paint0_linear_524_4'%20x1='-17.1525'%20y1='16.1333'%20x2='59.2874'%20y2='15.9022'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%233E71FA'/%3e%3cstop%20offset='1'%20stop-color='%2342B883'/%3e%3c/linearGradient%3e%3clinearGradient%20id='paint1_linear_524_4'%20x1='-2.91525'%20y1='18.2667'%20x2='45.7284'%20y2='18.1196'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%233E71FA'/%3e%3cstop%20offset='1'%20stop-color='%2342B883'/%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e",Fe={class:"logo-nav mr-4"};function Me(t,e,r,c,n,i){return T(),x("div",Fe,[o("img",{class:"clickable-logo",src:Ee,alt:"Square Galaxy",role:"button",tabindex:"0","aria-label":"Play the secret snake game",onClick:e[0]||(e[0]=(...l)=>i.triggerSnakeGame&&i.triggerSnakeGame(...l)),onKeydown:[e[1]||(e[1]=le((...l)=>i.triggerSnakeGame&&i.triggerSnakeGame(...l),["enter"])),e[2]||(e[2]=le(ge((...l)=>i.triggerSnakeGame&&i.triggerSnakeGame(...l),["prevent"]),["space"]))]},null,32)])}const Pe={name:"LogoNavComponent",emits:["trigger-snake-game"],methods:{triggerSnakeGame(){this.$emit("trigger-snake-game")}}},De=A(Pe,[["render",Me],["__scopeId","data-v-4e82d445"]]),Oe=globalThis.setInterval,Ie={name:"SecretSnakeGame",props:{isActive:{type:Boolean,default:!1}},data(){return{canvasSize:400,snake:[],food:{},direction:"right",gameLoop:null,score:0,gameOver:!1,gameSpeed:150,ctx:null,gameStartTime:null,totalFoodEaten:0,maxScore:0}},watch:{isActive(t){t?this.$nextTick(()=>{this.initGame(),this.startGameLoop(),this.trackGameDiscovery()}):(this.stopGameLoop(),this.gameStartTime&&this.trackGameSession())}},methods:{trackGameDiscovery(){G("easter_egg_discovered",{feature_name:"secret_snake_game",location:"portfolio_bio_section",trigger_method:"square_icon_click"})},trackGameStart(){this.gameStartTime=Date.now(),G("game_started",{game_name:"secret_snake_game",initial_speed:this.gameSpeed})},trackFoodEaten(){this.totalFoodEaten++,this.maxScore=Math.max(this.maxScore,this.score),G("food_eaten",{game_name:"secret_snake_game",current_score:this.score,food_count:this.totalFoodEaten,game_speed:this.gameSpeed})},trackGameOver(){const t=this.gameStartTime?Date.now()-this.gameStartTime:0;G("game_over",{game_name:"secret_snake_game",final_score:this.score,max_score:this.maxScore,total_food_eaten:this.totalFoodEaten,session_duration_ms:t,session_duration_seconds:Math.round(t/1e3)})},trackGameRestart(){G("game_restarted",{game_name:"secret_snake_game",previous_score:this.score})},trackGameSession(){if(!this.gameStartTime)return;const t=Date.now()-this.gameStartTime;G("game_session_ended",{game_name:"secret_snake_game",final_score:this.score,max_score:this.maxScore,total_food_eaten:this.totalFoodEaten,session_duration_ms:t,session_duration_seconds:Math.round(t/1e3),exit_method:"user_closed"})},initGame(){const t=this.$refs.gameCanvas;this.ctx=t.getContext("2d"),this.snake=[{x:8,y:8},{x:7,y:8},{x:6,y:8}],this.direction="right",this.score=0,this.gameOver=!1,this.gameSpeed=150,this.totalFoodEaten=0,this.maxScore=0,this.generateFood(),t.focus(),this.trackGameStart()},generateFood(){const t=this.canvasSize/20;for(this.food={x:Math.floor(Math.random()*t),y:Math.floor(Math.random()*t)};this.snake.some(e=>e.x===this.food.x&&e.y===this.food.y);)this.food={x:Math.floor(Math.random()*t),y:Math.floor(Math.random()*t)}},startGameLoop(){this.gameLoop=Oe(()=>{this.updateGame(),this.drawGame()},this.gameSpeed)},stopGameLoop(){this.gameLoop&&(clearInterval(this.gameLoop),this.gameLoop=null)},updateGame(){if(this.gameOver)return;const t={...this.snake[0]};switch(this.direction){case"up":t.y--;break;case"down":t.y++;break;case"left":t.x--;break;case"right":t.x++;break}const e=this.canvasSize/20;if(t.x<0||t.x>=e||t.y<0||t.y>=e){this.endGame();return}if(this.snake.some(r=>r.x===t.x&&r.y===t.y)){this.endGame();return}this.snake.unshift(t),t.x===this.food.x&&t.y===this.food.y?(this.score+=10,this.generateFood(),this.trackFoodEaten(),this.gameSpeed>50&&(this.gameSpeed-=2,this.stopGameLoop(),this.startGameLoop())):this.snake.pop()},drawGame(){if(!this.ctx)return;this.ctx.fillStyle="#000000",this.ctx.fillRect(0,0,this.canvasSize,this.canvasSize);const t=this.canvasSize/20;if(this.snake.length>0){const n=this.snake[0],i=this.snake[this.snake.length-1],l=this.ctx.createLinearGradient(n.x*t,n.y*t,i.x*t,i.y*t);l.addColorStop(0,"#42b883"),l.addColorStop(1,"#3e71fa"),this.snake.forEach((s,a)=>{a===0?(this.ctx.fillStyle=l,this.ctx.fillRect(s.x*t,s.y*t,t,t)):(this.ctx.fillStyle=l,this.ctx.fillRect(s.x*t,s.y*t,t,t))})}this.ctx.fillStyle="#42b883";const e=this.food.x*t+t/2,r=this.food.y*t+t/2,c=t/2;this.ctx.beginPath(),this.ctx.arc(e,r,c,0,2*Math.PI),this.ctx.fill()},handleKeyPress(t){switch(t.preventDefault(),t.key){case"ArrowUp":this.direction!=="down"&&(this.direction="up");break;case"ArrowDown":this.direction!=="up"&&(this.direction="down");break;case"ArrowLeft":this.direction!=="right"&&(this.direction="left");break;case"ArrowRight":this.direction!=="left"&&(this.direction="right");break;case"Escape":this.closeGame();break}},endGame(){this.gameOver=!0,this.stopGameLoop(),this.trackGameOver()},restartGame(){this.gameOver=!1,this.score=0,this.gameSpeed=150,this.totalFoodEaten=0,this.maxScore=0,this.initGame(),this.startGameLoop(),this.trackGameRestart()},closeGame(){this.$emit("close-game"),this.trackGameSession()},handleOverlayClick(){this.gameStartTime&&G("game_closed",{game_name:"secret_snake_game",close_method:"overlay_click",final_score:this.score,session_duration_ms:Date.now()-this.gameStartTime}),this.closeGame()}},beforeUnmount(){this.stopGameLoop(),this.gameStartTime&&this.trackGameSession()}},ze={class:"canvas-wrapper"},Ne=["width","height"],Be={key:0,class:"game-over-overlay"},Ue={class:"game-over-content"},$e={class:"score-display"};function je(t,e,r,c,n,i){const l=K("font-awesome-icon");return r.isActive?(T(),x("div",{key:0,class:"secret-snake-overlay",onClick:e[5]||(e[5]=(...s)=>i.handleOverlayClick&&i.handleOverlayClick(...s))},[o("div",{class:"snake-game-container",onClick:e[4]||(e[4]=ge(()=>{},["stop"]))},[o("button",{onClick:e[0]||(e[0]=(...s)=>i.closeGame&&i.closeGame(...s)),class:"close-button","aria-label":"Close game"},[g(l,{icon:["fas","xmark"]})]),o("div",ze,[o("canvas",{ref:"gameCanvas",width:n.canvasSize,height:n.canvasSize,onKeydown:e[1]||(e[1]=(...s)=>i.handleKeyPress&&i.handleKeyPress(...s)),tabindex:"0",class:"snake-canvas"},null,40,Ne)]),n.gameOver?(T(),x("div",Be,[o("div",Ue,[e[6]||(e[6]=o("h3",null,"Game Over!",-1)),o("p",null,"Score: "+ce(n.score),1),o("button",{onClick:e[2]||(e[2]=(...s)=>i.restartGame&&i.restartGame(...s)),class:"restart-btn"},"Play Again"),o("button",{onClick:e[3]||(e[3]=(...s)=>i.closeGame&&i.closeGame(...s)),class:"close-btn"},"Close")])])):de("",!0),o("div",$e,"Score: "+ce(n.score),1)])])):de("",!0)}const ke=A(Ie,[["render",je],["__scopeId","data-v-54a716e7"]]),We=Symbol.for("nuxt:client-only"),qe=ye({name:"ClientOnly",inheritAttrs:!1,props:["fallback","placeholder","placeholderTag","fallbackTag"],setup(t,{slots:e,attrs:r}){const c=F(!1);X(()=>{c.value=!0});const n=we();return n&&(n._nuxtClientOnly=!0),_e(We,!0),()=>{if(c.value){const a=e.default?.();return a&&a.length===1?[xe(a[0],r)]:a}const i=e.fallback||e.placeholder;if(i)return Se(i);const l=t.fallback||t.placeholder||"",s=t.fallbackTag||t.placeholderTag||"span";return x(s,r,l)}}}),Ke={class:"inner-bio"},Ve={class:"is-size-2 pb-0 rise",style:{"--rise-index":"1"}},He={class:"is-size-5 is-size-6-mobile my-6 rise",style:{"--rise-index":"2"}},Xe={class:"is-size-6 mb-2 rise",style:{"--rise-index":"3"}},Ye={class:"contact-links is-size-6 mb-6 rise",style:{"--rise-index":"4"}},Ze={class:"grid rise",style:{"--rise-index":"5"}},Qe={class:"cell"};function Je(t,e,r,c,n,i){const l=K("LogoNavComponent"),s=K("font-awesome-icon"),a=ke,u=qe;return T(),x(Le,null,[o("div",Ke,[o("h1",Ve,[g(l,{onTriggerSnakeGame:i.activateSnakeGame},null,8,["onTriggerSnakeGame"]),e[8]||(e[8]=o("span",null,"Hi, I'm Luis.",-1))]),o("p",He,[e[12]||(e[12]=o("span",null,"A mission-driven ",-1)),o("a",{class:"link",href:"https://www.linkedin.com/in/luis-palomares/",target:"_blank",onClick:e[0]||(e[0]=d=>i.trackClick("LinkedIn Profile"))},[e[9]||(e[9]=o("span",null,"product leader ",-1)),g(s,{class:"is-size-7 icon is-small has-text-grey",icon:"arrow-up-right-from-square"})]),e[13]||(e[13]=k(" ")),e[14]||(e[14]=o("span",null,".",-1)),e[15]||(e[15]=k(" I've championed tech initiatives that guard families against wire fraud in real estate, amplify transparency in mortgage lending, and open credit avenues for immigrants, steering startups from ")),o("a",{class:"link",href:"https://tucson.com/business/article_cf74558c-5f18-552b-81a0-cf60679257cf.html",target:"_blank",onClick:e[1]||(e[1]=d=>i.trackClick("Tucson Tech Article"))},[e[10]||(e[10]=o("span",null,"seed ",-1)),g(s,{class:"is-size-7 icon is-small has-text-grey",icon:"arrow-up-right-from-square"})]),e[16]||(e[16]=k("  to ")),o("a",{class:"link",href:"https://www.businesswire.com/news/home/20250715516305/en/CertifID-Raises-%2447.5-Million-Series-C-Led-by-Centana-Growth-Partners",target:"_blank",onClick:e[2]||(e[2]=d=>i.trackClick("CertifID Series C Article"))},[e[11]||(e[11]=o("span",null,"Series C ",-1)),g(s,{class:"is-size-7 icon is-small has-text-grey",icon:"arrow-up-right-from-square"})]),e[17]||(e[17]=k(" ")),e[18]||(e[18]=o("span",null,".",-1))]),o("p",Xe,[e[19]||(e[19]=k("Product @ ")),o("a",{class:"link",href:"https://certifid.com",target:"_blank",onClick:e[3]||(e[3]=d=>i.trackClick("CertifID Website"))},"CertifID")]),o("p",Ye,[e[26]||(e[26]=k("I like to ")),o("a",{class:"link",href:"https://dribbble.com/luispalomares",target:"_blank",onClick:e[4]||(e[4]=d=>i.trackClick("Dribbble Profile"))},[g(s,{icon:["fab","dribbble"]}),e[20]||(e[20]=k(" ")),e[21]||(e[21]=o("span",null,"design",-1))]),e[27]||(e[27]=k(", ")),o("a",{class:"link",href:"https://github.com/ztfo",target:"_blank",onClick:e[5]||(e[5]=d=>i.trackClick("GitHub Profile"))},[g(s,{icon:["fab","github"]}),e[22]||(e[22]=k(" ")),e[23]||(e[23]=o("span",null,"code",-1))]),e[28]||(e[28]=k(", ")),e[29]||(e[29]=o("span",null,"build with AI",-1)),e[30]||(e[30]=k(", and ")),o("a",{class:"link",href:"https://7thst.music",target:"_blank",onClick:e[6]||(e[6]=d=>i.trackClick("7thSt Music Website"))},[g(s,{icon:["fas","circle-play"]}),e[24]||(e[24]=k(" ")),e[25]||(e[25]=o("span",null,"make dance music.",-1))])]),o("div",Ze,[o("div",Qe,[o("a",{class:"button is-primary mb-3",href:"mailto:hello@builtwithwords.ai",target:"_blank",onClick:e[7]||(e[7]=d=>i.trackClick("Email Link"))},"Email Me")])])]),g(u,null,{default:Ce(()=>[g(a,{isActive:n.snakeGameActive,onCloseGame:i.deactivateSnakeGame},null,8,["isActive","onCloseGame"])]),_:1})],64)}const et={name:"HomePanelComponent",components:{LogoNavComponent:De,SecretSnakeGame:ke},data(){return{snakeGameActive:!1}},methods:{activateSnakeGame(){this.snakeGameActive=!0,this.trackClick("Secret Snake Game Triggered")},deactivateSnakeGame(){this.snakeGameActive=!1},trackClick(t){const r={"LinkedIn Profile":{url:"https://www.linkedin.com/in/luis-palomares/",linkType:"social_professional",location:"bio_section"},"Tucson Tech Article":{url:"https://tucson.com/business/article_cf74558c-5f18-552b-81a0-cf60679257cf.html",linkType:"media_article",location:"bio_section",additionalData:{article_topic:"startup_investment"}},"CertifID Series C Article":{url:"https://www.businesswire.com/news/home/20250715516305/en/CertifID-Raises-%2447.5-Million-Series-C-Led-by-Centana-Growth-Partners",linkType:"media_article",location:"bio_section",additionalData:{article_topic:"series_c_funding"}},"CertifID Website":{url:"https://certifid.com",linkType:"company_website",location:"bio_section",additionalData:{company:"CertifID"}},"Dribbble Profile":{url:"https://dribbble.com/luispalomares",linkType:"social_creative",location:"interests_section",additionalData:{interest_type:"design"}},"GitHub Profile":{url:"https://github.com/ztfo",linkType:"social_technical",location:"interests_section",additionalData:{interest_type:"coding"}},"7thSt Music Website":{url:"https://7thst.music",linkType:"personal_website",location:"interests_section",additionalData:{interest_type:"music"}},"Email Link":{url:"mailto:hello@builtwithwords.ai",linkType:"contact",location:"contact_section",additionalData:{contact_method:"email"}},"Secret Snake Game Triggered":{url:"internal_game",linkType:"secret_feature",location:"bio_section",additionalData:{feature_type:"easter_egg",game:"snake"}}}[t];r&&ve({url:r.url,label:t,linkType:r.linkType,location:r.location,additionalData:r.additionalData||{}})}}},tt=A(et,[["render",Je]]),it={class:"mt-6"};function at(t,e,r,c,n,i){return T(),x("p",it,[e[1]||(e[1]=o("span",null,"📍I live in Austin with my wife ",-1)),o("a",{class:"link",href:"https://katieannclay.com",target:"_blank",onClick:e[0]||(e[0]=(...l)=>i.trackFooterLink&&i.trackFooterLink(...l))},"Katie, a Ceramic Artist"),e[2]||(e[2]=o("span",null," & our 🐕 Bingley.",-1))])}const ot={name:"FooterComponent",methods:{trackFooterLink(){ve({url:"https://katieannclay.com",label:"Katie Clay Website",linkType:"personal",location:"footer"})}}},nt=A(ot,[["render",at],["__scopeId","data-v-43b6b2ab"]]),st=2;function me(t,e,r,c){const n=t.createShader(e);return n?(t.shaderSource(n,r),t.compileShader(n),t.getShaderParameter(n,t.COMPILE_STATUS)?n:(console.error(`[shader-canvas] ${c} failed to compile:`,t.getShaderInfoLog(n)),t.deleteShader(n),null)):null}function rt(t,e,r){const c=me(t,t.VERTEX_SHADER,e,"vertex shader");if(!c)return null;const n=me(t,t.FRAGMENT_SHADER,r,"fragment shader");if(!n)return t.deleteShader(c),null;const i=t.createProgram();return i?(t.attachShader(i,c),t.attachShader(i,n),t.linkProgram(i),t.getProgramParameter(i,t.LINK_STATUS)?{program:i,vertex:c,fragment:n}:(console.error("[shader-canvas] program failed to link:",t.getProgramInfoLog(i)),t.deleteShader(c),t.deleteShader(n),t.deleteProgram(i),null)):(t.deleteShader(c),t.deleteShader(n),null)}function lt({effect:t,getSettings:e}){const r=F(null),c=F(null),n=F(!0),i=F(!1);return X(()=>{const l=r.value,s=c.value;if(!l||!s)return;const a=s.getContext("webgl",{alpha:!0,antialias:!1,premultipliedAlpha:!1,depth:!1,stencil:!1});if(!a){n.value=!1,i.value=!0;return}const u=t.uniforms||{},d=t.scalars||{};let m=null,h=null,v={},B={};const _=t.pointerOrigin||[.5,.5];let U=_[0],$=_[1],Y=_[0],Z=_[1],S=0,j=!0,M=!1,W=0,w=0;const C=window.matchMedia("(prefers-reduced-motion: reduce)");let P=C.matches;function Q(){if(m=rt(a,t.vertex,t.fragment),!m)return n.value=!1,!1;n.value=!0,a.useProgram(m.program),h=a.createBuffer(),a.bindBuffer(a.ARRAY_BUFFER,h),a.bufferData(a.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),a.STATIC_DRAW);const f=a.getAttribLocation(m.program,"position");a.enableVertexAttribArray(f),a.vertexAttribPointer(f,2,a.FLOAT,!1,0,0),v={resolution:u.resolution?a.getUniformLocation(m.program,u.resolution):null,time:u.time?a.getUniformLocation(m.program,u.time):null,pointer:u.pointer?a.getUniformLocation(m.program,u.pointer):null,pixelRatio:u.pixelRatio?a.getUniformLocation(m.program,u.pixelRatio):null},B={};for(const[y,b]of Object.entries(d))B[y]=a.getUniformLocation(m.program,b);return!0}function q(){const f=l.getBoundingClientRect(),y=Math.min(window.devicePixelRatio||1,st),b=Math.max(1,Math.floor(f.width*y)),p=Math.max(1,Math.floor(f.height*y)),L=s.width!==b||s.height!==p;L&&(s.width=b,s.height=p),a.viewport(0,0,b,p),v.resolution&&a.uniform2f(v.resolution,b,p),v.pixelRatio&&a.uniform1f(v.pixelRatio,y),L&&!S&&D(w||0)}function J(f){if(!v.pointer)return;const b=e().pointerAmount??1,p=l.getBoundingClientRect(),L=(f.clientX-p.left)/Math.max(p.width,1),I=1-(f.clientY-p.top)/Math.max(p.height,1);Y=_[0]+(L-_[0])*b,Z=_[1]+(I-_[1])*b}function D(f){const y=e();if(P)W=t.staticTime??0;else{const p=w?f-w:0;W+=Math.min(p,100)*.001*(y.speed??1)}w=f;const b=y.smoothing??.035;U+=(Y-U)*b,$+=(Z-$)*b,v.time&&a.uniform1f(v.time,W),v.pointer&&a.uniform2f(v.pointer,U,$);for(const[p,L]of Object.entries(B)){if(!L)continue;const I=y[p];typeof I=="number"&&a.uniform1f(L,I)}a.drawArrays(a.TRIANGLES,0,6),i.value=!0}function ee(f){D(f),S=te()?requestAnimationFrame(ee):0}function te(){return j&&!document.hidden&&!P&&!M}function R(){if(!(S||M)){if(!te()){D(w||0);return}w=0,S=requestAnimationFrame(ee)}}function E(){S&&(cancelAnimationFrame(S),S=0)}function ie(){document.hidden?E():R()}function O(f){P=f.matches,P?(E(),D(w||0)):R()}function ae(f){f.preventDefault(),M=!0,E()}function oe(){Q()&&(M=!1,q(),R())}if(!Q()){i.value=!0,V(()=>a.getExtension("WEBGL_lose_context")?.loseContext());return}const ne=new ResizeObserver(q);ne.observe(l);const se=new IntersectionObserver(([f])=>{j=f?.isIntersecting??!0,j?R():E()},{rootMargin:"80px"});se.observe(l);const re=l.parentElement||l;re.addEventListener("pointermove",J,{passive:!0}),document.addEventListener("visibilitychange",ie),s.addEventListener("webglcontextlost",ae),s.addEventListener("webglcontextrestored",oe),C.addEventListener?C.addEventListener("change",O):C.addListener(O),q(),R(),V(()=>{E(),ne.disconnect(),se.disconnect(),re.removeEventListener("pointermove",J),document.removeEventListener("visibilitychange",ie),s.removeEventListener("webglcontextlost",ae),s.removeEventListener("webglcontextrestored",oe),C.removeEventListener?C.removeEventListener("change",O):C.removeListener(O),h&&a.deleteBuffer(h),m&&(a.detachShader(m.program,m.vertex),a.detachShader(m.program,m.fragment),a.deleteShader(m.vertex),a.deleteShader(m.fragment),a.deleteProgram(m.program)),a.getExtension("WEBGL_lose_context")?.loseContext()})}),{rootRef:r,canvasRef:c,supported:n,ready:i}}const ue={name:"dot-cloud",staticTime:5,defaults:{speed:1,opacity:1,hue:0,saturation:1,brightness:1},uniforms:{resolution:"resolution",time:"time"},vertex:`
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
  `},fe={name:"ribbon-field",pointerOrigin:[.72,.42],staticTime:6.5,defaults:{speed:1,pointerAmount:1,smoothing:.035,opacity:1,hue:0,saturation:1,brightness:1,contentRight:0},uniforms:{resolution:"resolution",time:"time",pointer:"pointer",pixelRatio:"pixelRatio"},scalars:{contentRight:"contentRight"},vertex:`
    attribute vec2 position;
    void main() {
      gl_Position = vec4(position, 0.0, 1.0);
    }
  `,fragment:`
    precision highp float;
    uniform vec2 resolution;
    uniform float time;
    uniform vec2 pointer;
    uniform float pixelRatio;
    uniform float contentRight;

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

      // The band is sized in CSS px against the copy's right edge, so it
      // sits in the gutter on desktop and the narrower one on phones.
      float pr = max(pixelRatio, 1.0);
      float width = resolution.x / pr;
      float x = gl_FragCoord.x / pr;
      float colRight = contentRight > 0.0 ? contentRight : width - 80.0;
      float gutter = max(width - colRight, 1.0);
      float edge = smoothstep(colRight - min(70.0, gutter * 0.9), width, x);
      edge *= 0.55 + 0.45 * edge;

      float t = time * 0.22;
      float drift = (pointer.x - 0.5) * 0.06;

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

      // The curtain: light that runs the band's full height, so the seam
      // never breaks into separate blobs where the ribbons don't reach.
      float cur = 0.5 + 0.5 * sin(uv.y * 7.0 - t * 2.2 + 1.5 * sin(uv.y * 2.3 + t));
      float curtain = (0.45 + 0.75 * cur) * edge;
      col += mix(mint, blue, 0.5 + 0.5 * sin(uv.y * 3.2 + t * 0.8)) * curtain * 0.60;

      // Dot-matrix texture: the ribbons are only visible through this grid,
      // which is what gives the effect its screen-print feel.
      vec2 grid = fract(gl_FragCoord.xy / 7.0) - 0.5;
      float dotShape = smoothstep(0.29, 0.11, length(grid));
      float noise = hash(floor(gl_FragCoord.xy / 7.0));
      float scan = 0.72 + 0.28 * sin((uv.x + uv.y) * 38.0 + time * 1.3);
      float dots = dotShape * (0.48 + 0.52 * noise) * scan;

      float micro = hash(gl_FragCoord.xy + time) * 0.035;
      float alpha = clamp((glow * 1.55 + bloom * 0.50 + curtain * 1.15) * dots * edge, 0.0, 1.0);

      // Matches --black so the canvas is indistinguishable from the panel
      // wherever the effect fades out.
      vec3 base = vec3(0.004, 0.016, 0.035);
      vec3 finalColor = mix(base, col, clamp(alpha * 1.55, 0.0, 1.0));
      finalColor += micro * edge;

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `},he={name:"stream-convergence",staticTime:4,defaults:{speed:1,fidelity:.5,opacity:1,hue:0,saturation:1,brightness:1},uniforms:{resolution:"u_resolution",time:"u_time"},scalars:{fidelity:"u_fidelity"},vertex:`
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
  `},pe={[ue.name]:ue,[fe.name]:fe,[he.name]:he};function ct(t){if(t&&typeof t=="object")return t;const e=pe[t];if(!e)throw new Error(`[shader-canvas] unknown effect "${t}". Available: ${Object.keys(pe).join(", ")}`);return e}const dt={__name:"ShaderCanvas",props:{effect:{type:[String,Object],required:!0},speed:{type:Number,default:void 0},pointerAmount:{type:Number,default:void 0},smoothing:{type:Number,default:void 0},fidelity:{type:Number,default:void 0},params:{type:Object,default:void 0},opacity:{type:Number,default:void 0},hue:{type:Number,default:void 0},saturation:{type:Number,default:void 0},brightness:{type:Number,default:void 0}},setup(t){const e=t,r=ct(e.effect),c=H(()=>{const u={...r.defaults};for(const d of Object.keys(e))d==="effect"||d==="params"||e[d]===void 0||(u[d]=e[d]);return e.params&&Object.assign(u,e.params),u}),{rootRef:n,canvasRef:i,supported:l,ready:s}=lt({effect:r,getSettings:()=>c.value}),a=H(()=>{const{opacity:u=1,hue:d=0,saturation:m=1,brightness:h=1}=c.value,v=d!==0||m!==1||h!==1;return{opacity:s.value?u:0,filter:v?`hue-rotate(${d}deg) saturate(${m}) brightness(${h})`:"none"}});return(u,d)=>(T(),x("div",{class:be(["shader-canvas",[`shader-canvas--${N(r).name}`,{"is-unsupported":!N(l)}]]),ref_key:"rootRef",ref:n,style:Ge(a.value)},[o("canvas",{class:"shader-canvas__surface",ref_key:"canvasRef",ref:i,"aria-hidden":"true"},null,512)],6))}},mt=A(dt,[["__scopeId","data-v-33e89ba2"]]),ut={class:"panel-content"},ft={class:"home-panel right"},ht={__name:"default",setup(t){const e=Te(),r=z(null),c=z(null),n=z({});function i(){const u=r.value,d=c.value;if(!u||!d)return;let m=0;for(let h=d;h&&h!==u;h=h.offsetParent)m+=h.offsetLeft;n.value={contentRight:m+d.offsetWidth}}let l=null;X(()=>{i(),l=new ResizeObserver(i),l.observe(r.value)}),V(()=>l?.disconnect());const s=H(()=>e.path.startsWith("/project")),a=z(null);return Ae(()=>e.path,()=>a.value?.scrollTo({top:0})),(u,d)=>(T(),x("div",{class:be(["home",{"detail-first":N(s)}])},[o("div",{class:"home-panel left",ref_key:"leftPanel",ref:r},[g(mt,{class:"panel-shader",effect:"ribbon-field",opacity:.55,params:N(n)},null,8,["params"]),d[0]||(d[0]=o("div",{class:"panel-scrim"},null,-1)),o("div",ut,[o("div",{class:"long-divider",ref_key:"divider",ref:c},null,512),g(tt),g(nt,{class:"rise",style:{"--rise-index":"6"}})])],512),o("div",ft,[o("div",{class:"inner-scroll",ref_key:"innerScroll",ref:a},[Re(u.$slots,"default",{},void 0)],512)])],2))}},gt=A(ht,[["__scopeId","data-v-7d231d30"]]);export{gt as default};
