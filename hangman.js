const words = ["elephant", "rainbows", "hospital", "necklace", "mountain", "universe", "tricycle", "aquarium", "coloful", "nanamin"];
let currentWord = "";
let guessedWord = [];
let incorrectGuesses = 0;
const maxIncorrectGuesses = 6;

function startGame() {
  currentWord = words[Math.floor(Math.random() * words.length)];
  guessedWord = Array(currentWord.length).fill('_');
  incorrectGuesses = 0;
  displayGame();
}

function displayGame() {
  document.getElementById("word-display").textContent = guessedWord.join(" ");
  document.getElementById("hangman-display").innerHTML = getHangman(incorrectGuesses);
  document.getElementById("message").textContent = `Incorrect guesses: ${incorrectGuesses}/${maxIncorrectGuesses}`;
}

function guessLetter() {
  const letterInput = document.getElementById("letterInput").value.toLowerCase();

  if (!isValidInput(letterInput)) {
    displayMessage("Please enter a valid single letter.");
    return;
  }

  if (guessedWord.includes(letterInput)) {
    displayMessage("You already guessed that letter. Try again.");
    return;
  }

  if (currentWord.includes(letterInput)) {
    updateGuessedWord(letterInput);
  } else {
    incorrectGuesses++;
  }

  displayGame();

  if (incorrectGuesses === maxIncorrectGuesses || !guessedWord.includes('_')) {
    endGame();
  }

  document.getElementById("letterInput").value = "";
}

function isValidInput(letterInput) {
  return letterInput.length === 1 && /[a-z]/.test(letterInput);
}

function updateGuessedWord(letterInput) {
  guessedWord = currentWord.split('').map((letter, index) => (letter === letterInput ? letterInput : guessedWord[index]));
  displayMessage("Good guess!");
}

function endGame() {
  if (incorrectGuesses === maxIncorrectGuesses) {
    displayMessage(`Sorry, you lost. The correct word was "${currentWord}".`);
    playFailSound();
  } else {
    displayMessage("Congratulations! You won!");
    playWinSound();
  }

  setTimeout(startGame, 2000);
}

function displayMessage(message) {
  document.getElementById("message").textContent = message;
}

function getHangman(incorrectGuesses) {
  const hangmanFigures = [
    "-----\n|   |\n    |\n    |\n    |\n    |\n------",
    "-----\n|   |\nO   |\n    |\n    |\n    |\n------",
    "-----\n|   |\nO   |\n|   |\n    |\n    |\n------",
    "-----\n|   |\nO   |\n|\\  |\n    |\n    |\n------",
    "-----\n|   |\nO   |\n|\\  |\n/   |\n    |\n------",
    "-----\n|   |\nO   |\n|\\  |\n/\\  |\n    |\n------"
  ];

  const index = Math.min(incorrectGuesses, hangmanFigures.length - 1);

  return hangmanFigures[index];
}

// Function to play win sound
function playWinSound() {
  const winAudio = document.getElementById("winAudio");
  winAudio.play();
}

// Function to play fail sound
function playFailSound() {
  const failAudio = document.getElementById("failAudio");
  failAudio.play();
}

window.onload = startGame;