export class Player {
    constructor() {
        this.name = '';
        this.turn = true;
    }

    setName(name) {
        this.name = name;
    }

    checkTurn() {
        return this.turn;
    }

    startTurn() {
        if(this.turn === false) this.turn = true;
    }

    endTurn(enemyPlayer) {
        if(this.turn === true) {
            this.turn = false;
            enemyPlayer.startTurn();
        }
    }

    attack(enemyPlayer, enemyBoard, x, y) {
        if(this.turn) {
            enemyBoard.receiveAttack(x, y);
            this.endTurn(enemyPlayer);
        }
    }
}