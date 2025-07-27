const cells = document.querySelectorAll(".cell");
let currentPlayer = "X";

const playerMoves = {
    X: [],
    O: [],
};

const score = {
    X: 0,
    O: 0,
};

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

cells.forEach((cell) => cell.addEventListener("click", handleClick));

function handleClick(e) {
    const index = [...cells].indexOf(e.target);

    if (cells[index].children.length > 0) return;

    const icon = document.createElement("img");
    icon.src =
        currentPlayer === "X"
            ? "./icons&images/cross.png"
            : "./icons&images/circle.png";
    icon.classList.add("player-icon");

    cells[index].appendChild(icon);
    playerMoves[currentPlayer].push(index);

    if (playerMoves[currentPlayer].length > 3) {
        const oldIndex = playerMoves[currentPlayer].shift();
        cells[oldIndex].innerHTML = "";
    }

    if (checkWin(playerMoves[currentPlayer])) {
        score[currentPlayer] += 1;
        updateScoreDisplay();
        setTimeout(() => {
            alert(`${currentPlayer === "X" ? "Player X" : "Player O"} wins!`);
            resetBoard();
        }, 10);
        return;
    }
    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function updateScoreDisplay() {
    document.getElementById("scoreX").textContent = score.X;
    document.getElementById("scoreO").textContent = score.O;
}

function checkWin(moves) {
    if (moves.length < 3) return false;
    const set = new Set(moves);
    return winningCombos.some((combo) => combo.every((cell) => set.has(cell)));
}

function resetBoard() {
    cells.forEach((cell) => (cell.innerHTML = ""));
    playerMoves.X = [];
    playerMoves.O = [];
    currentPlayer = "X";
}
