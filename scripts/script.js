function Library(name) {
  this.name = name;
  this.list = [];
  // Option 1
  this.addBookToLibrary = function () {
    const title = prompt("Book Title: ");
    const author = prompt("Book author: ");
    const book = new Book(title, author);
    this.list.push(book);
  };
}
// Option 2
Library.prototype.addBookToLibrary = function () {
  const title = prompt("Book Title: ");
  const author = prompt("Book author: ");
  const book = new Book(title, author);
  this.list.push(book);
};

function Book(title, author) {
  this.title = title;
  this.author = author;
}

// function addBookToLibrary() {
//   const title = prompt("Book Title: ");
//   const author = prompt("Book author: ");
//   const book = new Book(title, author);
//   myLibrary.push(book);
// }
