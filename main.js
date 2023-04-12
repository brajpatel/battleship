(()=>{"use strict";class t{constructor(t){this.length=t,this.ship=this.createShip()}getShipLength(){return this.ship.length}createShip(){let t=[];for(let e=0;e<this.length;e++)t.push({hit:!1});return t}hit(t){this.ship[t].hit=!0}checkHit(t){return!!t.hit}isSunk(){return this.ship.every(this.checkHit)}}const e=document.getElementById("player-ships"),r=document.getElementById("carrier"),i=document.getElementById("battleship"),a=document.getElementById("cruiser"),s=document.getElementById("submarine"),n=document.getElementById("destroyer");function h(t){t.addEventListener("dragstart",(t=>{t.dataTransfer.setDate("text/plain",t.target.id)}))}h(r),h(i),h(a),h(s),h(n);const d=new class{constructor(){this.board=this.createBoard(),this.missedAttacks=[]}getGameBoard(){return this.board}getMissedAttacks(){return this.missedAttacks}createBoard(){let t=[],e=[];for(let r=0;r<10;r++){for(let t=0;t<10;t++)e.push({shipName:void 0,shipIndex:void 0});t.push(e),e=[]}return t}checkValidShipPlacement(t,e,r){if(e>10||e<0||r>10||r<0||r+t>10)return!1;for(let i=r;i<r+t;i++)if(void 0!==this.board[i][e].shipName)return!1;return!0}placeShip(t,e,r){if(this.checkValidShipPlacement(t.getShipLength(),e,r)){for(let i=0;i<t.getShipLength();i++)this.board[r+i][e].shipName=t,this.board[r+i][e].shipIndex=i;return!0}return!1}receiveAttack(t,e){this.board[e][t].shipName?this.board[e][t].shipName.hit(this.board[e][t].shipIndex):this.missedAttacks.push({x:t,y:e})}checkAllShipSunk(){let t=!0;return this.board.forEach((e=>{e.forEach((e=>{e.shipName&&(e.shipName.isSunk()||(t=!1))}))})),t}},c=(new class{constructor(){this.name="",this.turn=!0}setName(t){this.name=t}startTurn(){!1===this.turn&&(this.turn=!0)}endTurn(t){!0===this.turn&&(this.turn=!1,t.startTurn())}attack(t,e,r,i){this.turn&&(e.receiveAttack(r,i),this.endTurn(t))}}(""),new t(5));function o(t){let r=t.dataTransfer.getData("text"),i=parseInt(t.target.getAttribute("data-x")),a=parseInt(t.target.getAttribute("data-y"));if("Carrier"===r&&d.checkValidShipPlacement(c.getShipLength(),i,a)){d.placeShip(c,i,a);let t=document.querySelector(`#${r}`);e.removeChild(t),u("player-board",d)}}function u(t,e){let r=t.getGameboard();t.getMissedAttacks(),r.forEach(((t,r)=>{t.forEach(((t,i)=>{if(t.shipName)if(t.shipName.checkHit(t.shipName.getShip()[t.shipIndex])){let t=document.querySelector(`.${e} [data-x="${i}"][data-y="${r}"]`);t.classList.add("hit"),t.classList.remove("occupied"),t.textContent="X"}else"player-board"===e&&document.querySelector(`.${e} [data-x="${i}"][data-y="${r}"]`).classList.add("occupied")}))}))}new t(4),new t(3),new t(3),new t(2),new t(5),new t(4),new t(3),new t(3),new t(2),function(t){const e=document.getElementById(`${t}`);for(let t=0;t<10;t++)for(let r=0;r<10;r++){let i=document.createElement("div");i.classList.add("cell"),i.setAttribute("data-x",r),i.setAttribute("data-y",t),i.addEventListener("dragover",(t=>t.preventDefault())),i.addEventListener("drop",(t=>{t.preventDefault(),o(t)})),e.appendChild(i)}}("player-board"),u(d,"player-board")})();