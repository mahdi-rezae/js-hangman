let secretWords = ["chair", "earth", "water", "carpet", "lamp", "language"];

let selectedWord = "";
let userGuess = [];
let answer = "";
let mistakes = 0;

let underscores = document.getElementById("underscore");


function randomWord() {
    selectedWord = secretWords[Math.floor(Math.random() * secretWords.length)];
    let letterCount = selectedWord.length;
    underscores.children[0].innerHTML = "_".repeat(letterCount);
    document.getElementById("letters").addEventListener("click", mouseHandler);
    document.addEventListener("keydown", keyboardHandler);
}

function underScores() {
    let splitedWord = selectedWord.split("");
    let checkSplitedWord = splitedWord.map(letter => userGuess.indexOf(letter) >= 0 ? letter : "_");
    answer = checkSplitedWord.join("");
    underscores.innerHTML = `<p>${answer}</p>`;
}

function updateImages() {
    document.getElementById("image").children[0].src = `assets/hangman${mistakes}.png`;
}

function win() {
    if (selectedWord == answer) {
        document.getElementById("image").children[0].src = "assets/winner.png";
        document.getElementById("gameover").children[0].style.display = "block";
    }
}

function lose() {
    if (mistakes == 6) {
        document.getElementById("underscore").innerHTML = `<p>The correct answer is: ${selectedWord}</p>`;
        document.getElementById("gameover").children[0].style.display = "block";
    }
}

function checkerFunc(letter) {
    letter = letter.toLowerCase();
    userGuess.indexOf(letter) === -1 ? userGuess.push(letter) : null;
    document.getElementById(letter.toUpperCase()).classList.add("used");
    if (selectedWord.indexOf(letter) >= 0) {
        underScores();
        win();
    } else {
        mistakes++;
        lose();
        updateImages();
    }
}

function mouseHandler(event) {
    checkerFunc(event.target.id);
}

function keyboardHandler(event) {
    checkerFunc(event.key);
}




randomWord();