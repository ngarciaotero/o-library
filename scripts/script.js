const createLibraryBtn = document.querySelector(".create-library-btn");
const createLibraryModal = document.querySelector(".create-library-modal");
const closeControls = document.querySelectorAll(".close");
const createLibraryForm = document.querySelector(".create-library-form");
const librariesContainer = document.querySelector(".libraries-container");
const libraryModal = document.querySelector(".library-modal");
const libraryModalSubject = document.querySelector(".library-subject");
const addBookBtn = document.querySelector(".library-modal button");
const bookTableBody = document.querySelector(".library-modal table tbody");
const bookList = document.querySelector(".bookList");

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

  const cardImage = document.createElement("img");
  if (library.imageFile instanceof File) {
    cardImage.src = URL.createObjectURL(library.imageFile);
  } else if (typeof library.imageFile === "string") {
    if (library.imageFile.startsWith("data:")) {
      cardImage.src = library.imageFile;
    } else {
      cardImage.src = library.imageFile;
    }
  } else {
    cardImage.src = "placeholder.png";
  }
  libraryCard.appendChild(cardImage);

  const cardSubject = document.createElement("p");
  cardSubject.textContent = library.subject;
  libraryCard.appendChild(cardSubject);

  librariesContainer.appendChild(libraryCard);

  libraryCard.addEventListener("click", () => {
    libraryModalSubject.textContent = library.subject;
    openModal(libraryModal);
  });
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
    // createNewBookRow(newLibrary);
  });
}

window.addEventListener("load", createDefaultCards);

createLibraryBtn.addEventListener("click", () => {
  openModal(createLibraryModal);
});

createLibraryForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const subject = createLibraryForm.querySelector("#subject").value;
  const imageFile = createLibraryForm.querySelector("#image").files[0];

  const newLibrary = new Library(subject, imageFile);
  createLibraryCard(newLibrary);

  createLibraryForm.reset();
  createLibraryModal.style.display = "none";
});

function closeModal(modal) {
  if (modal) {
    modal.style.display = "none";
    if (modal === createLibraryModal) {
      createLibraryForm.reset();
    }
  }
}

closeControls.forEach((closeControl) => {
  closeControl.addEventListener("click", () => {
    closeModal(libraryModal);
    closeModal(createLibraryModal);
  });
});

function openModal(modal) {
  if (modal) {
    modal.style.display = "block";
  }
}

function createNewBookRow(book) {
  const newRow = document.createElement("tr");

  const trashCell = createTrashCell();
  const titleCell = createTitleCell(book.title);

  const authorCell = document.createElement("td");
  const authorInput = document.createElement("input");
  authorInput.type = "text";
  authorInput.classList.add("author-input");
  authorCell.appendChild(authorInput);

  const yearCell = document.createElement("td");
  const yearInput = document.createElement("input");
  yearInput.type = "number";
  yearInput.classList.add("year-input");
  yearCell.appendChild(yearInput);

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

  const ratingCell = document.createElement("td");
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

  ratingCell.appendChild(ratingContainer);

  newRow.appendChild(trashCell);
  newRow.appendChild(titleCell);
  newRow.appendChild(authorCell);
  newRow.appendChild(yearCell);
  newRow.appendChild(readCell);
  newRow.appendChild(ratingCell);

  const closedTrashSrc = trashIcon.src;
  const openTrashSrc = "../images/open-bin.png";

  trashIcon.addEventListener("mouseenter", function () {
    this.src = openTrashSrc;
  });

  trashIcon.addEventListener("mouseleave", function () {
    this.src = closedTrashSrc;
  });

  const starsContainer = ratingContainer;
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

  starsContainer.addEventListener("mouseleave", function () {
    stars.forEach((star, index) => {
      if (index > clickedStarIndex) star.style.color = "#c0c0c0";
    });
  });

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

  return trashIcon;
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

addBookBtn.addEventListener("click", () => {
  const newRow = createNewBookRow();
  bookTableBody.appendChild(newRow);
});
