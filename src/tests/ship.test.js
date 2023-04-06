import { Ship } from '../components/ship';

// carrier(5)
// battleship(4)
// cruiser(3)
// submarine(3)
// destroyer(2)

describe("ships", () => {
    test("return ship array as long as length", () => {
        const cruiser = new Ship(3);

        expect(cruiser.getShipLength()).toBe(3);
    })

    test("ship is hittable", () => {
        const battleship = new Ship(4);
        battleship.hit(2);

        expect(battleship[2]).toEqual({ hit: true} );
    })

    test("created ship should not be sunk", () => {
        const submarine = new Ship(3);

        expect(submarine.isSunk()).toBe(false);
    })

    test("a ship hit in all places is sunk", () => {
        const carrier = new Ship(5);
        carrier.hit(0)
        carrier.hit(1)
        carrier.hit(2)
        carrier.hit(3)
        carrier.hit(4)

        expect(carrier.isSunk()).toBe(true);
    })
})