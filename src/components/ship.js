export class Ship {
    constructor(length) {
        this.length = length;
        this.ship = this.createShip();
    }

    createShip() {
        let shipArr = [];

        for(let i = 0; i < this.length; i++) {
            ship.push({ hit: false });
        }

        return shipArr;
    }

    getShipLength() {
        return this.ship.length;
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