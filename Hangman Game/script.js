const answerEl = document.querySelector(".answer");
const hintEl = document.querySelector(".hint");
const keys = document.querySelectorAll(".key");
const wrongGuesses = document.querySelector(".guesses span");


const words = [
    {
        word: "bandwagon",
        hint: "A popular trend that attracts growing support."
    },
    {
        word: "computer",
        hint: "An electronic device used to process information."
    },
    {
        word: "elephant",
        hint: "A large animal with a long trunk."
    },
    {
        word: "rainbow",
        hint: "A colorful arc that appears after rain."
    },
    {
        word: "keyboard",
        hint: "A device used to type letters and numbers."
    },
    {
        word: "mountain",
        hint: "A very high natural landform."
    },
    {
        word: "butterfly",
        hint: "An insect with colorful wings."
    },
    {
        word: "hospital",
        hint: "A place where sick people receive medical care."
    },
    {
        word: "internet",
        hint: "A worldwide network that connects computers."
    },
    {
        word: "chocolate",
        hint: "A sweet food made from cocoa."
    }
];


let currentWord = 0;
let word = words[currentWord].word;
let guessedLetters = [];
let incorrectGuesses = 0;
let maxGuesses = 6;
let gameActive = true;

function showWord() {
    answerEl.textContent = "";
    for (let i = 0; i < word.length; i++) {
        if (guessedLetters.includes(word[i])) {
            answerEl.textContent += word[i].toUpperCase() + " ";
        } else {
            answerEl.textContent += "_ ";
        }
    }
}

function showHint() {
    hintEl.textContent = "Hint: " + words[currentWord].hint;
}

function resetKeyboard() {
    for (let i = 0; i < keys.length; i++) {
        keys[i].disabled = false;
    }
}

function nextWord() {
    if (currentWord < words.length - 1) {
        currentWord++;
        word = words[currentWord].word;
        guessedLetters = [];
        incorrectGuesses = 0;
        gameActive = true;

        showWord();
        showHint();
        updateGuesses();
        resetKeyboard();

    } else {

        alert("Congratulations! You completed all the words!");
        gameActive = false;
    }
}

function checkWinner() {
    let complete = true;
    for (let i = 0; i < word.length; i++) {
        if (!guessedLetters.includes(word[i])) {
            complete = false;
            break;
        }
    }

    if (complete === true) {
        alert("Correct! The answer is " + word.toUpperCase());
        nextWord();
    }
}

function checkGameOver() {
    if (incorrectGuesses === maxGuesses) {
        alert("Game Over! The correct answer is " + word.toUpperCase());

        nextWord();
    }
}

function updateGuesses() {
    wrongGuesses.textContent =
        incorrectGuesses + "/" + maxGuesses;
}

for (let i = 0; i < keys.length; i++) {
    keys[i].addEventListener("click", function() {
        if (gameActive === false) {
            return;
        }
        let letter = keys[i].textContent.toLowerCase();

        if (guessedLetters.includes(letter)) {
            return;
        }
        guessedLetters.push(letter);
        keys[i].disabled = true;
        if (word.includes(letter)) {
            showWord();
            checkWinner();

        } else {
            incorrectGuesses++;
            updateGuesses();

            checkGameOver();
        }

    });

}

showWord();
showHint();
updateGuesses();
