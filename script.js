const myLibrary = [];

const libraryBody = document.querySelector("#library-body");

let bingoSquares = [];

function Book(title, author, pages, read) {
  if (!new.target) {
    throw new Error("Book must be called with the new keyword");
  }
  // Identity & Status
  this.id = crypto.randomUUID();
  this.read = read;
  // Metadata
  this.title = title;
  this.author = author;
  this.pages = pages;
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

function displayBooks() {}

function constructBingoBoard() {
  const board = document.querySelector("#bingo-board");
  board.innerHTML = "";

  bingoSquares.forEach((squareData) => {
    const card = document.createElement("div");
    card.classList.add("bingo-card");

    // Use the JSON ID as the data-id for future mapping
    card.setAttribute("data-id", squareData.id);

    card.innerHTML = `
      <div class="square-number">${squareData.id}</div>
      <h3 class="square-title">${squareData.category}</h3>
      <p class="square-desc">${squareData.description}</p>
    `;

    board.appendChild(card);
  });
}

async function init() {
  const response = await fetch("./bingo_2026.json");
  bingoSquares = await response.json();
  constructBingoBoard();
}

init();

addBookToLibrary("Pilgrim", "Mitchell Luthi", 708, false); // title, author, pages, read
constructBingoBoard();
displayBooks();
