import { Player } from "./player";

export class Ai extends Player {
    constructor(name, enemyPlayer, enemyBoard) {
        super(name);
        this.turn = false;
        this.enemyPlayer = enemyPlayer;
        this.enemyBoard = enemyBoard;
        this.attacks = [];
    }

    getAttacks() {
        return this.attacks;
    }

    generateAttack() {
        if(this.checkTurn()) {
            let indicator = true;

            while(indicator) {
                let x = Math.floor(Math.random() * 10);
                let y = Math.floor(Math.random() * 10);

                if(!(this.attacks.some((attack) => attack.x === x && attack.y  === y))) {
                    this.attacks.push({ x: x, y: y });
                    this.attack(this.enemyPlayer, this.enemyBoard, x, y);
                    indicator = false;
                }
            }
        }
    }
}