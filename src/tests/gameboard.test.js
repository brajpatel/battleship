import { Gameboard } from "../components/gameboard";

describe("gameboard", () => {
    test("gameboard is an array of length 10", () => {
        const gameboard = new Gameboard();

        expect(gameboard.board.length).toBe(10);
    });

    test("elements in the gameboard array are objects", () => {
        const gameboard = new Gameboard();

        expect(gameboard.board[0][3] instanceof Object).toBe(true);
    })

    test("objects in the gameboard array contain ship name property", () => {
        const gameboard = new Gameboard();

        expect(gameboard.board[6][1].hasOwnProperty('shipName')).toBe(true);
    })
})