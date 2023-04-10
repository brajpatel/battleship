import { Gameboard } from "../components/gameboard";

describe("gameboard", () => {
    const gameboard = new Gameboard();

    test("gameboard is an array of length 10", () => {
        expect(gameboard.board.length).toBe(10);
    });

    test("elements in the gameboard array are objects", () => {
        expect(gameboard.board[0][3] instanceof Object).toBe(true);
    })

    test("objects in the gameboard array contain ship name property", () => {
        expect(gameboard.board[6][1].hasOwnProperty('shipName')).toBe(true);
    })

    test("objects in the gameboard array contain a ship index property", () => {
        expect(gameboard.board[7][7].hasOwnProperty('shipIndex')).toBe(true);
    })
})