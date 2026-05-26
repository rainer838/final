const words = [
  "DNA",
  "GENE",
  "CHROMOSOME",
  "ALLELE",
  "MUTATION",
  "HEREDITY",
  "TRAIT",
  "GENOTYPE",
  "PHENOTYPE",
  "CRISPR",
  "GENOME",
  "RNA",
  "NUCLEUS",
  "BIOLOGY",
  "EDITING"
];

const size = 15;
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const grid = [];

// Create empty grid
for (let r = 0; r < size; r++) {
  grid[r] = [];
  for (let c = 0; c < size; c++) {
    grid[r][c] = "";
  }
}

// Place words
function placeWord(word) {

  let placed = false;

  while (!placed) {

    const direction = Math.random() < 0.5 ? "horizontal" : "vertical";

    let row, col;

    if (direction === "horizontal") {

      row = Math.floor(Math.random() * size);
      col = Math.floor(Math.random() * (size - word.length));

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

    } else {

      row = Math.floor(Math.random() * (size - word.length));
      col = Math.floor(Math.random() * size);

      let fits = true;

      for (let i = 0; i < word.length; i++) {
        if (grid[row + i][col] !== "") {
          fits = false;
        }
      }

      if (fits) {
        for (let i = 0; i < word.length; i++) {
          grid[row + i][col] = word[i];
        }
        placed = true;
      }
    }
  }
}

words.forEach(placeWord);

// Fill empty spots
for (let r = 0; r < size; r++) {
  for (let c = 0; c < size; c++) {

    if (grid[r][c] === "") {
      grid[r][c] =
        letters[Math.floor(Math.random() * letters.length)];
    }
  }
}

const game = document.getElementById("game");
const wordList = document.getElementById("word-list");

let mouseDown = false;
let currentWord = "";
let selectedCells = [];
let foundWords = [];

// Create board
for (let r = 0; r < size; r++) {

  for (let c = 0; c < size; c++) {

    const cell = document.createElement("div");

    cell.classList.add("cell");
    cell.textContent = grid[r][c];

    cell.dataset.letter = grid[r][c];

    // Start drag
    cell.addEventListener("mousedown", () => {

      mouseDown = true;

      currentWord = "";
      selectedCells = [];

      clearSelection();

      addLetter(cell);
    });

    // Dragging
    cell.addEventListener("mouseover", () => {

      if (mouseDown) {
        addLetter(cell);
      }
    });

    // Stop drag
    cell.addEventListener("mouseup", () => {

      mouseDown = false;

      checkWord();
    });

    game.appendChild(cell);
  }
}

// Stop drag outside
document.addEventListener("mouseup", () => {
  mouseDown = false;
});

// Add letter
function addLetter(cell) {

  if (!selectedCells.includes(cell)) {

    currentWord += cell.dataset.letter;

    selectedCells.push(cell);

    cell.classList.add("selected");
  }
}

// Check word
function checkWord() {

  if (
    words.includes(currentWord) &&
    !foundWords.includes(currentWord)
  ) {

    foundWords.push(currentWord);

    selectedCells.forEach(cell => {
      cell.classList.remove("selected");
      cell.classList.add("found");
    });

    const wordItem = document.getElementById(currentWord);

    if (wordItem) {
      wordItem.classList.add("word-found");
      wordItem.innerHTML = "✔ " + currentWord;
    }

    if (foundWords.length === words.length) {

      document.getElementById("message").innerHTML =
        "🎉 YOU FOUND ALL WORDS!";
    }

  } else {

    clearSelection();
  }

  currentWord = "";
  selectedCells = [];
}

// Remove wrong highlight
function clearSelection() {

  document.querySelectorAll(".selected").forEach(cell => {
    cell.classList.remove("selected");
  });
}

// Word list
words.forEach(word => {

  const div = document.createElement("div");

  div.textContent = word;

  div.id = word;

  wordList.appendChild(div);
});
