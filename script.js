const myLibrary = [];

function Book(title, author, pages, read) {
  if (!new.target) {
    throw new Error("Book must be called with the new keyword");
  }
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary() {
  // take params, create a book then store it in the array
}
