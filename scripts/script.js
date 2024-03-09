const img = document.getElementById("openModalButton");
const modal = document.getElementsByClassName("create-collections-modal")[0];
const span = document.getElementsByClassName("close")[0];
const form = document.getElementsByClassName("create-modal-form")[0];

function Library(name) {
  this.name = name;
  this.list = [];
}

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

img.addEventListener("click", () => {
  if (modal) {
    modal.style.display = "block";
  }
});

span.addEventListener("click", () => {
  if (modal) {
    modal.style.display = "none";
    form.reset();
  }
});
