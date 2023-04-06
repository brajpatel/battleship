import { Ship } from './ship';

// carrier(5)
// battleship(4)
// cruiser(3)
// submarine(3)
// destroyer(2)

describe("ships", () => {
    test("return ship length", () => {
        const cruiser = new Ship(3);

        expect(cruiser.getShipLength()).toBe(3);
    })
})