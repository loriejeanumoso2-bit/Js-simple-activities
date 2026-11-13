
const scrambleWord = document.querySelector(".word-box");
const hintEl = document.querySelector(".word h4");
const refreshBtn = document.querySelector(".refresh");
const checkBtn = document.querySelector(".check");
const input = document.querySelector("input");

const keys = document.querySelectorAll(".key");
const spaceBtn = document.querySelector("#space");
const deleteBtn = document.querySelector("#delete");

let words = {
    1: "school",
    2: "happy",
    3: "book",
    4: "run",
    5:"brave",
    6:"new",
    7:"quiet",
    8:"cell",
    9:"ecosystem",
    10:"hypothesis",
    11:"temperature"
};

let hints = {
    "school": "A place where we study",
    "happy": "A feeling of joy",
    "book": "A collection of pages",
    "run": "To move swiftly on foot",
    "brave":"Showing courage when facing danger or pain",
    "new":"Recently made, introduced, or discovered; not old",
    "quiet":"Making little or no noise",
    "cell":"The smallest basic unit of a living thing",
    "ecosystem":"A community of living things interacting with their non-living environment",
    "hypothesis": "A suggested explanation or educated guess that can be tested",
    "temperature": "A measure of how hot or cold something is"
  };

let currentWord = 1;

let word = words[currentWord];

let wordArray = word.split("");


function showWord() {

    word = words[currentWord];

    wordArray = word.split("");

    hintEl.textContent = "Hint: " + hints[word];

    input.value = "";

    refresh();
}

function refresh() {

    scrambleWord.innerHTML = "";

    for (let i = wordArray.length - 1; i > 0; i--) {

        const random = Math.floor(Math.random() * (i + 1));

        [wordArray[i], wordArray[random]] =
        [wordArray[random], wordArray[i]];
    }

    for (let i = 0; i < wordArray.length; i++) {

        scrambleWord.innerHTML +=
            "<div class='letter-box'>" +
            wordArray[i].toUpperCase() +
            "</div>";
    }
}

refreshBtn.addEventListener("click", refresh);

keys.forEach(function(key) {

    key.addEventListener("click", function() {

        input.value += key.textContent;

    });

});

spaceBtn.addEventListener("click", function() {

    input.value += " ";

});

deleteBtn.addEventListener("click", function() {

    input.value = input.value.slice(0, -1);

});

checkBtn.addEventListener("click", check);

function check() {

    let inputValue = input.value.toLowerCase();

    if (inputValue == word) {

        if (currentWord < Object.keys(words).length) {

            currentWord++;

            showWord();

        } else {

            alert("Game Complete!");

            input.value = "";

        }

    } else {

        alert("Try again.");

    }
}

showWord();

