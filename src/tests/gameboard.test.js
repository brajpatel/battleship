import { Ship } from "../components/ship";
import { Gameboard } from "../components/gameboard";

describe("gameboard", () => {
    const gameboard = new Gameboard();

    test("gameboard is an array of length 10", () => {
        expect(gameboard.board.length).toBe(10);
    });

    test("the board array contains subarrays of length 10", () => {
        expect(gameboard.board[8].length).toBe(10);
    });

    test("elements in the gameboard subarrays are objects", () => {
        expect(gameboard.board[0][3] instanceof Object).toBe(true);
    });

    test("objects in the gameboard array contain ship name property", () => {
        expect(gameboard.board[6][1].hasOwnProperty('shipName')).toBe(true);
    });

    test("objects in the gameboard array contain a ship index property", () => {
        expect(gameboard.board[7][7].hasOwnProperty('shipIndex')).toBe(true);
    });

    test("a ship placed within the board's parameters returns true 1", () => {
        const submarine = new Ship(3);

        expect(gameboard.checkValidShipPlacement(submarine.getShipLength(), 4, 6)).toBe(true);
    });

    test("a ship placed within the board's parameters returns true 2", () => {
        const carrier = new Ship(5);

        expect(gameboard.checkValidShipPlacement(carrier.getShipLength(), 9, 0)).toBe(true);
    });

    test("a ship cannot be placed outside the board's parameters and returns false 1", () => {
        const battleship = new Ship(4);

        expect(gameboard.checkValidShipPlacement(battleship.getShipLength(), 1, 8)).toBe(false);
    });

    test("a ship cannot be placed outside the board's parameters and returns false 2", () => {
        const destroyer = new Ship(2);

        expect(gameboard.checkValidShipPlacement(destroyer.getShipLength(), 7, 9)).toBe(false);
    });

    test("a ship with valid placement will be placed on to the board", () => {
        const submarine = new Ship(3);
        const gameboard = new Gameboard();
        gameboard.placeShip(submarine, 5, 5);

        expect(gameboard.board[5][5].shipName).toBe(submarine);
    })

    test("a ship with invalid placement will leave those squares unoccupied", () => {
        const cruiser = new Ship(3);
        const gameboard = new Gameboard();
        gameboard.placeShip(cruiser, 1, 8);

        expect(gameboard.board[1][8]).toEqual({ shipName: undefined, shipIndex: undefined });
    })

    test("a ship cannot be placed on board squares occupied by other ships", () => {
        const carrier = new Ship(5);
        const battleship = new Ship(4);
        const gameboard = new Gameboard();
        gameboard.placeShip(carrier, 7, 4);

        expect(gameboard.placeShip(battleship, 7, 1)).toBe(false);
    })
});