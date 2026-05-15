import { bingoSquares } from "./bingo_2026.js";

const myLibrary = [];

const libraryBody = document.querySelector("#library-body");

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

  bingoSquares.forEach((square) => {
    const card = document.createElement("div");
    card.classList.add("bingo-card");

    // Use the bingo object ID as the data-id for future mapping
    card.setAttribute("data-id", square.id);

    card.innerHTML = `
      <div class="square-number"></div>
      <h3 class="square-title">${square.category}</h3>
      <p class="square-desc">${square.description}</p>
      <p class="square-hardmode"><strong>Hard Mode:</strong> ${square.hardModeDesc}</p>
    `;

    board.appendChild(card);
  });
}

addBookToLibrary("Pilgrim", "Mitchell Luthi", 708, false); // title, author, pages, read
constructBingoBoard();
// displayBooks();
