import { bingoSquares } from "./bingo_2026.js";

const myLibrary = [];

const board = document.querySelector("#bingo-board");
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
    <div class="book-header">
      <span class="book-title">${book.title}</span>
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
    </div>
    <span class="book-author">by ${book.author}</span>
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
constructBingoBoard();
// displayBooks();
