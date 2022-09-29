(()=>{"use strict";const t=function(t){this.game=t};var e,i=(e=function(t,i){return e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])},e(t,i)},function(t,i){if("function"!=typeof i&&null!==i)throw new TypeError("Class extends value "+String(i)+" is not a constructor or null");function r(){this.constructor=t}e(t,i),t.prototype=null===i?Object.create(i):(r.prototype=i.prototype,new r)});const r=function(t){function e(e,i,r){var n=t.call(this,e)||this;return n.image=document.getElementById("collision"),n.spriteWidth=100,n.spriteHeight=90,n.sizeModifier=Math.random()+.5,n.width=n.spriteWidth*n.sizeModifier,n.height=n.spriteHeight*n.sizeModifier,n.x=i-.5*n.width,n.y=r-.5*n.height,n.frameX=0,n.maxFrame=4,n.markedForDeletion=!1,n.fps=20,n.frameTimer=0,n.frameInterfal=1e3/n.fps,n}return i(e,t),e.prototype.draw=function(t){t&&t.drawImage(this.image,this.frameX*this.spriteWidth,0,this.spriteWidth,this.spriteHeight,this.x,this.y,this.width,this.height)},e.prototype.update=function(t){this.x-=this.game.speed,this.frameTimer>this.frameInterfal?(this.frameX++,this.frameTimer=0):this.frameTimer+=t,this.frameX>this.maxFrame&&(this.markedForDeletion=!0)},e}(t);const n=function(){function t(t,e,i,r,n){this.value=t,this.x=e,this.y=i,this.targetX=r,this.targetY=n,this.timer=0,this.markedForDeletion=!1}return t.prototype.update=function(){this.x+=.03*(this.targetX-this.x),this.y+=.03*(this.targetY-this.y),this.timer++,this.timer>100&&(this.markedForDeletion=!0)},t.prototype.draw=function(t){t&&(t.font="40px Creepster",t.fillStyle="white",t.fillText(this.value,this.x,this.y),t.fillStyle="black",t.fillText(this.value,this.x+2,this.y+2))},t}();var a=function(){var t=function(e,i){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])},t(e,i)};return function(e,i){if("function"!=typeof i&&null!==i)throw new TypeError("Class extends value "+String(i)+" is not a constructor or null");function r(){this.constructor=e}t(e,i),e.prototype=null===i?Object.create(i):(r.prototype=i.prototype,new r)}}(),s=function(t){function e(e){var i=t.call(this,e)||this;return i.markedForDeletion=!1,i}return a(e,t),e.prototype.update=function(){this.x-=this.speedX+this.game.speed,this.y-=this.speedY,this.size*=.95,this.size<.5&&(this.markedForDeletion=!0)},e.prototype.draw=function(t){},e}(t),h=function(t){function e(e,i,r){var n=t.call(this,e)||this;return n.x=i,n.y=r,n.size=10*Math.random()+10,n.speedX=Math.random(),n.speedY=Math.random(),n.color="rgba(0,0,0,0.2)",n}return a(e,t),e.prototype.draw=function(t){t&&(t.beginPath(),t.arc(this.x,this.y,this.size,0,2*Math.PI),t.fillStyle=this.color,t.fill())},e}(s),o=function(t){function e(e,i,r){var n=t.call(this,e)||this;return n.size=100*Math.random()+100,n.x=i-.4*n.size,n.y=r-.5*n.size,n.speedX=6*Math.random()-4,n.speedY=2*Math.random()+1,n.gravity=0,n.image=document.getElementById("fire"),n}return a(e,t),e.prototype.update=function(){t.prototype.update.call(this),this.gravity+=.1,this.y+=this.gravity},e.prototype.draw=function(t){t.drawImage(this.image,this.x,this.y,this.size,this.size)},e}(s),m=function(t){function e(e,i,r){var n=t.call(this,e)||this;return n.image=document.getElementById("fire"),n.x=i,n.y=r,n.size=100*Math.random()+50,n.speedX=1,n.speedY=1,n.angle=0,n.va=.2*Math.random()-.1,n}return a(e,t),e.prototype.update=function(){t.prototype.update.call(this),this.angle+=this.va,this.x+=Math.sin(10*this.angle)},e.prototype.draw=function(t){t.save(),t.translate(this.x,this.y),t.rotate(this.angle),t.drawImage(this.image,.5*-this.size,.5*-this.size,this.size,this.size),t.restore()},e}(s),l=function(){var t=function(e,i){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])},t(e,i)};return function(e,i){if("function"!=typeof i&&null!==i)throw new TypeError("Class extends value "+String(i)+" is not a constructor or null");function r(){this.constructor=e}t(e,i),e.prototype=null===i?Object.create(i):(r.prototype=i.prototype,new r)}}(),c=0,u=1,p=2,g=3,y=4,d=5,f=function(){function t(t,e){this.state=t,this.game=e}return t.prototype.enter=function(){},t.prototype.handleInput=function(t){},t}(),w=function(t){function e(e){return t.call(this,"SITTING",e)||this}return l(e,t),e.prototype.enter=function(){this.game.player.frameX=0,this.game.player.maxFrame=4,this.game.player.frameY=5},e.prototype.handleInput=function(t){t.includes("a")||t.includes("d")?this.game.player.setState(u,1):t.includes(" ")&&this.game.player.energy>0?this.game.player.setState(y,2):t.includes("w")&&this.game.player.setState(p,1)},e}(f),v=function(t){function e(e){var i=t.call(this,"RUNNING",e)||this;return i.game=e,i}return l(e,t),e.prototype.enter=function(){this.game.player.frameX=0,this.game.player.maxFrame=8,this.game.player.frameY=3},e.prototype.handleInput=function(t){this.game.particles.unshift(new h(this.game,this.game.player.x+.6*this.game.player.width,this.game.player.y+this.game.player.height)),t.includes("s")?this.game.player.setState(c,0):t.includes("w")?this.game.player.setState(p,1):t.includes(" ")&&this.game.player.energy>0&&this.game.player.setState(y,2)},e}(f),x=function(t){function e(e){var i=t.call(this,"JUMPING",e)||this;return i.game=e,i}return l(e,t),e.prototype.enter=function(){this.game.player.onGround()&&(this.game.player.vy-=30),this.game.player.frameX=0,this.game.player.maxFrame=6,this.game.player.frameY=1},e.prototype.handleInput=function(t){this.game.player.vy>0?this.game.player.setState(g,1):t.includes(" ")?this.game.player.setState(y,2):t.includes("s")&&this.game.player.setState(d,0)},e}(f),I=function(t){function e(e){var i=t.call(this,"FALLING",e)||this;return i.game=e,i}return l(e,t),e.prototype.enter=function(){this.game.player.onGround()&&(this.game.player.vy-=27),this.game.player.frameX=0,this.game.player.maxFrame=6,this.game.player.frameY=2},e.prototype.handleInput=function(t){this.game.player.onGround()?this.game.player.setState(u,1):t.includes("s")&&this.game.player.setState(d,0)},e}(f),S=function(t){function e(e){var i=t.call(this,"ROLLING",e)||this;return i.game=e,i}return l(e,t),e.prototype.enter=function(){this.game.player.frameX=0,this.game.player.maxFrame=6,this.game.player.frameY=6},e.prototype.handleInput=function(t){this.game.particles.unshift(new m(this.game,this.game.player.x+.5*this.game.player.width,this.game.player.y+.5*this.game.player.height)),!t.includes(" ")&&this.game.player.onGround()?this.game.player.setState(u,1):t.includes(" ")||this.game.player.onGround()?t.includes("w")&&t.includes(" ")&&this.game.player.onGround()?this.game.player.vy-=27:t.includes("s")&&!this.game.player.onGround()?this.game.player.setState(d,0):this.game.player.energy<=0&&this.game.player.setState(u,1):this.game.player.setState(g,1)},e}(f),M=function(t){function e(e){var i=t.call(this,"DIVING",e)||this;return i.game=e,i}return l(e,t),e.prototype.enter=function(){this.game.player.frameX=0,this.game.player.maxFrame=6,this.game.player.frameY=6,this.game.player.vy=15},e.prototype.handleInput=function(t){if(this.game.particles.unshift(new m(this.game,this.game.player.x+.5*this.game.player.width,this.game.player.y+.5*this.game.player.height)),this.game.player.onGround()){this.game.player.setState(u,1);for(var e=0;e<30;e++)this.game.particles.unshift(new o(this.game,this.game.player.x+.5*this.game.player.width,this.game.player.y+this.game.player.height))}else t.includes(" ")&&this.game.player.onGround()&&this.game.player.setState(y,2)},e}(f),_=function(t){function e(e){var i=t.call(this,"HIT",e)||this;return i.game=e,i}return l(e,t),e.prototype.enter=function(){this.game.player.frameX=0,this.game.player.maxFrame=10,this.game.player.frameY=4},e.prototype.handleInput=function(t){this.game.player.frameX>=10&&this.game.player.onGround()?this.game.player.setState(u,1):this.game.player.frameX>=10&&!this.game.player.onGround()&&this.game.player.setState(g,2)},e}(f),k=function(){var t=function(e,i){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])},t(e,i)};return function(e,i){if("function"!=typeof i&&null!==i)throw new TypeError("Class extends value "+String(i)+" is not a constructor or null");function r(){this.constructor=e}t(e,i),e.prototype=null===i?Object.create(i):(r.prototype=i.prototype,new r)}}(),E=function(t){function e(e){var i=t.call(this,e)||this;return i.width=100,i.height=91.3,i.x=0,i.y=i.game.height-i.height-i.game.groundMargin,i.image=document.getElementById("player"),i.frameX=0,i.frameY=0,i.maxFrame=5,i.speed=0,i.maxSpeed=10,i.vy=0,i.weigth=1,i.fps=20,i.frameTimer=0,i.energy=50,i.energyTimer=0,i.energyInterval=500,i.frameInterfal=1e3/i.fps,i.states=[new w(i.game),new v(i.game),new x(i.game),new I(i.game),new S(i.game),new M(i.game),new _(i.game)],i.currentState=null,i}return k(e,t),e.prototype.update=function(t,e){this.checkCollisions(),this.currentState.handleInput(t),this.currentState!==this.states[4]&&(this.energyTimer>this.energyInterval?(this.energy<50&&this.energy++,this.energyTimer=0):this.energyTimer+=e),t.includes("d")&&this.currentState!==this.states[6]?this.x+=this.maxSpeed:t.includes("a")&&this.currentState!==this.states[6]?this.x-=this.maxSpeed:this.speed=0,this.x<0&&(this.x=0),this.x>this.game.width-this.width&&(this.x=this.game.width-this.width),this.y+=this.vy,this.onGround()?this.vy=0:this.vy+=this.weigth,this.y>this.game.height-this.height-this.game.groundMargin&&(this.y=this.game.height-this.height-this.game.groundMargin),this.frameTimer>this.frameInterfal?(this.frameTimer=0,this.frameX<this.maxFrame?this.frameX++:this.frameX=0):this.frameTimer+=e},e.prototype.draw=function(t,e){t&&(this.game.debug&&t.strokeRect(this.x,this.y,this.width,this.height),t.drawImage(this.image,this.width*this.frameX,this.height*this.frameY,this.width,this.height,this.x,this.y,this.width,this.height))},e.prototype.onGround=function(){return this.y>=this.game.height-this.height-this.game.groundMargin},e.prototype.setState=function(t,e){this.currentState=this.states[t],this.game.speed=this.game.maxSpeed*e,this.currentState.enter()},e.prototype.checkCollisions=function(){var t=this;this.game.enemies.forEach((function(e){e.x<t.x+t.width&&e.x+e.width>t.x&&e.y<t.y+t.height&&e.y+e.height>t.y&&(e.markedForDeletion=!0,t.game.collisions.push(new r(t.game,e.x+.5*e.width,e.y+.5*e.height)),t.currentState===t.states[4]||t.currentState===t.states[5]?(t.game.score+=e.score,t.game.floatingMessages.push(new n("+".concat(e.score),e.x,e.y,150,50)),t.energy-=e.score,t.energy<=0&&(t.energy=0)):(t.setState(6,0),t.game.lives--,t.game.lives<=0&&(t.game.gameOver=!0)))}))},e}(t);const T=E;const F=function(t){var e=this;this.keys=[],this.game=t,window.addEventListener("keydown",(function(t){console.log(t.key),"s"!==t.key&&"w"!==t.key&&"a"!==t.key&&"d"!==t.key&&" "!==t.key||-1!==e.keys.indexOf(t.key)?"Enter"===t.key&&e.game.gameOver&&e.game.gameRestart():e.keys.push(t.key)})),window.addEventListener("keyup",(function(t){"s"!==t.key&&"w"!==t.key&&"a"!==t.key&&"d"!==t.key&&" "!==t.key||e.keys.splice(e.keys.indexOf(t.key),1)}))};var b=function(){var t=function(e,i){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])},t(e,i)};return function(e,i){if("function"!=typeof i&&null!==i)throw new TypeError("Class extends value "+String(i)+" is not a constructor or null");function r(){this.constructor=e}t(e,i),e.prototype=null===i?Object.create(i):(r.prototype=i.prototype,new r)}}(),O=function(t){function e(e,i,r,n,a){var s=t.call(this,e)||this;return s.width=i,s.height=r,s.speedModifier=n,s.image=a,s.x=0,s.y=0,s}return b(e,t),e.prototype.update=function(){this.x<-this.width?this.x=0:this.x-=this.game.speed*this.speedModifier},e.prototype.draw=function(t){t&&(t.drawImage(this.image,this.x,this.y,this.width,this.height),t.drawImage(this.image,this.x+this.width,this.y,this.width,this.height))},e}(t);const X=function(t){function e(e){for(var i=[],r=1;r<arguments.length;r++)i[r-1]=arguments[r];var n=t.call(this,e)||this;return n.width=1667,n.height=500,n.layer1image=i[0],n.layer2image=i[1],n.layer3image=i[2],n.layer4image=i[3],n.layer5image=i[4],n.layer1=new O(n.game,n.width,n.height,0,n.layer1image),n.layer2=new O(n.game,n.width,n.height,.2,n.layer2image),n.layer3=new O(n.game,n.width,n.height,.4,n.layer3image),n.layer4=new O(n.game,n.width,n.height,.8,n.layer4image),n.layer5=new O(n.game,n.width,n.height,1,n.layer5image),n.backgroundLayers=[n.layer1,n.layer2,n.layer3,n.layer4,n.layer5],n}return b(e,t),e.prototype.update=function(){this.backgroundLayers.forEach((function(t){t.update()}))},e.prototype.draw=function(t){this.backgroundLayers.forEach((function(e){t&&e.draw(t)}))},e}(t);var B=function(){var t=function(e,i){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])},t(e,i)};return function(e,i){if("function"!=typeof i&&null!==i)throw new TypeError("Class extends value "+String(i)+" is not a constructor or null");function r(){this.constructor=e}t(e,i),e.prototype=null===i?Object.create(i):(r.prototype=i.prototype,new r)}}(),Y=function(t){function e(e){var i=t.call(this,e)||this;return i.frameX=0,i.frameY=0,i.fps=20,i.frameInterfal=1e3/i.fps,i.frameTimer=0,i.markedForDeletion=!1,i}return B(e,t),e.prototype.update=function(t){this.x-=this.speedX+this.game.speed,this.y+=this.speedY,this.frameTimer>this.frameInterfal?(this.frameTimer=0,this.frameX<this.maxFrame?this.frameX++:this.frameX=0):this.frameTimer+=t,this.x+this.width<0&&(this.markedForDeletion=!0)},e.prototype.draw=function(t){t&&(this.game.debug&&t.strokeRect(this.x,this.y,this.width,this.height),t.drawImage(this.image,this.width*this.frameX,0,this.width,this.height,this.x,this.y,this.width,this.height))},e}(t),z=function(t){function e(e){var i=t.call(this,e)||this;return i.x=i.game.width+Math.random()*i.game.width*.5,i.y=Math.random()*i.game.height*.5,i.speedX=Math.random()+1,i.speedY=0,i.angle=0,i.va=.1*Math.random()+.1,i}return B(e,t),e.prototype.update=function(e){t.prototype.update.call(this,e),this.angle+=this.va,this.y+=Math.sin(this.angle)},e}(Y),G=function(t){function e(e){var i=t.call(this,e)||this;return i.x=i.game.width+Math.random()*e.width*.5,i.y=Math.random()*i.game.height*.5,i.speedX=Math.random()+1,i.speedY=0,i.fps=40,i}return B(e,t),e.prototype.update=function(t){this.x-=7*Math.random()-3.5+this.game.speed,this.y+=7*Math.random()-3.5,this.frameTimer>this.frameInterfal?(this.frameTimer=0,this.frameX<this.maxFrame?this.frameX++:this.frameX=0):this.frameTimer+=t},e}(Y),P=function(t){function e(e){var i=t.call(this,e)||this;return i.speedX=0,i.speedY=0,i}return B(e,t),e}(Y),j=function(t){function e(e){var i=t.call(this,e)||this;return i.x=i.game.width,i.y=Math.random()*i.game.height*.5,i.speedX=0,i.speedY=Math.random()>.5?1:-1,i}return B(e,t),e.prototype.update=function(e){t.prototype.update.call(this,e),this.y>this.game.height-this.height-this.game.groundMargin&&(this.speedY*=-1),this.y<-this.height&&(this.markedForDeletion=!0)},e.prototype.draw=function(e){e.beginPath(),e.moveTo(this.x+this.width/2,0),e.lineTo(this.x+this.width/2,this.y+this.height/2),e.stroke(),t.prototype.draw.call(this,e)},e}(Y),L=function(t){function e(e){var i=t.call(this,e)||this;return i.x=i.game.width,i.speedX=Math.random()+1,i.speedY=0,i}return B(e,t),e}(Y),D=function(t){function e(e){var i=t.call(this,e)||this;return i.x=i.game.width+Math.random()*i.game.width*.5,i.y=Math.random()*i.game.height*.5,i.teleportInterval=Math.floor(100*Math.random()+50),i}return B(e,t),e.prototype.update=function(t){this.teleportTimer>this.teleportInterval?(this.newX=Math.random()*(this.game.width-this.width),this.newY=Math.random()*(this.game.height-this.height),this.teleportTimer=0):this.teleportTimer++;var e=this.x-this.newX,i=this.y-this.newY;this.x-=e/70,this.y-=i/70,this.teleportTimer++,this.frameTimer>this.frameInterfal?(this.frameTimer=0,this.frameX<this.maxFrame?this.frameX++:this.frameX=0):this.frameTimer+=t},e}(Y),A=function(t){function e(e){var i=t.call(this,e)||this;return i.image=document.getElementById("fly"),i.width=60,i.height=44,i.maxFrame=5,i.score=1,i}return B(e,t),e}(z),C=(function(t){function e(e){var i=t.call(this,e)||this;return i.image=document.getElementById("bat_1"),i.width=83.1,i.height=44,i.maxFrame=5,i.score=1,i}B(e,t)}(G),function(t){function e(e){var i=t.call(this,e)||this;return i.image=document.getElementById("bat_2"),i.width=59.5,i.height=42,i.maxFrame=7,i.score=1,i}return B(e,t),e}(z)),N=(function(t){function e(e){var i=t.call(this,e)||this;return i.image=document.getElementById("bat_3"),i.width=66.5,i.height=47,i.maxFrame=5,i.score=1,i}B(e,t)}(z),function(t){function e(e){var i=t.call(this,e)||this;return i.image=document.getElementById("spinner"),i.width=53.2,i.height=53,i.newX=Math.random()*(i.game.width-i.width),i.newY=Math.random()*(i.game.height-i.height),i.maxFrame=8,i.score=2,i.teleportTimer=0,i}return B(e,t),e}(D)),R=function(t){function e(e){var i=t.call(this,e)||this;return i.image=document.getElementById("plant"),i.width=60,i.height=87,i.maxFrame=1,i.score=2,i.x=i.game.width,i.y=i.game.height-i.height-i.game.groundMargin,i}return B(e,t),e}(P),W=function(t){function e(e){var i=t.call(this,e)||this;return i.image=document.getElementById("zomby_hand"),i.width=55.75,i.height=80,i.maxFrame=7,i.score=2,i.x=i.game.width,i.y=i.game.height-i.height-i.game.groundMargin,i}return B(e,t),e}(P),H=function(t){function e(e){var i=t.call(this,e)||this;return i.image=document.getElementById("digger"),i.width=130,i.height=89,i.maxFrame=7,i.score=2,i.x=i.game.width,i.y=i.game.height-i.height-i.game.groundMargin,i}return B(e,t),e}(P),U=function(t){function e(e){var i=t.call(this,e)||this;return i.image=document.getElementById("spider"),i.width=120,i.height=144,i.maxFrame=5,i.score=3,i}return B(e,t),e}(j),q=function(t){function e(e){var i=t.call(this,e)||this;return i.image=document.getElementById("small_spider"),i.width=77,i.height=44,i.maxFrame=5,i.score=3,i}return B(e,t),e}(j),J=function(t){function e(e){var i=t.call(this,e)||this;return i.width=80,i.height=60,i.y=i.game.height-i.height-i.game.groundMargin,i.image=document.getElementById("worm"),i.maxFrame=5,i.score=2,i}return B(e,t),e}(L),V=function(t){function e(e){var i=t.call(this,e)||this;return i.width=85,i.height=120,i.y=i.game.height-i.height-i.game.groundMargin,i.image=document.getElementById("walking_zombie"),i.maxFrame=7,i.score=2,i}return B(e,t),e}(L);const K=function(){function t(t){this.game=t,this.fonstSize=30,this.fontFamily="Creepster",this.image=document.getElementById("live")}return t.prototype.draw=function(t){if(t){t.save(),t.shadowOffsetX=2,t.shadowOffsetY=2,t.shadowColor="white",t.shadowBlur=0,t.font="".concat(this.fonstSize,"px ").concat(this.fontFamily),t.textAlign="left",t.fillStyle=this.game.fontColor,t.fillText("Score: ".concat(this.game.score),20,50),t.font="".concat(.8*this.fonstSize,"px ").concat(this.fontFamily),t.fillText("Game time: ".concat((.001*this.game.time).toFixed(1)," seconds"),20,80),t.save(),t.font="".concat(.8*this.fonstSize,"px ").concat(this.fontFamily),t.fillStyle=this.game.player.energy<=20?"red":"black",t.fillText("Energy: ".concat(this.game.player.energy),20,110),t.restore();for(var e=0;e<this.game.lives;e++)t.drawImage(this.image,35*e+20,125,25,25);t.textAlign="center",t.font="".concat(.5*this.fonstSize,"px Heavitas"),t.fillText("(W,A,S,D = Move, Space = Roll)",.5*this.game.width,20),this.game.gameOver&&(t.textAlign="center",t.font="".concat(2*this.fonstSize,"px ").concat(this.fontFamily),t.fillText("Well done",.5*this.game.width,.5*this.game.height-20),t.font="".concat(1*this.fonstSize,"px ").concat(this.fontFamily),t.fillText("Survival time: ".concat((.001*this.game.time).toFixed(1)," seconds"),.5*this.game.width,.5*this.game.height+20),t.fillText("Score: ".concat(this.game.score),.5*this.game.width,.5*this.game.height+50),t.fillText('Press "Enter" to restart',.5*this.game.width,.5*this.game.height+80)),t.restore()}},t}();var Q=function(){var t=function(e,i){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])},t(e,i)};return function(e,i){if("function"!=typeof i&&null!==i)throw new TypeError("Class extends value "+String(i)+" is not a constructor or null");function r(){this.constructor=e}t(e,i),e.prototype=null===i?Object.create(i):(r.prototype=i.prototype,new r)}}(),Z=function(){function t(t){this.game=t}return t.prototype.addEnemy=function(){},t}(),$=function(t){function e(e){var i=t.call(this,e)||this;return i.background=[document.getElementById("layer1"),document.getElementById("layer2"),document.getElementById("layer3"),document.getElementById("layer4"),document.getElementById("layer5")],i}return Q(e,t),e}(Z),tt=function(t){function e(e){var i=t.call(this,e)||this;return i.background=[document.getElementById("layer1-city"),document.getElementById("layer2-city"),document.getElementById("layer3-city"),document.getElementById("layer4-city"),document.getElementById("layer5-city")],i}return Q(e,t),e}(Z),et=function(t,e,i){if(i||2===arguments.length)for(var r,n=0,a=e.length;n<a;n++)!r&&n in e||(r||(r=Array.prototype.slice.call(e,0,n)),r[n]=e[n]);return t.concat(r||Array.prototype.slice.call(e))};const it=function(){function t(t,e,i){this.width=t,this.height=e,this.groundMargin=50,this.speed=0,this.maxSpeed=3,this.levels=[new $(this),new tt(this)],this.currentLevel=0,this.animate=i,this.background=new(X.bind.apply(X,et([void 0,this],this.levels[1].background,!1))),this.player=new T(this),this.input=new F(this),this.UI=new K(this),this.enemyTimer=0,this.enemyInterval=1e3,this.enemies=[],this.particles=[],this.collisions=[],this.floatingMessages=[],this.maxParticles=50,this.debug=!1,this.score=0,this.winningScore=40,this.fontColor="black",this.time=0,this.maxTime=3e4,this.gameOver=!1,this.lives=5,this.player.currentState=this.player.states[0],this.player.currentState.enter(),this.nextLevel=!1}return t.prototype.update=function(t){var e=this;this.time+=t,this.background.update(),this.player.update(this.input.keys,t),this.enemyTimer>this.enemyInterval?(this.addEnemy(),this.enemyTimer=0):this.enemyTimer+=t,this.time>3e4?this.enemyInterval=800:this.time>3e4&&this.time<6e4?this.enemyInterval=600:this.time>6e4&&this.time<9e4?this.enemyInterval=400:this.time>9e4&&this.time<12e4&&(this.enemyInterval=100),this.enemies.forEach((function(i){i.update(t),i.markedForDeletion&&e.enemies.splice(e.enemies.indexOf(i),1)})),this.floatingMessages.forEach((function(t,e){t.update()})),this.particles.forEach((function(t,e){t.update()})),this.particles.length>this.maxParticles&&(this.particles.length=this.maxParticles),this.collisions.forEach((function(e,i){e.update(t)})),this.floatingMessages=this.floatingMessages.filter((function(t){return!t.markedForDeletion})),this.enemies=this.enemies.filter((function(t){return!t.markedForDeletion})),this.particles=this.particles.filter((function(t){return!t.markedForDeletion})),this.collisions=this.collisions.filter((function(t){return!t.markedForDeletion}))},t.prototype.draw=function(t){t&&(this.background.draw(t),this.player.draw(t),this.enemies.forEach((function(e){e.draw(t)})),this.floatingMessages.forEach((function(e,i){e.draw(t)})),this.particles.forEach((function(e){e.draw(t)})),this.collisions.forEach((function(e){e.draw(t)})),this.UI.draw(t))},t.prototype.moveTonextLevel=function(){1===this.currentLevel?this.currentLevel=1:this.currentLevel++,this.background=new(X.bind.apply(X,et([void 0,this],this.levels[this.currentLevel].background,!1)))},t.prototype.addEnemy=function(){this.speed>0&&Math.random()<.3?this.addFirstGroup():this.speed>0&&Math.random()>=.3&&Math.random()<.6?this.addSecondGroup():this.speed>0&&Math.random()>=.6&&this.addThirdGroup(),this.addFlyingEnemy(),Math.random()<.2&&this.enemies.push(new V(this))},t.prototype.addFirstGroup=function(){this.enemies.push(new V(this)),this.time>9e4&&this.enemies.push(new W(this))},t.prototype.addSecondGroup=function(){this.enemies.push(new H(this)),this.time>6e4&&this.enemies.push(new J(this)),this.time>9e4&&this.enemies.push(new U(this))},t.prototype.addThirdGroup=function(){this.enemies.push(new q(this)),this.time>6e4&&this.enemies.push(new R(this)),this.time>9e4&&this.enemies.push(new N(this))},t.prototype.addFlyingEnemy=function(){this.enemies.push(new A(this)),this.time>6e4&&this.enemies.push(new C(this))},t.prototype.gameRestart=function(){this.gameOver=!1,this.enemies=[],this.player.currentState=this.player.states[0],this.player.currentState.enter(),this.score=0,this.time=0,this.lives=5,this.player.x=0,this.player.y=this.height-this.player.height-this.groundMargin,this.speed=0,this.animate(0),this.player.energy=50},t}();window.addEventListener("load",(function(){var t=document.getElementById("canvas1"),e=t.getContext("2d");t.width=900,t.height=500;var i=new it(t.width,t.height,n),r=0;function n(a){var s=a-r;r=a,e.clearRect(0,0,t.width,t.height),i.update(s),i.draw(e),i.gameOver||i.nextLevel||requestAnimationFrame(n)}n(0)}))})();