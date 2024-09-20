const cells = document.querySelectorAll('[data-cell]');
const message = document.querySelector('.message');
const restartButton = document.querySelector('.restart-btn');

let currentPlayer = 'X';
let isGameActive = true;

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', restartGame);

function handleCellClick(e) {
    const cell = e.target;
    const index = [...cell.parentElement.children].indexOf(cell);

    if (cell.textContent !== '' || !isGameActive) return;

    placeMark(cell, index);
    if (checkWin(currentPlayer)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapPlayer();
    }
}

function placeMark(cell, index) {
    cell.textContent = currentPlayer;
}

function swapPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWin(player) {
    return winningCombos.some(combination => {
        return combination.every(index => {
            return cells[index].textContent === player;
        });
    });
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.textContent !== '';
    });
}

function endGame(draw) {
    if (draw) {
        message.textContent = 'Draw!';
    } else {
        message.textContent = `${currentPlayer} Wins!`;
    }
    isGameActive = false;
}

function restartGame() {
    currentPlayer = 'X';
    isGameActive = true;
    message.textContent = '';
    cells.forEach(cell => {
        cell.textContent = '';
    });
}
