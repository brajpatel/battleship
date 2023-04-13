import { Player } from "./components/player";
import { Ai } from "./components/ai";
import { Ship } from "./components/ship";
import { Gameboard } from "./components/gameboard";

const playerNameInput = document.getElementById('player-name-input');
const playerReadyBtn = document.getElementById('player-ready-btn');

// disable the game start button if the name input is false
playerNameInput.addEventListener('keyup', () => {
    playerNameInput.value === '' ? playerReadyBtn.disabled = true : playerReadyBtn.disabled = false;
})

// set the player's name
playerReadyBtn.addEventListener('click', setPlayerName);

// restart the game
const playAgainBtn = document.getElementById('play-again-btn');
playAgainBtn.addEventListener('click', () => window.location.reload());

const playerShips = document.getElementById('player-ships');
const htmlCarrier = document.getElementById('carrier');
const htmlBattleship = document.getElementById('battleship');
const htmlCruiser = document.getElementById('cruiser');
const htmlSubmarine = document.getElementById('submarine');
const htmlDestroyer = document.getElementById('destroyer');
const aiSide = document.getElementById('ai-side');

// add drag functionality to player ships
dragStarter(htmlCarrier);
dragStarter(htmlBattleship);
dragStarter(htmlCruiser);
dragStarter(htmlSubmarine);
dragStarter(htmlDestroyer);

function dragStarter(ship) {
    ship.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', e.target.id);
    });
}

// create player boards
const playerBoard = new Gameboard();
const aiBoard = new Gameboard();

// create players
const player = new Player('Player');
const aiPlayer = new Ai('AI-Chan', player, playerBoard);

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

placeAiShip(aiCarrier);
placeAiShip(aiBattleship);
placeAiShip(aiCruiser);
placeAiShip(aiSubmarine);
placeAiShip(aiDestroyer);

// create boards
createBoard('player-board');
createBoard('ai-board');
updateBoard(playerBoard, 'player-board');
updateBoard(aiBoard, 'ai-board');

// set the player's name and display in the game
function setPlayerName() {
    const name = playerNameInput.value.slice(0, 1).toUpperCase() + playerNameInput.value.slice(1);
    player.setName(name);

    const playerBoardName = document.getElementById('player-board-name');
    playerBoardName.textContent = `${name}'s Board`;

    const modalContainer = document.getElementById('modal-container');
    modalContainer.style.display = 'none';
}

// add squares to the board to create a grid
function createBoard(boardName) {
    const board = document.getElementById(`${boardName}`);

    for(let i = 0; i < 10; i++) {
        for(let j = 0; j < 10; j++) {
            let cell = document.createElement('div');
            cell.classList.add('cell');
            cell.setAttribute('data-x', j);
            cell.setAttribute('data-y', i);

            // make the ai's board squares attackable
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

// randomly place the ai's ships
function placeAiShip(ship) {
    let indicator = true;

    while(indicator) {
        let x = Math.floor(Math.random() * 10);
        let y = Math.floor(Math.random() * 10);

        if(aiBoard.checkValidShipPlacement(ship.getShipLength(), x, y)) {
            aiBoard.placeShip(ship, x, y);
            indicator = false;
        }
    }
}

// drop the player's ship on to the grid at the desired coordinates
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
                    updateGameLayout();
                }
            }
            break;

        case 'battleship':
            if(playerBoard.checkValidShipPlacement(battleship.getShipLength(), x, y)) {
                playerBoard.placeShip(battleship, x, y);
                let ship = document.querySelector(`#${shipData}`);
                playerShips.removeChild(ship);
                updateBoard(playerBoard, 'player-board');

                if(playerShips.childNodes.length <= 6) {
                    updateGameLayout();
                }
            }
            break;

        case 'cruiser':
            if(playerBoard.checkValidShipPlacement(cruiser.getShipLength(), x, y)) {
                playerBoard.placeShip(cruiser, x, y);
                let ship = document.querySelector(`#${shipData}`);
                playerShips.removeChild(ship);
                updateBoard(playerBoard, 'player-board');

                if(playerShips.childNodes.length <= 6) {
                    updateGameLayout();
                }
            }
            break;

        case 'submarine':
            if(playerBoard.checkValidShipPlacement(submarine.getShipLength(), x, y)) {
                playerBoard.placeShip(submarine, x, y);
                let ship = document.querySelector(`#${shipData}`);
                playerShips.removeChild(ship);
                updateBoard(playerBoard, 'player-board');

                if(playerShips.childNodes.length <= 6) {
                    updateGameLayout();
                }
            }
            break;

        case 'destroyer':
            if(playerBoard.checkValidShipPlacement(destroyer.getShipLength(), x, y)) {
                playerBoard.placeShip(destroyer, x, y);
                let ship = document.querySelector(`#${shipData}`);
                playerShips.removeChild(ship);
                updateBoard(playerBoard, 'player-board');

                if(playerShips.childNodes.length <= 6) {
                    updateGameLayout();
                }
            }
            break;
        
        default:
            return;
    }
}

// adjust the layout of the game once all the player's ships are on their board
function updateGameLayout() {
    const gameContainer = document.getElementById('game-container');

    playerShips.style.display = 'none';
    aiSide.classList.remove('hide-ai-side');
    gameContainer.classList.remove('intial-layout');
    gameContainer.classList.add('game-layout');
}

// attack the other player
function attackEnemy(target) {
    let x = target.getAttribute('data-x');
    let y = target.getAttribute('data-y');

    player.attack(aiPlayer, aiBoard, x, y);
    updateBoard(aiBoard, 'ai-board');

    if(aiBoard.checkAllShipSunk()) {
        endGame(player);
    }

    aiPlayer.generateAttack();
    updateBoard(playerBoard, 'player-board');

    if(playerBoard.checkAllShipSunk()) {
        endGame(aiPlayer);
    }
}

// show squares that have been attacked and hit a ship or missed
function updateBoard(board, boardName) {
    let boardArr = board.getGameboard();
    let missedAttacksArr = board.getMissedAttacks();

    boardArr.forEach((row, y) => {
        row.forEach((cell, x) => {
            if(cell.shipName) {
                if(cell.shipName.checkHit(cell.shipName.getShip()[cell.shipIndex])) {
                    // show a square occupied by a ship and has been hit
                    let selectedCell = document.querySelector(`.${boardName} [data-x="${x}"][data-y="${y}"]`);
                    selectedCell.classList.add('hit');
                    selectedCell.classList.remove('occupied');
                    selectedCell.textContent = 'X';
                }
                else if(boardName === 'player-board') {
                    // show a square occupied by a ship but has not been hit yet
                    let selectedCell = document.querySelector(`.${boardName} [data-x="${x}"][data-y="${y}"]`);
                    selectedCell.classList.add('occupied');
                }
            }
        });
    });

    // show missed attacks on the board
    missedAttacksArr.forEach((attack) => {
        let selectedCell = document.querySelector(`.${boardName} [data-x="${attack.x}"][data-y="${attack.y}"]`);
        selectedCell.classList.add('missed');
        selectedCell.textContent = '-';
    });
}

// show the end game container
function endGame(winner) {
    const gameEndContainer = document.getElementById('game-end-container');
    gameEndContainer.classList.remove('hide-winner');

    winner.name === player.name ? playerWin(winner) : aiWin(winner);
}

async function playerWin(winner) {
    const winnerMessage = document.getElementById('winner-message');
    winnerMessage.classList.add('player-win');
    winnerMessage.innerHTML = `<i class="fa-solid fa-trophy"></i><span>${winner.name} Wins!</span><i class="fa-solid fa-trophy"></i>`;

    const response = await fetch('https://nekos.best/api/v2/thumbsup', { mode: 'cors' });
    const data = await response.json();

    const winnerImg = document.createElement('img');
    winnerImg.src = data.results[0].url;

    playAgainBtn.classList.add('player-win-restart');
    playAgainBtn.parentNode.insertBefore(winnerImg, playAgainBtn);
}

async function aiWin(winner) {
    const winnerMessage = document.getElementById('winner-message');
    winnerMessage.classList.add('ai-win');
    winnerMessage.innerHTML = `<i class="fa-solid fa-skull-crossbones"></i><span>${winner.name} Wins!</span><i class="fa-solid fa-skull-crossbones"></i>`;
    
    const response = await fetch('https://nekos.best/api/v2/cry', { mode: 'cors' });
    const data = await response.json();

    const winnerImg = document.createElement('img');
    winnerImg.src = data.results[0].url;

    playAgainBtn.parentNode.insertBefore(winnerImg, playAgainBtn);
    playAgainBtn.classList.add('ai-win-restart');
    playAgainBtn.textContent = 'Try Again?';
}