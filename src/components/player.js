export class Player {
    constructor() {
        this.name = '';
        this.turn = true;
    }

    setName(name) {
        this.name = name;
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

    checkTurn() {
        return this.turn;
    }
}