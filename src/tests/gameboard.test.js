import { Gameboard } from "../components/gameboard";

describe("gameboard", () => {
    test("gameboard is an array", () => {
        const gameboard = new Gameboard();

        expect(gameboard.board).toEqual([])
    })
})