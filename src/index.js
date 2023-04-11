import { Player } from "./components/player";
import { Ship } from "./components/ship";
import { Gameboard } from "./components/gameboard";

const playerShips = document.getElementById('player-ships');
const htmlCarrier = document.getElementById('carrier');
const htmlBattleship = document.getElementById('battleship');
const htmlCruiser = document.getElementById('cruiser');
const htmlSubmarine = document.getElementById('submarine');
const htmlDestroyer = document.getElementById('destroyer');

// player ships
const carrier = new Ship(5);
const battleship = new Ship(4);
const cruiser = new Ship(3);
const submarine = new Ship(3);
const destroyer = new Ship(2);

// AI ships
const aiCarrier = new Ship(5);
const aiBattleship = new Ship(4);
const aiCruiser = new Ship(3);
const aiSubmarine = new Ship(3);
const aiDestroyer = new Ship(2);

