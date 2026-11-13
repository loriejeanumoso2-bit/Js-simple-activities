const boxes = document.querySelectorAll(".box");
const scoreText = document.getElementById("score");
const timeText = document.getElementById("time");
const footerEl = document.querySelector(".footer");
const resultEl = document.querySelector(".result");
const finalScore = document.getElementById("finalScore");
const restart = document.querySelector(".restart u");

// let timer = 15;
// let counter = 5;

// function startGame(){
//     let start = setInterval(()=>{
//         counter--;
//         footerEl.firstElementChild = counter;
// },1000)

//     setTimeout(()=>{
//         clearInterval(start)
//         footerEl.textContent = "Whack-A-MOLE";
//         id = setInterval(shuffleBox,1000)
//     },5000);
// }

// function randomShuffle(){
//     return Math.floor(Math.random()* boxes.length);
// }

// // let id = setInterval(shuffleCard, 500);

// function shuffleBox(){
//     let boxIndex = randomShuffle()
//         boxes[boxIndex].style.background = "red";

//         console.log(boxIndex);
//         setTimeout(() =>{
//             boxes[boxIndex].style.background = "";
//         }, 500)
        
//     if (timer <= 0){
//     clearInterval(id)
//     }
//     timer--
// }



let score = 0;
let time = 15;
let redBox = -1;
let gameOver = false;
let gameRunning = false;
let timer;
let moveTimer;
let countdownTimer;
lockBoard= false;


function startGame() {
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].style.backgroundColor = "";
    }
    let newBox = Math.floor(Math.random() * boxes.length);
    while (newBox === redBox) {
        newBox = Math.floor(Math.random() * boxes.length);
    }
    redBox = newBox;
    boxes[redBox].style.backgroundColor = "red";
     console.log(redBox)
   
}

function moveRedBox() {
    if (!gameRunning, gameOver) {
        return;
    }
    startGame();
}

function updateTime() {
    if (time < 10) {
        timeText.textContent = "0" + time;
    } else {
        timeText.textContent = time;
    }
}

function updateScore() {
    scoreText.textContent = score;
}
for (let i = 0; i < boxes.length; i++) {

    boxes[i].addEventListener("click", function () {
        if (!gameRunning, gameOver) {
            return;
        }

        if (i === redBox) {
            score++;
            scoreText.textContent = score;
            startGame();
        }
    });

}

function countdown() {
    let count = 3;
    gameRunning = false;
    gameOver = false;

    footerEl.classList.remove("hide");
    footerEl.innerHTML = "Game starting at... <span>" + count + "</span>";

    countdownTimer = setInterval(function () {
        count--;
        if (count > 0) {
            footerEl.innerHTML =
                "Game starting at... <span>" + count + "</span>";
        } else {
            clearInterval(countdownTimer);
            footerEl.textContent = "GO!";
            gameRunning = true;

            startGame();
            startTimer();

            moveTimer = setInterval(function () {
            moveRedBox();
            }, 1000);

            setTimeout(function () {
                footerEl.classList.add("hide");
            }, 500);
        }
    }, 1000);
}

function startTimer() {
    timer = setInterval(function () {
        time--;
        updateTime();
        if (time <= 0) {
            clearInterval(timer);
            clearInterval(moveTimer);

            gameOver = true;
            gameRunning = false;
            for (let i = 0; i < boxes.length; i++) {
                boxes[i].style.backgroundColor = "";
            }
            finalScore.textContent = score;
            updateScore();
            resultEl.classList.remove("hide");
            footerEl.classList.add("hide");
        }
    }, 1000);
}

restart.addEventListener("click", function () {
    clearInterval(timer);
    clearInterval(moveTimer);
    clearInterval(countdownTimer);

    score = 0;
    time = 20;
    gameOver = false;
    gameRunning = false;
    updateScore();
    updateTime();
    resultEl.classList.add("hide");
    countdown();
});
updateScore();
updateTime();
countdown();

