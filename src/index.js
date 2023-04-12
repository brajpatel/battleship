import { Player } from "./components/player";
import { Ship } from "./components/ship";
import { Gameboard } from "./components/gameboard";

const playerShips = document.getElementById('player-ships');
const htmlCarrier = document.getElementById('carrier');
const htmlBattleship = document.getElementById('battleship');
const htmlCruiser = document.getElementById('cruiser');
const htmlSubmarine = document.getElementById('submarine');
const htmlDestroyer = document.getElementById('destroyer');

dragStarter(htmlCarrier);
dragStarter(htmlBattleship);
dragStarter(htmlCruiser);
dragStarter(htmlSubmarine);
dragStarter(htmlDestroyer);

// add drag and drop functionality to the player's ships
function dragStarter(ship) {
    ship.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', e.target.id);
    });
}

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

updateBoard(playerBoard, 'player-board');

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
    let shipData = e.dataTransfer.getData('text');
    let x = parseInt(e.target.getAttribute('data-x'));
    let y = parseInt(e.target.getAttribute('data-y'));

    switch(shipData) {
        case 'carrier':
            if(playerBoard.checkValidShipPlacement(carrier.getShipLength(), x, y)) {
                playerBoard.placeShip(carrier, x, y);
                let ship = document.querySelector(`#${shipData}`);
                playerShips.removeChild(ship);
                updateBoard(playerBoard, 'player-board');

                if(playerShips.childNodes.length <= 6) {
                    playerShips.style.display = 'none';
                }
            }
    }
}

function attackEnemy(target) {

}

function updateBoard(board, boardName) {
    let boardArr = board.getGameboard();
    let missedAttacksArr = board.getMissedAttacks();

    boardArr.forEach((row, y) => {
        row.forEach((cell, x) => {
            if(cell.shipName) {
                if(cell.shipName.checkHit(cell.shipName.getShip()[cell.shipIndex])) {
                    let selectedCell = document.querySelector(`.${boardName} [data-x="${x}"][data-y="${y}"]`);
                    selectedCell.classList.add('hit');
                    selectedCell.classList.remove('occupied');
                    selectedCell.textContent = 'X';
                }
                else if(boardName === 'player-board') {
                    let selectedCell = document.querySelector(`.${boardName} [data-x="${x}"][data-y="${y}"]`);
                    selectedCell.classList.add('occupied');
                }
            }
        });
    });

    missedAttacksArr.forEach((attack) => {
        let selectedCell = document.querySelector(`.${boardName} [data-x="${attack.x}"][data-y="${attack.y}"]`);
        selectedCell.classList.add('missed');
        selectedCell.textContent = '-';
    });
}