"use strict";

const ContainerEl = document.querySelector(".container");
let playerTxt = document.querySelector(".message");
let restartBtn = document.getElementById("restartbtn");
let boxes = document.querySelectorAll(".box");

const O_TXT = "O";
const X_TXT = "X";

let currentPlayer = X_TXT;
let spaces = Array(9).fill(null);

let winnerIndicator = getComputedStyle(document.body).getPropertyValue(
    "--darkColor",
);

// start Game
const startGame = () => {
    boxes.forEach((boxs) => boxs.addEventListener("click", boxClicked));
}

// box clicked
function boxClicked(e) {
    const id = e.target.id;

    // check id
    if(!spaces[id]){
        spaces[id] = currentPlayer;
        e.target.innerText = currentPlayer;

        // winner logic
        if (playerWon()!=false){
            playerTxt.innerHTML = `<h2 class="message">Congratulation Player ${currentPlayer}</h2>`;
            winnerIndicator = playerWon();

            winnerIndicator.map(
                (box) => (boxes[box].style.backgroundColor = "#f4d03f"),
            );

            ContainerEl.classList.add("success");
        }
        currentPlayer = currentPlayer == X_TXT ? O_TXT : X_TXT;
    }
}

// winning combination
const winningCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// player win
function playerWon() {
    for (const condition of winningCombination) {
        let [a,b,c] = condition;

        if (spaces[a] && spaces[a] == spaces[b] && spaces[a] == spaces[c]) {
            return [a, b, c];
        }
    }
    return false;
}

// restart the game
restartBtn.addEventListener('click', restartGame);

function restartGame() {
    spaces.fill(null);

    boxes.forEach((box) => {
    box.innerHTML = "";
    box.style.backgroundColor = ""
    })

    playerTxt.innerHTML = "Tic Tac Toe"
    currentPlayer = X_TXT;
    ContainerEl.classList.remove("success");
}

startGame()