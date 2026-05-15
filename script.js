const myLibrary = [];
const libraryBody = document.querySelector("#library-body");

function Book(title, author, pages, read, bingoCell, isHardMode = false) {
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

  // Bingo Specifics
  this.bingoCell = bingoCell;
  this.isHardMode = isHardMode;
}

function addBookToLibrary(title, author, pages, read, bingoCell, isHardMode) {
  const newBook = new Book(title, author, pages, read, bingoCell, isHardMode);
  myLibrary.push(newBook);
}

function displayBooks() {
  libraryBody.innerHTML = "";
  myLibrary.forEach((book) => {
    const row = document.createElement("tr");
    row.setAttribute("data-id", book.id);

    const addCell = (text) => {
      const cell = document.createElement("td");
      cell.textContent = text;
      row.appendChild(cell);
    };

    addCell(book.title);
    addCell(book.author);
    addCell(book.pages);
    addCell(book.bingoCell);
    addCell(book.isHardMode ? "Hard" : "Easy");
    addCell(book.read ? "Read" : "Not Read");

    libraryBody.appendChild(row);
  });
}

addBookToLibrary(
  "Pilgrim",
  "Mitchell Luthi",
  708,
  false,
  "One-Word Title",
  true,
); // title, author, pages, read, bingoCell, isHardMode

displayBooks();
