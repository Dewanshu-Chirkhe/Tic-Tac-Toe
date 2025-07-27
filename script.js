const cells = document.querySelectorAll(".cell");
let currentPlayer = "X";
const easymode = document.getElementById("easy-mode");
const table = document.getElementsByClassName("table");
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

easymode.addEventListener("click", () => {
    easymode.classList.toggle("active");
    easymode.textContent = easymode.classList.contains("active") ? "ON" : "OFF";

    if (!easymode.classList.contains("active")) {
        document.querySelector(".movestable").innerHTML = "";
    } else {
        renderMovesTable(); 
    }
});


function handleClick(e) {
    const index = [...cells].indexOf(e.target);
    const cellnumber = index + 1;

    if (cells[index].children.length > 0) return;

    const icon = document.createElement("img");
    icon.src =
        currentPlayer === "X"
            ? "./icons&images/cross.png"
            : "./icons&images/circle.png";
    icon.classList.add("player-icon");

    cells[index].appendChild(icon);
    playerMoves[currentPlayer].push(cellnumber);

    if (playerMoves[currentPlayer].length > 3) {
        const oldCellNumber = playerMoves[currentPlayer].shift(); 
        const oldIndex = oldCellNumber - 1;
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
    renderMovesTable();
}

function renderMovesTable() {
    if (!easymode.classList.contains("active")) return;

    const container = document.querySelector(".movestable");
    container.innerHTML = ""; 

    const table = document.createElement("table");
    container.appendChild(table);

    const header = document.createElement("tr");
    header.innerHTML = "<th>Player</th><th>Moves (latest 3)</th>";
    table.appendChild(header);

    for (const player of ["X", "O"]) {
        const row = document.createElement("tr");
        const moves = playerMoves[player].join(", ");
        row.innerHTML = `<td>Player ${player}</td><td>${moves}</td>`;
        table.appendChild(row);
    }

    container.appendChild(table);
}

function updateScoreDisplay() {
    document.getElementById("scoreX").textContent = score.X;
    document.getElementById("scoreO").textContent = score.O;
}

function checkWin(moves) {
    if (moves.length < 3) return false;
    const zeroBasedMoves = new Set(moves.map((m) => m - 1)); 
    return winningCombos.some((combo) =>
        combo.every((cell) => zeroBasedMoves.has(cell))
    );
}

function resetBoard() {
    cells.forEach((cell) => (cell.innerHTML = ""));
    playerMoves.X = [];
    playerMoves.O = [];
    currentPlayer = "X";
    renderMovesTable();
}
