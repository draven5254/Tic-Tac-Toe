"Use Strict";

// Get documents classes/id's from html
let playerText = document.getElementById("playerText");
let gameBoard = document.querySelector(".board");

// Buttons Id's
let restartBtn = document.getElementById("restartBtn");

let boxes = Array.from(document.getElementsByClassName("box"));

let winnerIndicator = getComputedStyle(document.body).getPropertyValue(
  "--winning-blocks"
);

const O_TEXT = "O";
const X_TEXT = "X";

let currentPlayer = X_TEXT;
let spaces = Array(9).fill(null);

let gameWon = false; // Flag to track if the game is won

const startGame = () => {
  boxes.forEach((box) => box.addEventListener("click", boxClicked));
};

function boxClicked(e) {
  const id = e.target.id;

  if (!gameWon && !spaces[id]) {
    spaces[id] = currentPlayer;

    e.target.innerText = currentPlayer;

    if (playerHasWon() !== false) {
      playerText.innerText = `${currentPlayer} Has Won! 🏆`;

      let winning_blocks = playerHasWon();

      winning_blocks.map(
        (box) => (boxes[box].style.backgroundColor = winnerIndicator)
      );

      gameWon = true; // Set the game as won
      return;
    }

    currentPlayer = currentPlayer === X_TEXT ? O_TEXT : X_TEXT;
  }
}

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function playerHasWon() {
  for (const condition of winningCombos) {
    let [a, b, c] = condition;

    if (spaces[a] && spaces[a] === spaces[b] && spaces[a] === spaces[c]) {
      return [a, b, c];
    }
  }

  // Check if the game is a tie
  if (spaces.every((space) => space !== null) && !gameWon) {
    playerText.innerText = "it's a Tie";
  }

  return false;
}

playerHasWon();

// RESTART FUNCTION
function restart() {
  spaces.fill(null);
  gameWon = false; // Reset the gameWon flag
  boxes.forEach((box) => {
    box.innerText = "";
    box.style.backgroundColor = "";
  });

  playerText.innerText = "Tic Tac Toe";

  currentPlayer = X_TEXT;
}

restartBtn.addEventListener("click", restart);

startGame();

// function vsAI() {
//   // Check if it is the AI's turn
//   if (currentPlayer === O_TEXT) {
//     // Make the AI's move
//     const aiMove = makeAIMove();

//     // Update the board with the AI's move
//     spaces[aiMove] = currentPlayer;
//     boxes[aiMove].innerText = currentPlayer;

//     // Check if the AI has won
//     if (playerHasWon() !== false) {
//       playerText.innerText = `${currentPlayer} Has Won! 🏆`;

//       let winning_blocks = playerHasWon();

//       winning_blocks.map(
//         (box) => (boxes[box].style.backgroundColor = winnerIndicator)
//       );

//       gameWon = true; // Set the game as won
//       return;
//     }

//     // Switch to the human player's turn
//     currentPlayer = X_TEXT;
//   }
// }

// // Function to make the AI's move
// function makeAIMove() {
//   // TODO: Implement a minimax algorithm to find the best move for the AI
//   // For now, the AI will simply make a random move

//   const emptySpaces = spaces.filter((space) => space === null);
//   const randomIndex = Math.floor(Math.random() * emptySpaces.length);

//   return emptySpaces[randomIndex];
// }

// // Create a button to switch to AI mode
// const aiButton = document.getElementById("aiBtn");
// aiButton.innerText = "Vs AI";

// // Add an event listener to the AI button
// aiButton.addEventListener("click", vsAI);
