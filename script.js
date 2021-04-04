const library = document.querySelector('.books');
const books = library.querySelectorAll('.book');

let myLibrary = ['the hobbit', 'YDKJS', 'The principles of OOP'];

function Book() {
  // the constructor...
}

function addBookToLibrary(book) {
  // do stuff here
return myLibrary.push(book)
}

function displayBooks() {
  return myLibrary.forEach(book => {
    const newBook = document.createElement('div');
    newBook.classList.add('book');
    newBook.textContent = book;
    library.appendChild(newBook);
  });
}

displayBooks();