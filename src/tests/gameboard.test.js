import { Gameboard } from "../components/gameboard";

describe("gameboard", () => {
    test("gameboard is an array of length 100", () => {
        const gameboard = new Gameboard();

        expect(gameboard.board.length).toBe(10);
    });
})