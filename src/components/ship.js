export class Ship {
    constructor(length) {
        this.length = length;
        this.ship = this.createShip();
    }

    getShip() {
        return this.ship;
    }

    getShipLength() {
        return this.ship.length;
    }

    createShip() {
        let shipArr = [];

        for(let i = 0; i < this.length; i++) {
            shipArr.push({ hit: false });
        }

        return shipArr;
    }

    hit(index) {
        this.ship[index].hit = true;
    }

    checkHit(item) {
        return item.hit ? true : false;
    }

    isSunk() {
        return this.ship.every(this.checkHit);
    }
}

