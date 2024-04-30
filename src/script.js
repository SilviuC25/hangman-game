let startCard = document.getElementById("card-start");
let livesContainer = document.getElementById("lives-container");
let hangmanImage = document.getElementById("hangman-image");
let wordContainer = document.getElementById("word-container");
let lettersContainer = document.getElementById("letters-container");
let winText = document.getElementById("win-text");
let lossText = document.getElementById("loss-text");

let words = [
    "keyboard",
    "bicycle",
    "backpack",
    "calendar",
    "umbrella",
    "computer",
    "headphones",
    "notebook",
    "sunglasses",
    "telescope"
];

let randomIndex = Math.floor(Math.random() * words.length);
let gameWord = words[randomIndex];

function startGame() {
    startCard.classList.add("visually-hidden");
    livesContainer.classList.remove("visually-hidden");
    hangmanImage.classList.remove("visually-hidden");
    lettersContainer.classList.remove("visually-hidden");

    let wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";

    for (let i = 0; i < gameWord.length; ++i) {
        let letterSpace = document.createElement("div");
        letterSpace.classList.add("col", "text-light");
        letterSpace.innerHTML = "_";
        wordContainer.appendChild(letterSpace);
    }

    document.querySelectorAll(".btn").forEach(button => {
        button.addEventListener("click", function() {
            let letter = button.textContent.toLowerCase();
            checkLetter(letter);
            button.classList.add("visually-hidden");
        });
    });
}

let hangmanImageIndex = 1;
const MAX_LIVES = 7;

function updateHangmanStage() {
    let hangmanImage = document.getElementById("hangman-image");
    let heartIcon = document.getElementById(`heart${hangmanImageIndex}`);
    ++hangmanImageIndex;
    hangmanImage.src = `/assets/images/hangman${hangmanImageIndex}.jpg`;
    heartIcon.classList.add("visually-hidden");
}

function checkLetter(letter) {
    let isInWord = gameWord.includes(letter);
    if (isInWord) {
        let letterButtons = document.querySelectorAll(".btn-" + letter);
        letterButtons.forEach(button => {
            button.classList.add("visually-hidden");
        });

        let allLettersGuessed = true;
        for (let i = 0; i < gameWord.length; ++i) {
            if (gameWord[i] === letter) {
                let letterSpace = wordContainer.children[i];
                letterSpace.textContent = letter;
            }
            if (wordContainer.children[i].textContent === "_") {
                allLettersGuessed = false;
            }
        }
        if (allLettersGuessed) {
            winText.classList.remove("visually-hidden");
            hangmanImage.classList.add("visually-hidden");
        }
    } else {
        updateHangmanStage();
    }

    if (hangmanImageIndex > MAX_LIVES && !isInWord) {
        lossText.textContent += gameWord.toUpperCase();
        lossText.classList.remove("visually-hidden");
        hangmanImage.classList.add("visually-hidden");
    }
}