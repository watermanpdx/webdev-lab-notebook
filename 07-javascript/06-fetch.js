const url = "https://anapioficeandfire.com/api/books/";

const app = document.querySelector("#books");
const loading = document.querySelector("#loading");

const buildBook = (bookData) => {
  // Destructure book info from json
  const { name, authors, released, numberOfPages } = bookData;

  // Create root book div
  const book = document.createElement("div");
  book.setAttribute("class", "book text-center");

  // Create title div
  const title = document.createElement("div");
  title.setAttribute("class", "fs-4");
  title.textContent = name;

  // Create author div
  const author = document.createElement("div");
  author.setAttribute("class", "mb-3");
  author.textContent = `by ${authors[0]}`; // Assume only one author/only display 1st author

  // Create publication year div
  const year = document.createElement("div");
  year.setAttribute("class", "mb-3");
  year.textContent = released.split("-")[0]; // Assume data always in format: YYYY-MM-DDTHH:MM:SS

  // Create page-length div
  const pages = document.createElement("div");
  pages.setAttribute("class", "mb-3");
  pages.textContent = `${numberOfPages} pages`;

  // Insert child elements and return
  book.append(title, author, year, pages);
  return book;
};

const fetchData = (url) => {
  // Fetch all books from the API of Ice and Fire and append them to the DOM
  // Create an element for each book that contains title, author, publication year, and number of pages
  // Update the styles in JavaScript to center all the books in the container given

  fetch(url)
    .then((response) => {
      // Check if valid response and then convert to json
      if (!response) {
        throw new Error(`Unexpected response: ${response.statusText}`);
      }
      return response.json();
    })
    .then((data) => {
      // Remove loading element
      loading.remove();

      // Parse book data and insert to dom
      for (bookData of data) {
        app.append(buildBook(bookData));
      }
    })
    .catch((error) => {
      // Handle errors/failures
      console.error(`Enexpected failure in fetch(${url}): ${error}`);
    });
};

// Call fetchData()
fetchData(url);
