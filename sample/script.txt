const startScreen = document.querySelector("#start-screen");
const categoryScreen = document.querySelector("#category-screen");
const riddleScreen = document.querySelector("#riddle-screen");
const startBtn = document.querySelector("#start");
const goBackBtn = document.querySelector("#go-back");
const categoryFooter = document.querySelector("#category-footer");
const menuBtn = document.querySelector("#menu");
const exitBtn = document.querySelector("#exit");
const riddleText = document.querySelector("#riddle-text");
const answerInput = document.querySelector("#input-answer");
const answerBtn = document.querySelector("#answer");
const checkBtn = document.querySelector("#check");
const arrowBack = document.querySelector("#arrow-back");
const arrowNext = document.querySelector("#arrow-next");
const confirmPopup = document.querySelector("#confirm-popup");
const yesBtn = document.querySelector("#yes");
const noBtn = document.querySelector("#no");
const resultPopup = document.querySelector("#result-popup");
const resultIcon = document.querySelector("#result-icon");
const resultTitle = document.querySelector("#result-title");
const resultText = document.querySelector("#result-text");
const nextPopupBtn = document.querySelector("#next-popup");
const levelScreen = document.querySelector("#level-screen");
const levelGrid = document.querySelector("#level-grid");
const levelBackBtn = document.querySelector("#level-back");

const riddles = {
    Veggies: [
        { hint: "Nang munti pa ay paruparo, nang lumaki ay latigo.", 
            answer: "Sitaw" },
        { hint: "Habang aking hinihiwa, ako ay pinaluluha.", 
            answer: "Sibuyas" },
        { hint: "Ang ina ay gumagapang pa, ang anak ay umuupo na.", 
            answer: "Kalabasa" },
        { hint: "Isda ko sa Maribeles, nasa loob ang kaliskis.", 
            answer: "Sili" },
        { hint: "Bahay ng anluwagi, lisa ang haligi.", 
            answer: "Kabute" },
        { hint: "Nang sumipot sa maliwanag, kulubot na ang balat.",
            answer: "Ampalaya"},
        { hint: "Kung hilaw ay gulay, kung hinog ay prutas.",
            answer: "Kamatis"},
        { hint: "Ulan nang ulan, hindi pa rin mabasa ang tiyan.",
            answer: "Dahon ng gabi"},
        { hint: "Baboy ko sa parang, namumula sa tapang.",
            answer: "Sili"},
        { hint: "Gulay na granate ang kulay, matigas pa sa binti ni Aruray, pag nilaga ay lantang katuray.",
            answer: "Talong"}
        
    ],

    Things: [
        { hint: "Kung kailan mo pinatay, saka pa humaba ang buhay", 
            answer: "Kandila" },
        { hint: "May apat na binti, hindi makalakad.", 
            answer: "Mesa" },
        { hint: "Buto't balat na malapad, kay galing kung lumipad.", 
            answer: "Saranggola" },
        { hint: "Dumaan ang hari, nagkagatan ang mga pari.", 
            answer: "Zipper" },
        { hint: "Isa ang pasukan, tatlo ang labasan.", 
            answer: "Kamiseta" },
        { hint: "Bumili ako ng alipin, mataas pa sa akin.", 
            answer: "Sumbrero" },
        { hint: "Nagtago si Pedro, nakalabas ang ulo.", 
            answer: "Pako" },
        { hint: "Hindi hayop, hindi tao, pumupulupot sa tiyan mo.", 
            answer: "Sinturon" },
        { hint: "Isang butil ng palay, sakop ang buong buhay.", 
            answer: "Ilaw" },
        { hint: "Kung gabi ay malapad, kung araw ay matangkad", 
            answer: "Banig" }
    ]
};
 

let currentList = [];   
let currentIndex = 0;  


function showScreen(screen) {
    startScreen.classList.add("hide");
    categoryScreen.classList.add("hide");
    levelScreen.classList.add("hide");
    riddleScreen.classList.add("hide");

    screen.classList.remove("hide");
}
for (let name in riddles) {
    const btn = document.createElement("button");
    btn.textContent = name;
    btn.className = "category-btn";
    btn.addEventListener("click", function () {
        chooseCategory(name);
    });
    categoryFooter.appendChild(btn);
}
 
function loadRiddle() {
    riddleText.textContent = currentList[currentIndex].hint;
    answerInput.value = "";
    
}
 
function nextRiddle() {
    if (currentIndex < currentList.length - 1) {
        currentIndex++;
        loadRiddle();
    } else {
        alert("You finished all the riddles in this category!");
        showScreen(categoryScreen);
    }
}
 
function prevRiddle() {
    if (currentIndex > 0) {
        currentIndex--;
        loadRiddle();
    }
}
 
function chooseCategory(name) {
    currentList = riddles[name];
    currentIndex = 0;
    loadRiddle();
    showScreen(riddleScreen);
}
 
function showResult(icon, title, text) {
    resultIcon.textContent = icon;
    resultTitle.textContent = title;
    resultText.textContent = text;
    resultPopup.classList.remove("hide");
}

function showLevels() {
    levelGrid.innerHTML = "";

    for (let i = 0; i < currentList.length; i++) {
        const btn = document.createElement("button");

        btn.textContent = i + 1;
        btn.className = "level-btn";

        if (i === currentIndex) {
            btn.classList.add("active");
        }

        btn.addEventListener("click", function () {
            currentIndex = i;
            loadRiddle();
            showLevels();
        });

        levelGrid.appendChild(btn);
    }

    showScreen(levelScreen);
}
 

startBtn.addEventListener("click", function () {
    showScreen(categoryScreen);
});
 
goBackBtn.addEventListener("click", function () {
    showScreen(startScreen);
});
 
menuBtn.addEventListener("click", function () {
    showLevels();
});

levelBackBtn.addEventListener("click", function () {
    showScreen(riddleScreen);
});
 
exitBtn.addEventListener("click", function () {
    showScreen(startScreen);
});
 
arrowNext.addEventListener("click", nextRiddle);
arrowBack.addEventListener("click", prevRiddle);
 

checkBtn.addEventListener("click", function () {
    const typed = answerInput.value.toLowerCase();
    const correct = currentList[currentIndex].answer.toLowerCase();

    if (typed === correct) {
        
        showResult("🏆", "Excellent!", correct + " is correct.");
    } else {

        answerInput.classList.add("shake");

        setTimeout(function () {
            answerInput.classList.remove("shake");
        }, 500);
    }
});

answerBtn.addEventListener("click", function () {
    confirmPopup.classList.remove("hide");
});
 
noBtn.addEventListener("click", function () {
    confirmPopup.classList.add("hide");
});
 
yesBtn.addEventListener("click", function () {
    confirmPopup.classList.add("hide");
    showResult("💡", "The answer is", currentList[currentIndex].answer);
});
 
nextPopupBtn.addEventListener("click", function () {
    resultPopup.classList.add("hide");
    nextRiddle();
});
 