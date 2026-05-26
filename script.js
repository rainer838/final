const words = [
  "CRISPR",
  "DNA",
  "GENE",
  "RNA",
  "MUTATION",
  "GENOME",
  "EDITING"
];

const gridSize = 10;
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let grid = [];

// Create empty grid
for (let i = 0; i < gridSize; i++) {
  grid[i] = [];
  for (let j = 0; j < gridSize; j++) {
    grid[i][j] = "";
  }
}

// Place words horizontally
function placeWords() {
  words.forEach(word => {
    let placed = false;

    while (!placed) {
      let row = Math.floor(Math.random() * gridSize);
      let col = Math.floor(Math.random() * (gridSize - word.length));

      let fits = true;

      for (let i = 0; i < word.length; i++) {
        if (grid[row][col + i] !== "") {
          fits = false;
        }
      }

      if (fits) {
        for (let i = 0; i < word.length; i++) {
          grid[row][col + i] = word[i];
        }
        placed = true;
      }
    }
  });
}

// Fill empty spaces
function fillGrid() {
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      if (grid[i][j] === "") {
        grid[i][j] = letters[Math.floor(Math.random() * letters.length)];
      }
    }
  }
}

placeWords();
fillGrid();

const game = document.getElementById("game");

let selectedLetters = "";
let selectedCells = [];

function createGrid() {
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {

      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.textContent = grid[i][j];

      cell.dataset.letter = grid[i][j];

      cell.addEventListener("mousedown", () => {
        selectedLetters = "";
        selectedCells = [];
      });

      cell.addEventListener("mouseover", () => {
        if (event.buttons === 1) {

          selectedLetters += cell.dataset.letter;
          selectedCells.push(cell);

          cell.classList.add("selected");

          checkWord();
        }
      });

      game.appendChild(cell);
    }
  }
}

function checkWord() {

  if (words.includes(selectedLetters)) {

    selectedCells.forEach(cell => {
      cell.classList.remove("selected");
      cell.classList.add("found");
    });

    const wordElement = document.getElementById(selectedLetters);

    if (wordElement) {
      wordElement.classList.add("word-found");
    }

    words.splice(words.indexOf(selectedLetters), 1);

    if (words.length === 0) {
      document.getElementById("message").textContent =
        "🎉 You Found All Words!";
    }

    selectedLetters = "";
    selectedCells = [];
  }
}

createGrid();

// Show word list
const wordList = document.getElementById("word-list");

[
  "CRISPR",
  "DNA",
  "GENE",
  "RNA",
  "MUTATION",
  "GENOME",
  "EDITING"
].forEach(word => {

  const span = document.createElement("span");

  span.textContent = word + " ";
  span.id = word;

  wordList.appendChild(span);
});
