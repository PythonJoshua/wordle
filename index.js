//import { list } from './t.json'

let guessedWord = [[]];
let currentRow = 0;
let index = 0;
let words = [];

let actualWord = "HELLO";

function createGrid() {
    let gridContainer = document.getElementById("main");
    // console.log(gridContainer);
    for (let i = 0; i < 30; i++) {
        let grid_item = document.createElement("div");
        grid_item.classList.add("grid-item");
        grid_item.classList.add("animate__animated");
        grid_item.setAttribute("id", i + 1);
        gridContainer.appendChild(grid_item);
    }
}

function handleKeyboardClick() {
    let keys = document.querySelectorAll(".keyboard-row button");
    keys.forEach((key) => key.addEventListener("click", () => {
        // console.log(key.innerText);
        if (key.innerText === "ENTER") {
            if (guessedWord[currentRow].length < 5)
                alert("Please enter a word of 5 letters");

            else if (!words.includes(guessedWord[currentRow].join(""))) {
                shiverRow();
            }
            else {
                if (guessedWord[currentRow].join("") === actualWord) {
                    alert("You won!");
                } else {
                    if (currentRow === 5) {
                        alert(`You Lost!! the word is ${actualWord}`);
                    }
                }
                flipRow();
                // console.log(guessedWord[currentRow].join(""));
                currentRow++;
                index = 0;
                guessedWord.push([]);
            }
        }

        else if (key.innerText === "DEL") {
            if (index > 0) {
                index--;
                guessedWord[currentRow].pop();
                document.getElementById(`${currentRow * 5 + index + 1}`).innerText = "";
                // console.log("index", index);
            }
        }
        else {
            if (guessedWord[currentRow].length < 5) {
                guessedWord[currentRow].push(key.innerText);
                let idx = (currentRow * 5) + index;
                document.getElementById(`${idx + 1}`).innerText = key.innerText;
                index++;
                // console.log("index", index);
            }
        }
    }));
}

function getTileCLass(rownum, i) {
    let letter = document.getElementById(`${i}`).innerText;
    console.log(actualWord, rownum, letter);
    if (!actualWord.includes(letter)) {
        return "notLetterNotPosition";
    }
    if (actualWord.indexOf(letter) === guessedWord[rownum].join("").indexOf(letter)) {
        return "hasLetterPerfectPosition";
    }
    return "hasLetterNotPosition";
}

function flipRow() {
    let r = currentRow;
    for (let i = (1 * currentRow + 1); i <= (currentRow * 5) + index; i++) {
        setTimeout(() => {
            document.getElementById(`${i}`).classList.add("animate__flipInX");
            document.getElementById(`${i}`).classList.add(getTileCLass(r, i));
        }, (i % 5) * 100);
    }
}

function shiverRow() {
    let r = currentRow;
    for (let i = (1 * currentRow + 1); i <= (currentRow * 5) + index; i++) {
        document.getElementById(`${i}`).classList.add("animate__headShake");
    }
}

window.addEventListener('DOMContentLoaded', async () => {
    let raw = await fetch("./t.json");
    let json = await raw.json();
    json.list.map((e) => words.push(e.toUpperCase()));
    actualWord = words[Math.floor(Math.random() * words.length)];
    actualWord = actualWord.toUpperCase();
    // console.log(actualWord);
    createGrid();
    handleKeyboardClick();
});