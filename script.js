const library = document.querySelector('.books');
const books = library.querySelectorAll('.book');

let myLibrary = ['the hobbit', 'YDKJS', 'The principles of OOP'];

function Book(title, author, pages, read) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(book) {
  // do stuff here
myLibrary.push(book)
const newBook = document.createElement('div');
newBook.classList.add('book');
newBook.textContent = book.title;
library.appendChild(newBook);
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

document.newBook.addEventListener('submit', function(e) {
  e.preventDefault();
  const title = this.title.value;
  const author = this.author.value;
  const pages = this.pages.value;
  const read = this.read.checked ? 'Read' : 'Not read yet'
  console.log(title, author, pages, read);
  let obj = new Book(title, author, pages, read);
  console.log(obj);
  addBookToLibrary(obj);
  this.reset();
})