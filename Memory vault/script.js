const movesEl = document.querySelector("#moves");
const boxes = document.querySelectorAll(".box");

let moves = 0;
let selectedCards = [];
let matchedCards = [];
let lockBoard = false;

boxes.forEach((box) => {
    box.addEventListener("click", () => {

        if (lockBoard) {
            return;
        }
        if (matchedCards.includes(box)) {
            return;
        }
        if (selectedCards.includes(box)) {
            return;
        }
  
        box.classList.add("rotate");

        selectedCards.push(box);

        if (selectedCards.length === 2) {
            moves++;
            movesEl.textContent = moves;
            checkMatch();
        }
    });
});


function checkMatch() {

    const firstCard = selectedCards[0];
    const secondCard = selectedCards[1];
    const firstImage = firstCard.querySelector("img").src;
    const secondImage = secondCard.querySelector("img").src;

    if (firstImage === secondImage) {

        matchedCards.push(firstCard);
        matchedCards.push(secondCard);

        selectedCards = [];
        if (matchedCards.length === boxes.length) {
            setTimeout(() => {
                alert("Congratulations! You matched all the cards!");
            }, 500);
        }
    } else {

        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove("rotate");
            secondCard.classList.remove("rotate");
            selectedCards = [];
            lockBoard = false;
        }, 1000);
    }
}


const boxes = document.querySelectorAll(".box");

const scoreText = document.getElementById("score");
const timeText = document.getElementById("time");
const finalScore = document.getElementById("finalScore");
const restart = document.querySelector(".restart");

let score = 0;
let time = 30;
let redBox = 0;
let gameOver = false;


// Show red in a random box
function showRed() {

    // Remove red from all boxes
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].style.backgroundColor = "";
    }

    // Choose a random box
    redBox = Math.floor(Math.random() * boxes.length);

    // Make the random box red
    boxes[redBox].style.backgroundColor = "red";
}


// Click the boxes
for (let i = 0; i < boxes.length; i++) {

    boxes[i].addEventListener("click", function() {

        // Stop if game is over
        if (gameOver) {
            return;
        }

        // Check if this is the red box
        if (i === redBox) {

            // Add score
            score++;

            scoreText.textContent = score;

            // Move red to another random box
            showRed();
        }
    });
}


// Start the game
showRed();


// Timer
let timer = setInterval(function() {

    time--;

    if (time < 10) {
        timeText.textContent = "0" + time;
    } else {
        timeText.textContent = time;
    }


    // Time is up
    if (time <= 0) {

        clearInterval(timer);

        gameOver = true;

        // Remove red
        for (let i = 0; i < boxes.length; i++) {
            boxes[i].style.backgroundColor = "";
        }

        // Show final score
        finalScore.textContent = score;
    }

}, 1000);





