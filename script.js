import { bingoSquares } from "./bingo_2026.js";

const myLibrary = [];
window.myLibrary = myLibrary;

const board = document.querySelector("#bingo-board");
const addBookForm = document.querySelector("#add-book-form");
const addBookDialog = document.querySelector("#add-book-dialog");

board.addEventListener("change", (event) => {
  const target = event.target;
  const bookEntry = target.closest(".book-entry");
  if (!bookEntry) return;

  const bookId = bookEntry.getAttribute("data-book-id");
  const book = myLibrary.find((b) => b.id === bookId);
  if (!book) return;

  if (target.classList.contains("read-check")) {
    book.read = target.checked;
  } else if (target.classList.contains("hard-mode-check")) {
    book.hardMode = target.checked;
  }
});

board.addEventListener("click", (event) => {
  const addButton = event.target.closest(".add-book-btn");
  if (!addButton) return;

  const squareId = addButton.getAttribute("data-square-id");

  const dialog = document.getElementById("add-book-dialog");
  dialog.setAttribute("data-square-id", squareId);
  dialog.showModal();
});

board.addEventListener("click", (event) => {
  const deleteButton = event.target.closest(".delete-book-btn");
  if (!deleteButton) return;

  const bookId = deleteButton.getAttribute("data-book-id");

  removeBookFromLibrary(bookId);
  constructBingoBoard();
});

addBookForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(addBookForm);
  const title = formData.get("title");
  const author = formData.get("author");

  const squareId = parseInt(addBookDialog.getAttribute("data-square-id"));

  addBookToLibrary(title, author, false, squareId, false);
  addBookForm.reset();
  addBookDialog.close();
  constructBingoBoard();
});

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

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

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

function removeBookFromLibrary(bookId) {
  const bookIndex = myLibrary.findIndex((b) => b.id === bookId);
  if (bookIndex !== -1) {
    myLibrary.splice(bookIndex, 1);
  }
}

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
    <div class="book-data">
      <span class="book-title">${book.title}</span>
      <span class="book-author">by ${book.author}</span>
    </div>
    <div class="book-status-controls">
      <label>
        <input type="checkbox" class="read-check" ${book.read ? "checked" : ""}>
        <span>Read</span>
      </label>
      <label>
        <input type="checkbox" class="hard-mode-check" ${book.hardMode ? "checked" : ""}>
        <span>HM</span>
      </label>
    </div>
    <div>
      <button class="delete-book-btn" data-book-id="${book.id}" data-square-id="${square.id}">
        Delete
      </button>
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
      <button class="add-book-btn" data-square-id="${square.id}">
    Add Book
  </button>
    `;

    board.appendChild(card);
  });
}

addBookToLibrary("Pilgrim", "Mitchell Luthi", false, 16, true); // title, author, read, bingoSquareId, hardMode
addBookToLibrary("The Story of Silence", "Alex Myers", false, 1, true);

constructBingoBoard();
