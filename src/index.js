import { Player } from "./components/player";
import { Ship } from "./components/ship";
import { Gameboard } from "./components/gameboard";

const playerShips = document.getElementById('player-ships');
const htmlCarrier = document.getElementById('carrier');
const htmlBattleship = document.getElementById('battleship');
const htmlCruiser = document.getElementById('cruiser');
const htmlSubmarine = document.getElementById('submarine');
const htmlDestroyer = document.getElementById('destroyer');

// create player boards
const playerBoard = new Gameboard();

// create players
const player = new Player('');

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

// create boards
createBoard('player-board');

function createBoard(boardName) {
    const board = document.getElementById(`${boardName}`);

    for(let i = 0; i < 10; i++) {
        for(let j = 0; j < 10; j++) {
            let cell = document.createElement('div');
            cell.classList.add('cell');
            cell.setAttribute('data-x', j);
            cell.setAttribute('data-y', i);

            if(boardName === 'ai-board') {
                cell.addEventListener('click', (e) => {
                    attackEnemy(e.target);
                });
            }
            else if(boardName === 'player-board') {
                cell.addEventListener('dragover', (e) => e.preventDefault());
                cell.addEventListener('drop', (e) => {
                    e.preventDefault();
                    dropShip(e);
                });
            }

            board.appendChild(cell);
        }
    }
}

function dropShip(e) {

}

function attackEnemy(target) {

}