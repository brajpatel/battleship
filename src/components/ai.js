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
}