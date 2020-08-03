!function(t){var i={};function e(h){if(i[h])return i[h].exports;var s=i[h]={i:h,l:!1,exports:{}};return t[h].call(s.exports,s,s.exports,e),s.l=!0,s.exports}e.m=t,e.c=i,e.d=function(t,i,h){e.o(t,i)||Object.defineProperty(t,i,{enumerable:!0,get:h})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,i){if(1&i&&(t=e(t)),8&i)return t;if(4&i&&"object"==typeof t&&t&&t.__esModule)return t;var h=Object.create(null);if(e.r(h),Object.defineProperty(h,"default",{enumerable:!0,value:t}),2&i&&"string"!=typeof t)for(var s in t)e.d(h,s,function(i){return t[i]}.bind(null,s));return h},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)},e.p="",e(e.s=0)}([function(t,i,e){"use strict";e.r(i);let h,s,r={};function n(t,...i){r[t]&&r[t].map(t=>t(...i))}function o(){return h}function a(){return s}function c(t){if(h=document.getElementById(t)||t||document.querySelector("canvas"),!h)throw Error("You must provide a canvas element for the game");return s=h.getContext("2d"),s.imageSmoothingEnabled=!1,n("init"),{canvas:h,context:s}}class l{constructor({spriteSheet:t,frames:i,frameRate:e,loop:h=!0}={}){this.spriteSheet=t,this.frames=i,this.frameRate=e,this.loop=h;let{width:s,height:r,margin:n=0}=t.frame;this.width=s,this.height=r,this.margin=n,this._f=0,this._a=0}clone(){return d(this)}reset(){this._f=0,this._a=0}update(t=1/60){if(this.loop||this._f!=this.frames.length-1)for(this._a+=t;this._a*this.frameRate>=1;)this._f=++this._f%this.frames.length,this._a-=1/this.frameRate}render({x:t,y:i,width:e=this.width,height:h=this.height,context:s=a()}={}){let r=this.frames[this._f]/this.spriteSheet._f|0,n=this.frames[this._f]%this.spriteSheet._f|0;s.drawImage(this.spriteSheet.image,n*this.width+(2*n+1)*this.margin,r*this.height+(2*r+1)*this.margin,this.width,this.height,t,i,e,h)}}function d(t){return new l(t)}d.prototype=l.prototype,d.class=l;new WeakMap;const u=()=>{};function f(){let t=o();a().clearRect(0,0,t.width,t.height)}function p({fps:t=60,clearCanvas:i=!0,update:e,render:h}={}){if(!e||!h)throw Error("You must provide update() and render() functions");let s,r,o,a,c,l=0,d=1e3/t,p=1/t,y=i?f:u;function g(){if(r=requestAnimationFrame(g),o=performance.now(),a=o-s,s=o,!(a>1e3)){for(n("tick"),l+=a;l>=d;)c.update(p),l-=d;y(),c.render()}}return c={update:e,render:h,isStopped:!0,start(){s=performance.now(),this.isStopped=!1,requestAnimationFrame(g)},stop(){this.isStopped=!0,cancelAnimationFrame(r)},_frame:g,set _last(t){s=t}},c}let y={},g={},x={Enter:"enter",Escape:"esc",Space:"space",ArrowLeft:"left",ArrowUp:"up",ArrowRight:"right",ArrowDown:"down",13:"enter",27:"esc",32:"space",37:"left",38:"up",39:"right",40:"down"};function m(t){let i=x[t.code||t.which];g[i]=!0,y[i]&&y[i](t)}function w(t){g[x[t.code||t.which]]=!1}function _(){g={}}function v(){let t;for(t=0;t<26;t++)x[t+65]=x["Key"+String.fromCharCode(t+65)]=String.fromCharCode(t+97);for(t=0;t<10;t++)x[48+t]=x["Digit"+t]=""+t;window.addEventListener("keydown",m),window.addEventListener("keyup",w),window.addEventListener("blur",_)}function b(t){return!!g[t]}class A{constructor({create:t,maxSize:i=1024}={}){let e;if(!t||!(e=t())||!(e.update&&e.init&&e.isAlive))throw Error("Must provide create() function which returns an object with init(), update(), and isAlive() functions");this._c=t,this.objects=[t()],this.size=0,this.maxSize=i}get(t={}){if(this.size===this.objects.length){if(this.size===this.maxSize)return;for(let t=0;t<this.size&&this.objects.length<this.maxSize;t++)this.objects.push(this._c())}let i=this.objects[this.size];return this.size++,i.init(t),i}getAliveObjects(){return this.objects.slice(0,this.size)}clear(){this.size=this.objects.length=0,this.objects.push(this._c())}update(t){let i,e=!1;for(let h=this.size;h--;)i=this.objects[h],i.update(t),i.isAlive()||(e=!0,this.size--);e&&this.objects.sort((t,i)=>i.isAlive()-t.isAlive())}render(){for(let t=this.size;t--;)this.objects[t].render()}}function S(t){return new A(t)}function j(t,i){let e=[],h=i.x+i.width/2,s=i.y+i.height/2,r=t.y<s&&t.y+t.height>=i.y,n=t.y+t.height>=s&&t.y<i.y+i.height;return t.x<h&&t.x+t.width>=i.x&&(r&&e.push(0),n&&e.push(2)),t.x+t.width>=h&&t.x<i.x+i.width&&(r&&e.push(1),n&&e.push(3)),e}S.prototype=A.prototype,S.class=A;class z{constructor({maxDepth:t=3,maxObjects:i=25,bounds:e}={}){this.maxDepth=t,this.maxObjects=i;let h=o();this.bounds=e||{x:0,y:0,width:h.width,height:h.height},this._b=!1,this._d=0,this._o=[],this._s=[],this._p=null}clear(){this._s.map((function(t){t.clear()})),this._b=!1,this._o.length=0}get(t){let i,e,h=new Set;for(;this._s.length&&this._b;){for(i=j(t,this.bounds),e=0;e<i.length;e++)this._s[i[e]].get(t).forEach(t=>h.add(t));return Array.from(h)}return this._o.filter(i=>i!==t)}add(){let t,i,e,h;for(i=0;i<arguments.length;i++)if(e=arguments[i],Array.isArray(e))this.add.apply(this,e);else if(this._b)this._a(e);else if(this._o.push(e),this._o.length>this.maxObjects&&this._d<this.maxDepth){for(this._sp(),t=0;h=this._o[t];t++)this._a(h);this._o.length=0}}_a(t,i,e){for(i=j(t,this.bounds),e=0;e<i.length;e++)this._s[i[e]].add(t)}_sp(t,i,e){if(this._b=!0,!this._s.length)for(t=this.bounds.width/2|0,i=this.bounds.height/2|0,e=0;e<4;e++)this._s[e]=E({bounds:{x:this.bounds.x+(e%2==1?t:0),y:this.bounds.y+(e>=2?i:0),width:t,height:i},maxDepth:this.maxDepth,maxObjects:this.maxObjects}),this._s[e]._d=this._d+1,this._s[e]._p=this}}function E(t){return new z(t)}E.prototype=z.prototype,E.class=z;class O{constructor(t=0,i=0){this._x=t,this._y=i}add(t,i=1){return M(this.x+(t.x||0)*i,this.y+(t.y||0)*i,this)}clamp(t,i,e,h){this._c=!0,this._a=t,this._b=i,this._d=e,this._e=h}get x(){return this._x}get y(){return this._y}set x(t){this._x=this._c?Math.min(Math.max(this._a,t),this._d):t}set y(t){this._y=this._c?Math.min(Math.max(this._b,t),this._e):t}}function M(t,i,e={}){let h=new O(t,i);return e._c&&(h.clamp(e._a,e._b,e._d,e._e),h.x=t,h.y=i),h}M.prototype=O.prototype,M.class=O;class W{constructor(t){this.init(t)}init(t={}){let{x:i,y:e,dx:h,dy:s,ddx:r,ddy:n,width:o,height:c,image:l}=t;this.position=M(i,e),this.velocity=M(h,s),this.acceleration=M(r,n),this._fx=this._fy=1,this.width=this.height=this.rotation=0,this.ttl=1/0,this.anchor={x:0,y:0},this.context=a();for(let i in t)this[i]=t[i];l&&(this.width=void 0!==o?o:l.width,this.height=void 0!==c?c:l.height),this.sx=0,this.sy=0}get x(){return this.position.x}get y(){return this.position.y}get dx(){return this.velocity.x}get dy(){return this.velocity.y}get ddx(){return this.acceleration.x}get ddy(){return this.acceleration.y}get animations(){return this._a}get viewX(){return this.x-this.sx}get viewY(){return this.y-this.sy}get width(){return this._w}get height(){return this._h}set x(t){this.position.x=t}set y(t){this.position.y=t}set dx(t){this.velocity.x=t}set dy(t){this.velocity.y=t}set ddx(t){this.acceleration.x=t}set ddy(t){this.acceleration.y=t}set animations(t){let i,e;for(i in this._a={},t)this._a[i]=t[i].clone(),e=e||this._a[i];this.currentAnimation=e,this.width=this.width||e.width,this.height=this.height||e.height}set viewX(t){}set viewY(t){}set width(t){let i=t<0?-1:1;this._fx=i,this._w=t*i}set height(t){let i=t<0?-1:1;this._fy=i,this._h=t*i}isAlive(){return this.ttl>0}collidesWith(t){if(this.rotation||t.rotation)return null;let i=this.x-this.width*this.anchor.x,e=this.y-this.height*this.anchor.y,h=t.x,s=t.y;return t.anchor&&(h-=t.width*t.anchor.x,s-=t.height*t.anchor.y),i<h+t.width&&i+this.width>h&&e<s+t.height&&e+this.height>s}update(t){this.advance(t)}render(){this.draw()}playAnimation(t){this.currentAnimation=this.animations[t],this.currentAnimation.loop||this.currentAnimation.reset()}advance(t){this.velocity=this.velocity.add(this.acceleration,t),this.position=this.position.add(this.velocity,t),this.ttl--,this.currentAnimation&&this.currentAnimation.update(t)}draw(){let t=-this.width*this.anchor.x,i=-this.height*this.anchor.y;if(this.context.save(),this.context.translate(this.viewX,this.viewY),this.rotation&&this.context.rotate(this.rotation),-1==this._fx||-1==this._fy){let e=this.width/2+t,h=this.height/2+i;this.context.translate(e,h),this.context.scale(this._fx,this._fy),this.context.translate(-e,-h)}this.image?this.context.drawImage(this.image,0,0,this.image.width,this.image.height,t,i,this.width,this.height):this.currentAnimation?this.currentAnimation.render({x:t,y:i,width:this.width,height:this.height,context:this.context}):(this.context.fillStyle=this.color,this.context.fillRect(t,i,this.width,this.height)),this.context.restore()}}function R(t){return new W(t)}function C(t){if(+t===t)return t;let i=[],e=t.split(".."),h=+e[0],s=+e[1],r=h;if(h<s)for(;r<=s;r++)i.push(r);else for(;r>=s;r--)i.push(r);return i}R.prototype=W.prototype,R.class=W;class D{constructor({image:t,frameWidth:i,frameHeight:e,frameMargin:h,animations:s}={}){if(!t)throw Error("You must provide an Image for the SpriteSheet");this.animations={},this.image=t,this.frame={width:i,height:e,margin:h},this._f=t.width/i|0,this.createAnimations(s)}createAnimations(t){let i,e;for(e in t){let{frames:h,frameRate:s,loop:r}=t[e];if(i=[],void 0===h)throw Error("Animation "+e+" must provide a frames property");[].concat(h).map(t=>{i=i.concat(C(t))}),this.animations[e]=d({spriteSheet:this,frames:i,frameRate:s,loop:r})}}}function k(t){return new D(t)}k.prototype=D.prototype,k.class=D;let Y=[],P=[],G=[],I=[];v();class L extends R.class{constructor(t){super(t),this.onGround=!1,this.life=3,this.score=0,this.initial=this.position,this.finish=!1,this.victory=!1}update(){this.finish||(this.dx=0,this.dy=this.dy<5?this.dy+1:5,I.filter(t=>this.collidesWith(t)).length&&(this.finish=!0,this.victory=!0),P.filter(t=>this.collidesWith(t)).length&&(this.life>0?(this.position=this.initial,this.life-=1):this.finish=!0),G.filter(t=>this.collidesWith(t)).length&&(this.score+=G.filter(t=>this.collidesWith(t)).length,G=G.filter(t=>!this.collidesWith(t))),b("left")?this.dx=-2.6:b("right")&&(this.dx=2.6),b("up")&&this.onGround?(this.dy=-10,this.onGround=!1):Y.filter(t=>this.collidesWith(t)).length&&(this.dy=0,this.y=Y.filter(t=>this.collidesWith(t))[0].y-this.height,this.onGround=!0),this.advance())}}(new class{constructor(){let{canvas:t,context:i}=c(),e=new L({x:0,y:80,color:"blue",width:20,height:20,anchor:{x:0,y:0}});Y.push(new R({x:0,y:100,color:"green",width:300,height:20,anchor:{x:0,y:0}})),G.push(new R({x:70,y:50,color:"yellow",width:10,height:10,anchor:{x:0,y:0}})),G.push(new R({x:150,y:50,color:"yellow",width:10,height:10,anchor:{x:0,y:0}})),G.push(new R({x:210,y:50,color:"yellow",width:10,height:10,anchor:{x:0,y:0}})),P.push(new R({x:100,y:80,color:"red",width:20,height:20,anchor:{x:0,y:0}})),I.push(new R({x:280,y:0,color:"pink",width:10,height:100,anchor:{x:0,y:0}})),this.gameloop=p({update:()=>{e.update(),e.x>t.width&&(e.x=-e.width)},render:()=>{i.fillStyle="black",i.font="16px Courier New",i.textBaseline="top";for(let t of Y)t.render();for(let t of P)t.render();for(let t of G)t.render();for(let t of I)t.render();i.fillText(`lives: ${e.life}  score: ${e.score}`,0,0),e.finish?i.fillText(e.victory?"victory":"defeated",50,30):e.render()}})}}).gameloop.start()}]);