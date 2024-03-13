const img = document.getElementById("openModalButton");
const collectionModal = document.getElementsByClassName(
  "create-collections-modal"
)[0];
const closeControls = document.querySelectorAll(".close");
const form = document.getElementsByClassName("create-modal-form")[0];
const collectionContent = document.querySelector(".collection-content");
const libraryModal = document.querySelector(".library-modal");
const libraryModalSubject = document.querySelector(".library-subject");
const trashIcon = document.querySelector(".trash-icon");
const closedTrashSrc = trashIcon.src;
const openTrashSrc = "../images/open-bin.png";

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

  collectionCard.addEventListener("click", () => {
    libraryModalSubject.textContent = subject;
    openModal(libraryModal);
  });

  form.reset();
  collectionModal.style.display = "none";
});

function createDefaultCards() {
  const defaultCards = [
    {
      imgSrc: "images/letter.png",
      imgAlt: "Letter icon",
      subject: "Writers' Epistolary Tales",
    },
    {
      imgSrc: "images/abstract-shape.png",
      imgAlt: "Abstract shapes",
      subject: "Classic Art Explorations",
    },
    {
      imgSrc: "images/gargoyle.png",
      imgAlt: "Gargoyle icon",
      subject: "Ghoulish Guide to Holiday Horror",
    },
    {
      imgSrc: "images/cupid.png",
      imgAlt: "Cupid icon",
      subject: "Eros",
    },
    {
      imgSrc: "images/kraken.png",
      imgAlt: "Mythical sea monster icon",
      subject: "Greek Mythology Monsters",
    },
  ];

  defaultCards.forEach((card) => {
    const collectionCard = document.createElement("div");
    collectionCard.classList.add("collection-item");

    const cardImage = document.createElement("img");
    cardImage.src = card.imgSrc;
    cardImage.alt = card.imgAlt;
    collectionCard.appendChild(cardImage);

    const cardSubject = document.createElement("p");
    cardSubject.textContent = card.subject;
    collectionCard.appendChild(cardSubject);

    collectionContent.appendChild(collectionCard);

    collectionCard.addEventListener("click", () => {
      libraryModalSubject.textContent = card.subject;
      openModal(libraryModal);
    });
  });
}

window.addEventListener("load", createDefaultCards);

function closeModal(modal) {
  if (modal) {
    modal.style.display = "none";
    if (modal === collectionModal) {
      form.reset();
    }
  }
}

closeControls.forEach((closeControl) => {
  closeControl.addEventListener("click", () => {
    closeModal(libraryModal);
    closeModal(collectionModal);
  });
});

function openModal(modal) {
  if (modal) {
    modal.style.display = "block";
  }
}

trashIcon.addEventListener("mouseenter", function () {
  this.src = openTrashSrc;
});

trashIcon.addEventListener("mouseleave", function () {
  this.src = closedTrashSrc;
});
