const computerScore = document.querySelector(".computer-score span");
const playerScore = document.querySelector(".player-score span");
const actionBar = document.querySelectorAll(".action");
const footer = document.querySelector(".footer");
const resultWrapper = document.querySelector(".result-wrapper");
const playerPicked = document.querySelector(".player-picked span");
const comPicked = document.querySelector(".com-picked span");
const result = document.querySelector(".result");
const refresh = document.querySelector(".reset u");

let playerPoints = 0;
let computerPoints = 0;

for (let i = 0; i < actionBar.length; i++) {

    actionBar[i].addEventListener("click", select);

}

function select(e) {
    let selected = e.currentTarget.id;

    console.log("Player: " + selected);
    footer.classList.add("hide");
    let computerSelected = computerSelect();

    console.log("Computer: " + computerSelected);

    playerPicked.textContent = selected;
    comPicked.textContent = computerSelected;

    checkWinner(selected, computerSelected);

    resultWrapper.classList.remove("hide");

}


function computerSelect() {
    let randomNumber = Math.floor(Math.random() * 3);
    let choice;

    if (randomNumber == 0) {
        choice = "rock";
    } else if (randomNumber == 1) {
        choice = "paper";
    } else {
        choice = "scissors";
    }

    return choice;
}

function checkWinner(selected, computerSelected) {

    if (selected == computerSelected) {
        result.textContent = "It's a tie!";
        console.log("It's a tie!")
    }

    else if (selected == "rock") {
        if (computerSelected == "scissors") {
            result.textContent = "You win";
            console.log( "You win")
            playerPoints++;

        } else {

            result.textContent = "Computer wins";
             console.log( "Computer wins")
            computerPoints++;

        }

    }

    else if (selected == "paper") {
        if (computerSelected == "rock") {
            result.textContent = "You win!";
             console.log( "You win!")
            playerPoints++;

        } else {

            result.textContent = "Computer wins!";
             console.log("Computer wins!")
            computerPoints++;

        }

    }


    else if (selected == "scissors") {

        if (computerSelected == "paper") {
            result.textContent = "You win!";
             console.log( "You win!")
            playerPoints++;

        } else {

            result.textContent = "Computer wins!";
             console.log( "Computer wins!")
            computerPoints++;

        }

    }
    
    playerScore.textContent = playerPoints;
    computerScore.textContent = computerPoints;
}

refresh.addEventListener("click", resetGame);

function resetGame() {

    playerPoints = 0;
    computerPoints = 0;
    playerScore.textContent = 0;
    computerScore.textContent = 0;
    playerPicked.textContent = "Rock";
    comPicked.textContent = "Paper";
    result.textContent = "You win!";
    resultWrapper.classList.add("hide");
    footer.classList.remove("hide");

}