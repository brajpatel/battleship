import { Player } from "../components/player";

describe("player", () => {
    const player = new Player();

    test("created players have a name property", () => {
        expect(player.hasOwnProperty('name')).toBe(true);
    });

    test("created players have a turn property", () => {
        expect(player.hasOwnProperty('turn')).toBe(true);
    });

    test("player names are initially set to an empty string", () => {
        expect(player.name).toBe('');
    });

    test("calling the setName method sets the player's name", () => {
        const player = new Player();
        player.setName('Sakura');

        expect(player.name).toMatch(/sakura/i);
    });

    test("the created player takes the first turn in the game", () => {
        const newPlayer = new Player();

        expect(newPlayer.turn).toBe(true);
    });

    test("the player's turn ends after calling the endTurn method", () => {
        const player = new Player();
        const enemyPlayer = new Player();

        player.endTurn(enemyPlayer);

        expect(player.turn).toBe(false);
    });

    test("ending the player's turn starts the enemy player's turn", () => {
        const player = new Player();
        const enemyPlayer = new Player();

        player.endTurn(enemyPlayer);

        expect(enemyPlayer.turn).toBe(true);
    });
});