let wordToGuess;
let wordToDisplay;
let mistakesCount = 0;
let listOfCorrectLetters = [];
const drawing = document.querySelector("#drawing");
const drawingBox = document.querySelector("#drawing-box");
const letters = document.querySelector("#letters");
const word = document.querySelector("#word");
const status = document.querySelector("#status");


startGame()
drawingBox.onclick = startGame;

function createButtons() {
  letters.innerHTML = "";
  for (let charCode = 65; charCode < 91; charCode++) {
    let letter = String.fromCharCode(charCode);
    let buttonLetter = document.createElement("button");
    buttonLetter.id = `"btn- ${letter}`;
    buttonLetter.value = letter;
    buttonLetter.textContent = letter;
    buttonLetter.onclick = checkLetter;
    letters.append(buttonLetter);
  }
}

function defineWordToGuess() {
  wordToGuess = dictionnaire[Math.floor(Math.random() * nombreDeMots)]
}

function displayWordToGuess() {
  wordToDisplay = String();
  for (let letter of wordToGuess) {
    if (letter === "-") {
      wordToDisplay += "-  ";
    } else {
      wordToDisplay += listOfCorrectLetters.includes(letter) ? letter + "  " : "_  ";
    }
  }
  word.textContent = wordToDisplay;
}

function checkLetter() {
  this.setAttribute("disabled", "");
  if (wordToGuess.includes(this.value)) {
    listOfCorrectLetters.push(this.value);
    status.className = "green";
    status.textContent = `La lettre ${this.value} est bien présente dans le mot!`;
    document.querySelector("#correct-letters").textContent = `${listOfCorrectLetters.length}`;
    displayWordToGuess()
    if (!wordToDisplay.includes("_")) {
      status.textContent = `La lettre ${this.value} est bien présente dans le mot! Vous survivez en étant à ${6 - mistakesCount} doigt(s) de la mort. `;
      disableGame();
    }
  } else {
    mistakesCount++;
    document.querySelector("#mistakes").textContent = `${mistakesCount}`;
    drawing.src = `./styles/images/p${mistakesCount}.gif`
    status.className = "red";
    status.textContent = `La lettre ${this.value} n'est pas présente dans le mot!`;
    if (mistakesCount === 6) {
      status.textContent = `Vous avez perdu ! Le mot était ${wordToGuess} ! Vous êtes donc décédé. Profitez-bien de l'au-delà...`;
      disableGame();
    }
  }
}

function disableGame() {
  drawingBox.style.opacity = "1";
  for (let letter of letters.children) {
    letter.setAttribute("disabled", "");
    document.querySelector("#restart").textContent = "C'est fini ? Tu peux cliquer sur l'image du pendu pour recommencer";
  }
}

function resetContent() {
  document.querySelector("#restart").textContent = "Tu n'aimes pas ce mot ? Tu peux cliquer sur l'image du pendu pour recommencer avec un nouveau mot.";
  mistakesCount = 0;
  document.querySelector("#mistakes").textContent = `${mistakesCount}`;
  listOfCorrectLetters = [];
  document.querySelector("#correct-letters").textContent = `${listOfCorrectLetters.length}`;
  status.className = "white";
  drawing.src = "./styles/images/p0.gif";
  drawingBox.style.opacity = "0.2";
  status.textContent = "Prêt à mourir ?";
}

function startGame() {
  resetContent()
  createButtons()
  defineWordToGuess()
  displayWordToGuess()
}



