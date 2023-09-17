document.addEventListener("DOMContentLoaded", function () {
  const cells = document.querySelectorAll(".cell");
  const display = document.querySelector(".game-status");
  const restartBtn = document.getElementById("restartbtn");
  const player1 = document.getElementById("ply1");
  const player2 = document.getElementById("ply2");

  let currentPlayer = "X";
  let gameState = ["", "", "", "", "", "", "", "", ""];
  let running = true;

  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  player1.addEventListener("input", function () {
    currentPlayer = "X";
    display.textContent = `${player1.value}'s turn (X)`;
  });

  player2.addEventListener("input", function () {
    currentPlayer = "O";
    display.textContent = `${player2.value}'s turn (O)`;
  });

  initializeGame();

  function initializeGame() {
    cells.forEach((cell) => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    currentPlayer = player1.value;
    display.textContent = `${currentPlayer}'s turn`;
    running = true;
  }

  function cellClicked() {
    const cellIndex = this.getAttribute("cellindex");
    if (gameState[cellIndex] !== "" || !running) {
      return;
    }

    updateCell(this, cellIndex);
    checkWinner();
  }

  function updateCell(cell, index) {
    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;
  }

  function changePlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    display.textContent =
      currentPlayer === "X" ? `${player1.value}'s turn (X)` : `${player2.value}'s turn (O)`;
  }

  function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winConditions.length; i++) {
      const [a, b, c] = winConditions[i];
      const cellA = gameState[a];
      const cellB = gameState[b];
      const cellC = gameState[c];

      if (cellA === "" || cellB === "" || cellC === "") {
        continue;
      }
      if (cellA === cellB && cellB === cellC) {
        roundWon = true;
        break;
      }
    }

    if (roundWon) {
      const winner = currentPlayer === "X" ? player1.value : player2.value;
      display.textContent = `Congratulations "${winner}" You Win!`;
      running = false;
    } else if (!gameState.includes("")) {
      display.textContent = "Draw!";
      running = false;
    } else {
      changePlayer();
    }
  }

  function restartGame() {
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    display.textContent = `${player1.value}'s turn (X)`;
    cells.forEach((cell) => {
      cell.textContent = "";
    });
    running = true;
  }
});
