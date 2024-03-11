const img = document.getElementById("openModalButton");
const collectionModal = document.getElementsByClassName(
  "create-collections-modal"
)[0];
const spans = document.querySelectorAll(".close");
const form = document.getElementsByClassName("create-modal-form")[0];
const collectionContent = document.querySelector(".collection-content");
const libraryModal = document.querySelector(".library-modal");

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
  openModal(collectionModal);
});

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const subject = form.querySelector("#subject").value;
  const imageFile = form.querySelector("#image").files[0];

  const collectionCard = document.createElement("div");
  collectionCard.classList.add("collection-item");

  const cardImage = document.createElement("img");
  cardImage.src = URL.createObjectURL(imageFile);
  collectionCard.appendChild(cardImage);

  const cardSubject = document.createElement("p");
  cardSubject.textContent = subject;
  collectionCard.appendChild(cardSubject);

  collectionContent.appendChild(collectionCard);

  collectionCard.addEventListener("click", () => openModal(libraryModal));

  form.reset();
  collectionModal.style.display = "none";
});

function closeModal(modal) {
  if (modal) {
    modal.style.display = "none";
    if (modal === collectionModal) {
      form.reset();
    }
  }
}

spans.forEach((span) => {
  span.addEventListener("click", () => {
    closeModal(libraryModal);
    closeModal(collectionModal);
  });
});

function openModal(modal) {
  if (modal) {
    modal.style.display = "block";
  }
}
