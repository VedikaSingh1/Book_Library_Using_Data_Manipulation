const form = document.querySelector(".book-form");
const bookEntries = document.querySelector(".book-entries");
const bookLibrary = []; // Array to store book entries as objects

// Function to create a new book entry as an object
function createBookEntry(title, author, genre, year) {
  const bookEntry = {
    title: title,
    author: author,
    genre: genre,
    year: year,
  };
  bookLibrary.push(bookEntry); // Add the book entry to the array
  //console.log(bookLibrary);
  return bookEntry;
}

// Function to render book entries from the array
function renderBookEntries() {
  bookEntries.innerHTML = ""; // Clear the previous entries
  bookLibrary.forEach((book, index) => {
    const bookEntry = document.createElement("div");
    bookEntry.classList.add("book-entry");
    bookEntry.innerHTML = `
      <p>Title: ${book.title}</p>
      <p>Author: ${book.author}</p>
      <p>Genre: ${book.genre}</p>
      <p>Year: ${book.year}</p>
      <button class="delete-button" data-index="${index}">Delete</button>
    `;
    // Event listener for delete button
    const deleteButton = bookEntry.querySelector(".delete-button");
    deleteButton.addEventListener("click", (event) => {
      const indexToDelete = event.target.getAttribute("data-index");
      bookLibrary.splice(indexToDelete, 1); // Remove the book entry from the array
      renderBookEntries(); // Re-render the entries after deletion
    });

    bookEntries.appendChild(bookEntry);
  });
}

// Function to handle form submission
function handleFormSubmit(event) {
  event.preventDefault();
  const titleInput = document.getElementById("title");
  const authorInput = document.getElementById("author");
  const genreInput = document.getElementById("genre");
  const yearInput = document.getElementById("year");

  const title = titleInput.value;
  const author = authorInput.value;
  const genre = genreInput.value;
  const year = yearInput.value;

  if (title && author && genre && year) {
    const bookEntry = createBookEntry(title, author, genre, year);
    renderBookEntries(); // Re-render the entries after adding a new book

    // Clear form inputs
    titleInput.value = "";
    authorInput.value = "";
    genreInput.value = "";
    yearInput.value = "";
  } else {
    // Display a message to the user indicating that all fields are required
    alert("Please fill in all the fields to add a book entry.");
  }
}

// Add event listener to the Add Book button
const addBookButton = document.getElementById("addBook");
addBookButton.addEventListener("click", handleFormSubmit);

// FILTER BY GENRE
// Function to filter book entries by genre
function filterBookEntriesByGenre() {
  const filterGenreInput = document.getElementById("filterGenre");
  const filterGenre = filterGenreInput.value.toLowerCase();

  bookLibrary.forEach((book, index) => {
    const entryGenre = book.genre.toLowerCase();
    const bookEntry = bookEntries.children[index];
    bookEntry.style.display =
      entryGenre.includes(filterGenre) || filterGenre === "" ? "block" : "none";
  });
}

// Add event listener to the Filter button
const filterButton = document.getElementById("filter");
filterButton.addEventListener("click", filterBookEntriesByGenre);

// Prevent the form from submitting when pressing Enter in the filter input
const filterGenreInput = document.getElementById("filterGenre");
filterGenreInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
  }
});
