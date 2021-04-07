const library = document.querySelector('.books');
const info = document.querySelector('.info');
let books;
let isDown = false;
let startX;
let scrollLeft;

let myLibrary = [{title:'the hobbit', author: 'Tolkien', pages: 300, read: 'Not read yet'}, {title:'YDKJS', author: 'Kyle Simpson', pages: 200, read: 'Read'}, {title:'Principles of OOP in JS', author: 'Zakas', pages: 250, read: 'Read'}];


var Book = {
  init: function(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  }  
};


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
}

function handleRead(idx) {
  let btn = document.querySelector(`button[data-btn="${idx}"]`)
  console.log(this, idx, btn, myLibrary[idx].read);
  myLibrary[idx].read = myLibrary[idx].read === 'Read' ? 'Not read yet' : 'Read'
  return btn.textContent = myLibrary[idx].read
  }

  function removeBook(idx) {
    let book = document.querySelector(`div[data-idx="${idx}"]`);
    console.log(idx, book)
    myLibrary.splice(idx, 1)
    console.log(myLibrary, )
    library.removeChild(book);
  } 

function displayBooks() {
   myLibrary.forEach(book => {
    const newBook = document.createElement('div');
    newBook.classList.add('book');
    newBook.setAttribute('data-idx', myLibrary.indexOf(book));
    library.appendChild(newBook);
    newBook.innerHTML = `
    <h2 class='display'>${book.title}</h2>
    <button onClick="handleRead(${newBook.dataset.idx})" class='display' data-btn=${newBook.dataset.idx}  type='button'>${book.read}</button>
    <button onClick="removeBook(${newBook.dataset.idx})" class='display' data-delete=${newBook.dataset.idx}  type='button'>Remove</button>
    `
  });
  books = library.querySelectorAll('.book');
  books.forEach(book => book.addEventListener('click', displayInfo));
}

displayBooks();

function displayInfo(e) {
  let idx = this.dataset.idx;
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
  let book = Object.create(Book)
  //Book.call(obj,title, author, pages, read)
  book.init(title, author, pages, read)
  addBookToLibrary(book);
  this.reset();
})

library.addEventListener('mousedown', (e) => {
  isDown = true;
  startX = e.pageX - library.scrollLeft;
  console.log(startX, library.scrollLeft)
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
  console.log(isDown);
  let x = e.pageX - scrollLeft;
  let walk = x - startX
  library.scrollLeft =  scrollLeft - walk
  console.log(x, walk) 
})

