const cardContainerEl = document.querySelector(".card-con");
const movesEl = document.querySelector("#move");
const timeEl = document.querySelector("#time");
const footer = document.querySelector(".footer");
const finalTimeEl = document.querySelector("#finalTime");
const finalMovesEl = document.querySelector("#finalMoves");
const restartBtn = document.querySelector("#restart");

cardContainerEl.innerHTML = "";

let move = 0;
let time = 0;
let timer = null;
let selectedCards = [];
let matchedCards = [];
let lockBoard = false;
let gameStarted = false;

let backCon = [
    "img/photo1.jpg","img/photo1.jpg",

    "img/photo2.jpg", "img/photo2.jpg",

    "img/photo3.jpg","img/photo3.jpg",

    "img/photo4.jpg", "img/photo4.jpg",

    "img/photo5.jpg", "img/photo5.jpg",

    "img/photo6.jpg","img/photo6.jpg",

    "img/photo7.jpg","img/photo7.jpg",

    "img/photo8.jpg", "img/photo8.jpg"
];


for (let i = backCon.length - 1; i > 0; i--) {
    let randomIndex = Math.floor(Math.random() * (i + 1));
    let randomcards = backCon[i];
    backCon[i] = backCon[randomIndex];
    backCon[randomIndex] = randomcards;
}

for (let i = 0; i < backCon.length; i++) {

    cardContainerEl.innerHTML += `
        <div class="card">
            <div class="wrapper">
                <div class="front">?</div>
                <div class="back"><img src="${backCon[i]}" alt="card image">
                </div>
            </div>
        </div> `;
}

const cardsEl = cardContainerEl.querySelectorAll(".card");
for (let i = 0; i < cardsEl.length; i++) {
    cardsEl[i].addEventListener("click", cardClick);

}

function cardClick(e) {
    const wrapperEl = e.currentTarget.firstElementChild;

    if (lockBoard) {
        return;
    }
    if (matchedCards.includes(wrapperEl)) {
        return;
    }
    if (selectedCards.includes(wrapperEl)) {
        return;
    }
    if (!gameStarted) {
        gameStarted = true;
        startTimer();
    }

    wrapperEl.classList.add("rotate");
    selectedCards.push(wrapperEl);

    if (selectedCards.length === 2) {
        move++;
        movesEl.textContent = move;
        checkMatch();
    }

}

function startTimer() {
    timer = setInterval(() => {
        time++;
        timeEl.textContent = time;
    }, 1000);

}

function stopTimer() {
    clearInterval(timer);

}

function checkMatch() {
    const firstCard = selectedCards[0];
    const secondCard = selectedCards[1];

    const firstValue = firstCard.querySelector(".back img").src;
    const secondValue = secondCard.querySelector(".back img").src;

    if (firstValue === secondValue) {
        matchedCards.push(firstCard);
        matchedCards.push(secondCard);
        selectedCards = [];

        if (matchedCards.length === cardsEl.length) {
            stopTimer();
            setTimeout(() => {
                showFooter();
            }, 500);
        }
    }

    else {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove("rotate");
            secondCard.classList.remove("rotate");
            selectedCards = [];
            lockBoard = false;

        }, 500);
    }
}

function showFooter() {
    finalTimeEl.textContent = time;
    finalMovesEl.textContent = move;
    footer.style.display = "flex";

}

restartBtn.addEventListener("click", () => {
    location.reload();

});