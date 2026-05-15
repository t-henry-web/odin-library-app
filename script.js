const myLibrary = [];
const boardState = {}; // map to track which book object belongs to which square ID
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

  for (let i = 1; i <= 25; i++) {
    const square = document.createElement("div");
    square.classList.add("bingo-card");
    square.setAttribute("data-id", i);
    board.appendChild(square);
  }
}

addBookToLibrary("Pilgrim", "Mitchell Luthi", 708, false); // title, author, pages, read
constructBingoBoard();
displayBooks();
