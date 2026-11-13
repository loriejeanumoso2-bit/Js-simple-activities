
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartButton = document.getElementById("restart");

let currentPlayer = "X";
let gameActive = true;
let moves = 0;

let board = ["", "", "", "", "", "", "", "", ""];

let winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

for (let i = 0; i < cells.length; i++) {

    cells[i].addEventListener("click", function() {

        if (cells[i].textContent === "" && gameActive === true) {

            cells[i].textContent= currentPlayer;
            board[i] = currentPlayer;
            moves++;

            checkWinner();
            
            if (gameActive === true) {

                if (currentPlayer === "X") {
                    currentPlayer = "O";
                } else {
                    currentPlayer = "X";
                }

                statusText.textContent =
                    "Player " + currentPlayer + "'s turn";
            }
        }
    });
}


function checkWinner() {

    for (let i = 0; i < winningCombinations.length; i++) {

        let a = winningCombinations[i][0];
        let b = winningCombinations[i][1];
        let c = winningCombinations[i][2];

        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[b] === board[c]
        ) {
          
            statusText.textContent = "Player " + currentPlayer + " wins!";
            gameActive = false;
            return;
        }
    }

    if (moves === 9) {
        statusText.textContent = "It's a draw!";
        gameActive = false;
    }
}

restartButton.addEventListener ("click", function() {

    for (let i = 0; i < cells.length; i++) {
        cells[i].textContent = "";
    }

    board = ["", "", "", "", "", "", "", "", ""];

    currentPlayer = "X";
    gameActive = true;
    moves = 0;

    statusText.textContent = "Player X's turn";
});

