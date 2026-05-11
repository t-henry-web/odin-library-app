const myLibrary = [];

function Book(title, author, pages, read) {
  if (!new.target) {
    throw new Error("Book must be called with the new keyword");
  }
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

// addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
// addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, true);

// console.log(myLibrary);
