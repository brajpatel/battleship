(()=>{"use strict";class e{constructor(e){this.name=e,this.turn=!0}setName(e){this.name=e}checkTurn(){return this.turn}startTurn(){!1===this.turn&&(this.turn=!0)}endTurn(e){!0===this.turn&&(this.turn=!1,e.startTurn())}attack(e,t,a,n){this.turn&&(t.receiveAttack(a,n),this.endTurn(e))}}class t{constructor(e){this.length=e,this.ship=this.createShip()}getShip(){return this.ship}getShipLength(){return this.ship.length}createShip(){let e=[];for(let t=0;t<this.length;t++)e.push({hit:!1});return e}hit(e){this.ship[e].hit=!0}checkHit(e){return!!e.hit}isSunk(){return this.ship.every(this.checkHit)}}class a{constructor(){this.board=this.createBoard(),this.missedAttacks=[]}getGameboard(){return this.board}getMissedAttacks(){return this.missedAttacks}createBoard(){let e=[],t=[];for(let a=0;a<10;a++){for(let e=0;e<10;e++)t.push({shipName:void 0,shipIndex:void 0});e.push(t),t=[]}return e}checkValidShipPlacement(e,t,a){if(t>10||t<0||a>10||a<0||a+e>10)return!1;for(let n=a;n<a+e;n++)if(void 0!==this.board[n][t].shipName)return!1;return!0}placeShip(e,t,a){if(this.checkValidShipPlacement(e.getShipLength(),t,a)){for(let n=0;n<e.getShipLength();n++)this.board[a+n][t].shipName=e,this.board[a+n][t].shipIndex=n;return!0}return!1}receiveAttack(e,t){this.board[t][e].shipName?this.board[t][e].shipName.hit(this.board[t][e].shipIndex):this.missedAttacks.push({x:e,y:t})}checkAllShipSunk(){let e=!0;return this.board.forEach((t=>{t.forEach((t=>{t.shipName&&(t.shipName.isSunk()||(e=!1))}))})),e}}const n=document.getElementById("player-name-input"),r=document.getElementById("player-ready-btn");n.addEventListener("keyup",(()=>{""===n.value?r.disabled=!0:r.disabled=!1})),r.addEventListener("click",(function(){const e=document.getElementById("player-board-name"),t=n.value.slice(0,1).toUpperCase()+n.value.slice(1);e.textContent=`${t}'s Board`,document.getElementById("modal-container").style.display="none"}));const i=document.getElementById("play-again-btn");i.addEventListener("click",(()=>window.location.reload()));const s=document.getElementById("player-ships"),c=document.getElementById("carrier"),d=document.getElementById("battleship"),h=document.getElementById("cruiser"),o=document.getElementById("submarine"),l=document.getElementById("destroyer"),u=document.getElementById("ai-side");function m(e){e.addEventListener("dragstart",(e=>{e.dataTransfer.setData("text/plain",e.target.id)}))}m(c),m(d),m(h),m(o),m(l);const p=new a,y=new a,g=new e("Player"),f=new class extends e{constructor(e,t,a){super(e),this.turn=!1,this.enemyPlayer=t,this.enemyBoard=a,this.attacks=[]}getAttacks(){return this.attacks}generateAttack(){if(this.checkTurn()){let e=!0;for(;e;){let t=Math.floor(10*Math.random()),a=Math.floor(10*Math.random());this.attacks.some((e=>e.x===t&&e.y===a))||(this.attacks.push({x:t,y:a}),this.attack(this.enemyPlayer,this.enemyBoard,t,a),e=!1)}}}}("AI-Chan",g,p),k=new t(5),b=new t(4),S=new t(3),v=new t(3),E=new t(2),L=new t(5),w=new t(4),B=new t(3),I=new t(3),x=new t(2);function A(e){const t=document.getElementById(`${e}`);for(let a=0;a<10;a++)for(let n=0;n<10;n++){let r=document.createElement("div");r.classList.add("cell"),r.setAttribute("data-x",n),r.setAttribute("data-y",a),"ai-board"===e?r.addEventListener("click",(e=>{P(e.target)})):"player-board"===e&&(r.addEventListener("dragover",(e=>e.preventDefault())),r.addEventListener("drop",(e=>{e.preventDefault(),$(e)}))),t.appendChild(r)}}function N(e){let t=!0;for(;t;){let a=Math.floor(10*Math.random()),n=Math.floor(10*Math.random());y.checkValidShipPlacement(e.getShipLength(),a,n)&&(y.placeShip(e,a,n),t=!1)}}function $(e){let t=e.dataTransfer.getData("text"),a=parseInt(e.target.getAttribute("data-x")),n=parseInt(e.target.getAttribute("data-y"));switch(t){case"carrier":if(p.checkValidShipPlacement(k.getShipLength(),a,n)){p.placeShip(k,a,n);let e=document.querySelector(`#${t}`);s.removeChild(e),M(p,"player-board"),s.childNodes.length<=9&&C()}break;case"battleship":if(p.checkValidShipPlacement(b.getShipLength(),a,n)){p.placeShip(b,a,n);let e=document.querySelector(`#${t}`);s.removeChild(e),M(p,"player-board"),s.childNodes.length<=9&&C()}break;case"cruiser":if(p.checkValidShipPlacement(S.getShipLength(),a,n)){p.placeShip(S,a,n);let e=document.querySelector(`#${t}`);s.removeChild(e),M(p,"player-board"),s.childNodes.length<=9&&C()}break;case"submarine":if(p.checkValidShipPlacement(v.getShipLength(),a,n)){p.placeShip(v,a,n);let e=document.querySelector(`#${t}`);s.removeChild(e),M(p,"player-board"),s.childNodes.length<=9&&C()}break;case"destroyer":if(p.checkValidShipPlacement(E.getShipLength(),a,n)){p.placeShip(E,a,n);let e=document.querySelector(`#${t}`);s.removeChild(e),M(p,"player-board"),s.childNodes.length<=9&&C()}break;default:return}}function C(){const e=document.getElementById("game-container");s.style.display="none",u.classList.remove("hide-ai-side"),e.classList.remove("intial-layout"),e.classList.add("game-layout")}function P(e){let t=e.getAttribute("data-x"),a=e.getAttribute("data-y");g.attack(f,y,t,a),M(y,"ai-board"),y.checkAllShipSunk()&&T(g),f.generateAttack(),M(p,"player-board"),p.checkAllShipSunk()&&T(f)}function M(e,t){let a=e.getGameboard(),n=e.getMissedAttacks();a.forEach(((e,a)=>{e.forEach(((e,n)=>{if(e.shipName)if(e.shipName.checkHit(e.shipName.getShip()[e.shipIndex])){let e=document.querySelector(`.${t} [data-x="${n}"][data-y="${a}"]`);e.classList.add("hit"),e.classList.remove("occupied"),e.textContent="X"}else"player-board"===t&&document.querySelector(`.${t} [data-x="${n}"][data-y="${a}"]`).classList.add("occupied")}))})),n.forEach((e=>{let a=document.querySelector(`.${t} [data-x="${e.x}"][data-y="${e.y}"]`);a.classList.add("missed"),a.textContent="-"}))}function T(e){document.getElementById("game-end-container").classList.remove("hide-winner"),document.getElementById("winner-message").textContent=`${e.name} Wins!`,e.name===g.name?async function(){const e=await fetch("https://nekos.best/api/v2/thumbsup",{mode:"cors"}),t=await e.json(),a=document.createElement("img");a.src=t.results[0].url,i.parentNode.insertBefore(a,i)}():async function(){const e=await fetch("https://nekos.best/api/v2/cry",{mode:"cors"}),t=await e.json(),a=document.createElement("img");a.src=t.results[0].url,i.textContent="Try Again?",i.parentNode.insertBefore(a,i)}()}N(L),N(w),N(B),N(I),N(x),A("player-board"),A("ai-board"),M(p,"player-board"),M(y,"ai-board"),T(g)})();