export class Gameboard {
    constructor() {
        this.board = this.createBoard();
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
}