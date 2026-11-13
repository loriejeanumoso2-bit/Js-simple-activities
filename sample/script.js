// let array = [5,11,15,20,25];

// let x = array.every((num) => num % 5 ==0);


// let a = [1,2,3,4,-5,10]
// let res = true;

// for(let i = 0; i< a.length ; i++){
//     if(a[i]< 0) res = false
//     //     console.log(false)
//     // }else{
//     //     console.log(true)
//     // }

// }
// console.log(res)

// let a = [1,2,3,4,-5,10]

// let x = a.some((num)=>num<0);

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

        alert("Congratulations! You completed all 10 words!");
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
