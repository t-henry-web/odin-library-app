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

addBookToLibrary("Pilgrim", "Mitchell Luthi", 708, false); // title, author, pages, read

displayBooks();
