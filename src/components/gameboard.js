export class Gameboard {
    constructor() {
        this.board = this.createBoard();
        this.missedAttacks = [];
    }

    getGameBoard() {
        return this.board;
    }

    getMissedAttacks() {
        return this.missedAttacks;
    }

    createBoard() {
        let arr = [];
        let arrItem = [];

        for(let i = 0; i < 10; i++) {
            for(let j = 0; j < 10; j++) {
                arrItem.push({ shipName: undefined, shipIndex: undefined });
            }
            arr.push(arrItem);
            arrItem = [];
        }

        return arr;
    }

    checkValidShipPlacement(length, x, y) {
        if(x > 10 || x < 0 || y > 10 || y < 0 || y + length > 10) {
            return false;
        }
        else {
            for(let i = y; i < y + length; i++) {
                if(this.board[i][x].shipName !== undefined) {
                    return false;
                }
            }
            return true;
        }
    }

    placeShip(ship, x, y) {
        if(this.checkValidShipPlacement(ship.getShipLength(), x, y)) {
            for(let i = 0; i < ship.getShipLength(); i++) {
                this.board[y + i][x].shipName = ship;
                this.board[y + i][x].shipIndex = i;
            }
        }
    }
}