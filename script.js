const myLibrary = [];
const libraryBody = document.querySelector("#library-body");

function Book(title, author, pages, read, bingoID, isHardMode = false) {
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
  this.bingoID = bingoID;
  this.isHardMode = isHardMode;
}

function addBookToLibrary(title, author, pages, read, bingoID, isHardMode) {
  const newBook = new Book(title, author, pages, read, bingoID, isHardMode);
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
    addCell(book.read ? "Read" : "Not Read");

    libraryBody.appendChild(row);
  });
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, true);
addBookToLibrary("1984", "George Orwell", 328, true);

displayBooks();
