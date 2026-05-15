import { bingoSquares } from "./bingo_2026.js";

const myLibrary = [];

// const libraryBody = document.querySelector("#library-body");

function Book(title, author, read, bingoSquareId = null, hardMode = false) {
  if (!new.target) {
    throw new Error("Book must be called with the new keyword");
  }
  // Identity & Status
  this.id = crypto.randomUUID();
  this.read = read;
  // Metadata
  this.title = title;
  this.author = author;
  // Bingo-related properties
  this.bingoSquareId = bingoSquareId;
  this.hardMode = hardMode;
}

function addBookToLibrary(
  title,
  author,
  read,
  bingoSquareId = null,
  hardMode = false,
) {
  const newBook = new Book(title, author, read, bingoSquareId, hardMode);
  myLibrary.push(newBook);
}

// function displayBooks() {}

function constructBingoBoard() {
  const board = document.querySelector("#bingo-board");
  board.innerHTML = "";

  bingoSquares.forEach((square) => {
    const card = document.createElement("div");
    card.classList.add("bingo-card");
    card.setAttribute("data-id", square.id);

    const squareBooks = myLibrary.filter(
      (book) => book.bingoSquareId === square.id,
    );

    const booksHtml = squareBooks
      .map(
        (book) => `
      <div class="book-entry" data-book-id="${book.id}">
        <p><strong>${book.title}</strong> by ${book.author}</p>
        <label>
          <input type="checkbox" class="read-check" ${book.read ? "checked" : ""}> Finished
        </label>
        <label>
          <input type="checkbox" class="hard-mode-check" ${book.hardMode ? "checked" : ""}> HM
        </label>
      </div>
    `,
      )
      .join("");

    card.innerHTML = `
      <div class="square-number"></div>
      <h3 class="square-title">${square.id}: ${square.category}</h3>
      <p class="square-desc">${square.description}</p>
      <p class="square-hardmode">Hard Mode: ${square.hardModeDesc}</p>
      <div class="card-books">
        ${booksHtml}
      </div>
    `;

    board.appendChild(card);
  });
}

addBookToLibrary("Pilgrim", "Mitchell Luthi", false, 16, true); // title, author, read, bingoSquareId, hardMode
constructBingoBoard();
// displayBooks();
