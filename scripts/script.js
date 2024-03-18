const createLibraryBtn = document.querySelector(".create-library-btn");
const createLibraryModal = document.querySelector(".create-library-modal");
const closeControls = document.querySelectorAll(".close");
const createLibraryForm = document.querySelector(".create-library-form");
const librariesContainer = document.querySelector(".libraries-container");
const libraryModal = document.querySelector(".library-modal");
const libraryModalSubject = document.querySelector(".library-subject");
const addBookBtn = document.querySelector(".library-modal button");
const bookList = document.querySelector(".bookList");
const createBookModal = document.querySelector(".create-book-modal");
const createBookForm = document.querySelector(".create-book-form");

function Library(subject, imageFile) {
  this.subject = subject;
  this.imageFile = imageFile;
  this.books = [];
}

Library.prototype.addBook = function (book) {
  this.books.push(book);
};

function Book(title, author, year) {
  this.title = title;
  this.author = author;
  this.year = year;
}

function createLibraryCard(library) {
  const libraryCard = document.createElement("div");
  libraryCard.classList.add("library-card-item");

  const cardImage = createCardImage(library.imageFile);
  libraryCard.appendChild(cardImage);

  const cardSubject = createCardSubject(library.subject);
  libraryCard.appendChild(cardSubject);

  librariesContainer.appendChild(libraryCard);

  libraryCard.addEventListener("click", () => {
    openLibraryModal(library);
  });
}

function createCardImage(imageFile) {
  const cardImage = document.createElement("img");
  if (imageFile instanceof File) {
    cardImage.src = URL.createObjectURL(imageFile);
  } else if (typeof imageFile === "string") {
    if (imageFile.startsWith("data:")) {
      cardImage.src = imageFile;
    } else {
      cardImage.src = imageFile;
    }
  } else {
    cardImage.src = "placeholder.png";
  }
  return cardImage;
}

function createCardSubject(subject) {
  const cardSubject = document.createElement("p");
  cardSubject.textContent = subject;
  return cardSubject;
}

function createDefaultCards() {
  const defaultCards = [
    {
      imgSrc: "../images/letter.png",
      imgAlt: "Letter icon",
      subject: "Writers' Epistolary Tales",
      books: [
        new Book("Letters to a Young Poet", "Rainer Maria Rilke", 1929),
        new Book("Letters to Milena", "Franz Kafka", 1952),
        new Book("Letters from the Earth", "Mark Twain", 1962),
        new Book("Letters from a Stoic", "Seneca", 65),
      ],
    },
    {
      imgSrc: "../images/abstract-shape.png",
      imgAlt: "Abstract shapes",
      subject: "Experimental works",
      books: [
        new Book("In Search of Lost Time", "Marcel Proust", 1913),
        new Book("The Man Without Qualities", "Robert Musil", 1930),
        new Book("Our Lady of The Flowers", "Jean Genet", 1943),
        new Book("Spring Snow: Sea of Fertility", "Yukio Mishima", 1969),
      ],
    },
    {
      imgSrc: "../images/gargoyle.png",
      imgAlt: "Gargoyle icon",
      subject: "Ghoulish Guide to Holiday Horror",
      books: [
        new Book("Frankenstein", "Mary Shelley", 1816),
        new Book("A Christmas Carol", "Charles Dickens", 1843),
        new Book("The Turn of the Screw", "Henry James", 1898),
        new Book("The Phantom Coach", "Amelia Edwards", 1864),
      ],
    },
    {
      imgSrc: "../images/cupid.png",
      imgAlt: "Cupid icon",
      subject: "Eros",
      books: [
        new Book("The Ethics of Ambiguity", "Simone de Beauvoir", 1947),
        new Book(
          "Phenomenology of Spirit",
          "Georg Wilhelm Friedrich Hegel",
          1910
        ),
        new Book("Being and Time", "Martin Heidegger", 1927),
        new Book("The Symposium and the Phaedrus", "Plato", 385),
      ],
    },
    {
      imgSrc: "../images/kraken.png",
      imgAlt: "Mythical sea monster icon",
      subject: "Greek Mythology Monsters",
      books: [
        new Book("The Song of Achilles", "Madeline Miller ", 2011),
        new Book("Circe", "Madeline Miller", 2018),
        new Book("The Golem and the Jinni", "Helene Wecker", 2013),
        new Book("A Thousand Ships", "Natalie Haynes", 2019),
      ],
    },
  ];

  defaultCards.forEach((card) => {
    const newLibrary = new Library(card.subject, card.imgSrc);

    card.books.forEach((book) => {
      newLibrary.addBook(book);
    });

    createLibraryCard(newLibrary);
  });
}

window.addEventListener("load", createDefaultCards);

createLibraryBtn.addEventListener("click", () => {
  openCreateLibraryModal();
});

createLibraryForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const subject = createLibraryForm.querySelector("#subject").value;
  const imageFile = createLibraryForm.querySelector("#image").files[0];

  const newLibrary = new Library(subject, imageFile);
  createLibraryCard(newLibrary);

  closeModal(createLibraryModal);
});

function closeModal(modal) {
  if (modal) {
    modal.style.display = "none";
    if (modal === createLibraryModal || modal === createBookModal) {
      createLibraryForm.reset();
      createBookForm.reset();
    }
  }
}

closeControls.forEach((closeControl) => {
  closeControl.addEventListener("click", () => {
    const modal = closeControl.closest("div");
    closeModal(modal);
  });
});

function openCreateLibraryModal() {
  createLibraryModal.style.display = "block";
}

function openLibraryModal(library) {
  libraryModalSubject.textContent = library.subject;
  clearBookList();

  library.books.forEach((book) => {
    createNewBookRow(book);
  });

  libraryModal.style.display = "block";
}

function clearBookList() {
  while (bookList.firstChild) {
    bookList.removeChild(bookList.firstChild);
  }
}

function createNewBookRow(book) {
  const newRow = document.createElement("tr");

  const trashCell = createTrashCell();
  const titleCell = createTitleCell(book.title);
  const authorCell = createAuthorCell(book.author);
  const yearCell = createYearCell(book.year);
  const readCell = createReadCell();
  const ratingCell = createRatingCell();

  newRow.appendChild(trashCell);
  newRow.appendChild(titleCell);
  newRow.appendChild(authorCell);
  newRow.appendChild(yearCell);
  newRow.appendChild(readCell);
  newRow.appendChild(ratingCell);

  bookList.appendChild(newRow);
}

function createTrashCell() {
  const trashCell = document.createElement("td");
  const trashIcon = createTrashIcon();
  trashCell.appendChild(trashIcon);
  return trashCell;
}

function createTrashIcon() {
  const trashIcon = document.createElement("img");
  trashIcon.classList.add("trash-icon");
  trashIcon.src = "../images/closed-bin.png";
  trashIcon.alt = "Closed trash bin";

  const closedTrashSrc = trashIcon.src;
  const openTrashSrc = "../images/open-bin.png";

  trashIcon.addEventListener("mouseenter", function () {
    this.src = openTrashSrc;
  });

  trashIcon.addEventListener("mouseleave", function () {
    this.src = closedTrashSrc;
  });

  trashIcon.addEventListener("click", function () {
    const bookRow = trashIcon.closest("tr");
    removeBook(bookRow);
  });

  return trashIcon;
}

function removeBook(bookRow) {
  if (bookRow) {
    bookRow.remove();
  }
}

function createTitleCell(title) {
  const titleCell = document.createElement("td");
  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.classList.add("title-input");
  titleInput.value = title;
  titleCell.appendChild(titleInput);
  return titleCell;
}

function createAuthorCell(author) {
  const authorCell = document.createElement("td");
  const authorInput = document.createElement("input");
  authorInput.type = "text";
  authorInput.classList.add("author-input");
  authorInput.value = author;
  authorCell.appendChild(authorInput);
  return authorCell;
}

function createYearCell(year) {
  const yearCell = document.createElement("td");
  const yearInput = document.createElement("input");
  yearInput.type = "number";
  yearInput.classList.add("year-input");
  yearInput.value = year;
  yearCell.appendChild(yearInput);
  return yearCell;
}

function createReadCell() {
  const readCell = document.createElement("td");
  const readLabel = document.createElement("label");
  readLabel.classList.add("switch");
  const readInput = document.createElement("input");
  readInput.type = "checkbox";
  const readSlider = document.createElement("span");
  readSlider.classList.add("slider");
  readLabel.appendChild(readInput);
  readLabel.appendChild(readSlider);
  readCell.appendChild(readLabel);
  return readCell;
}

function createRatingCell() {
  const ratingCell = document.createElement("td");
  const ratingContainer = createStarRating();
  ratingCell.appendChild(ratingContainer);
  return ratingCell;
}

function createStarRating() {
  const ratingContainer = document.createElement("div");
  ratingContainer.classList.add("star-rating");
  const stars = [];

  for (let i = 0; i < 5; i++) {
    const star = document.createElement("span");
    star.classList.add("star");
    const starSymbol = document.createTextNode("\u2605");
    star.appendChild(starSymbol);
    ratingContainer.appendChild(star);
    stars.push(star);
  }

  addStarRatingEventListeners(ratingContainer, stars);
  return ratingContainer;
}

function addStarRatingEventListeners(ratingContainer, stars) {
  let clickedStarIndex = -1;

  function handleStarHover(event) {
    const hoveredStar = event.target;
    const starIndex = Array.from(stars).indexOf(hoveredStar);

    stars.forEach((star) => {
      star.style.color = "#c0c0c0";
    });

    for (let i = 0; i <= starIndex; i++) {
      stars[i].style.color = "rgb(255, 146, 4)";
    }

    if (clickedStarIndex !== -1) {
      for (let i = 0; i <= clickedStarIndex; i++) {
        stars[i].style.color = "rgb(255, 146, 4)";
      }
    }
  }

  function setStarRating(event) {
    const clickedStar = event.target;
    clickedStarIndex = Array.from(stars).indexOf(clickedStar);

    for (let i = 0; i <= clickedStarIndex; i++) {
      stars[i].style.color = "rgb(255, 146, 4)";
    }
  }

  stars.forEach((star) => {
    star.addEventListener("mouseover", handleStarHover);
    star.addEventListener("click", setStarRating);
  });

  ratingContainer.addEventListener("mouseleave", function () {
    stars.forEach((star, index) => {
      if (index > clickedStarIndex) star.style.color = "#c0c0c0";
    });
  });
}

addBookBtn.addEventListener("click", () => {
  const newRow = createNewBookRow();
  bookTableBody.appendChild(newRow);
});
