export class Ship {
    constructor(length) {
        this.length = length;
        this.ship = this.createShip();
    }

    createShip() {
        let shipArr = [];

        for(let i = 0; i < this.length; i++) {
            shipArr.push({ hit: false });
        }

        return shipArr;
    }

    getShipLength() {
        return this.ship.length;
    }

    hit(index) {
        this.ship[index].hit = true;
    }

    checkHit(item) {
        return item.hit ? true : false;
    }

    isSunk() {
        if(this.ship.every(this.checkHit)) {
            return true;
        }
        else {
            return false;
        }
    }
}