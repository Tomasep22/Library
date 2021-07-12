const library = document.querySelector('.books');
const info = document.querySelector('.info');

let books;
let isDown = false;
let startX;
let scrollLeft;

let myLibrary = JSON.parse(localStorage.getItem('items')) || [];

class Book {
  constructor(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  }
}

/*var Book = {
  init: function(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  }  
};*/


function addBookToLibrary(book) {
  // do stuff here
myLibrary.push(book)
const newBook = document.createElement('div');
newBook.classList.add('book');
newBook.setAttribute('data-idx', myLibrary.indexOf(book));
newBook.textContent = book.title;
library.appendChild(newBook);
books = library.querySelectorAll('.book');
books.forEach(book => book.addEventListener('click', displayInfo));
displayBooks();
localStorage.setItem('items', JSON.stringify(myLibrary));
}

function handleRead(idx) {
  let btn = document.querySelector(`button[data-btn="${idx}"]`)
  myLibrary[idx].read = myLibrary[idx].read === 'Read' ? 'Not read yet' : 'Read'
  btn.textContent = myLibrary[idx].read === 'Read' ? '📖' : '📕'
  localStorage.setItem('items', JSON.stringify(myLibrary));
  }

  function removeBook(idx) {
    let book = document.querySelector(`div[data-idx="${idx}"]`);
    myLibrary.splice(idx, 1)
    library.removeChild(book);
    displayBooks();
    localStorage.setItem('items', JSON.stringify(myLibrary))
  } 

function displayBooks() {
  books = library.querySelectorAll('.book');
  books.forEach(book => {
    library.removeChild(book)
  })
   myLibrary.forEach(book => {
    const newBook = document.createElement('div');
    newBook.classList.add('book');
    newBook.setAttribute('data-idx', myLibrary.indexOf(book));
    library.appendChild(newBook);
    newBook.innerHTML = `
    <p class='bookTitle'>${book.title}</p>
    <button onClick="handleRead(${newBook.dataset.idx})" class='status' data-btn=${newBook.dataset.idx}  type='button'>${book.read == 'Read' ? '📖' : '📕'}</button>
    <button onClick="removeBook(${newBook.dataset.idx})" class='remove' data-delete=${newBook.dataset.idx}  type='button'>❌</button>
    `
  });
  books = library.querySelectorAll('.book');
  books.forEach(book => book.addEventListener('click', displayInfo));
}

displayBooks();

function displayInfo(e) {
  let idx = this.dataset.idx;
  info.classList.add('active');
  return info.innerHTML = `
  <p>Title: ${myLibrary[idx].title}</p>
  <p>Author: ${myLibrary[idx].author}</p>
  <p>Number of Pages: ${myLibrary[idx].pages}</p>
  <p>Status: ${myLibrary[idx].read}</p>
  `
}


document.newBook.addEventListener('submit', function(e) {
  e.preventDefault();
  const title = this.title.value;
  const author = this.author.value;
  const pages = this.pages.value;
  const read = this.read.checked ? 'Read' : 'Not read yet' 
  let book = new Book(title, author, pages, read)
  // book.init(title, author, pages, read)
  addBookToLibrary(book);
  this.reset();
})

library.addEventListener('mousedown', (e) => {
  isDown = true;
  startX = e.pageX - library.scrollLeft;
  scrollLeft = library.scrollLeft

})
library.addEventListener('mouseup', () => {
  isDown = false;
})
library.addEventListener('mouseleave', () => {
  isDown = false;
})
library.addEventListener('mousemove', (e) => {
  if(!isDown) return
  e.preventDefault()
  let x = e.pageX - scrollLeft;
  let walk = x - startX
  library.scrollLeft = scrollLeft - walk;
});


