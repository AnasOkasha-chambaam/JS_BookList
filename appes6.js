class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  constructor() { }
  addBookToUI(book) {
    const list = document.getElementById('book-list');
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <th>${book.title}</th>
      <th>${book.author}</th>
      <th>${book.isbn}</th>
      <th><a href="#" class="delete">X</a></th>
      `;
    list.appendChild(tr);
  }
  clearInputs(title, author, isbn) {
    // title = 'ss';
    // author = '';
    // isbn = '';
    // console.log(title);
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }
  alertMessage(message, className) {
    const divL = document.querySelector('.alert');
    divL.className = `alert ${className}`;
    divL.appendChild(document.createTextNode(message));
    // const div = document.createElement('div');
    // div.className = `alert ${className}`;
    // div.appendChild(document.createTextNode(message))
    // const cont = document.querySelector('.container');
    // const form = document.querySelector('#book-form');
    // cont.insertBefore(div, form);
    setTimeout(function () {
      document.querySelector('.alert').className = 'alert';
      document.querySelector('.alert').textContent = '|';
    }, 3000);
  }
  deleteBook(e) {
    console.log(e.target);
    e.target.parentElement.parentElement.remove();
    e.preventDefault();
  }
}

class Store {
  static getBooks () {
    let books;
    if (localStorage.getItem('books') === null){
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }
  static addBooks (book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books))
  }
  static viewBooksLS () {
    const ui = new UI();
    const books = Store.getBooks();
    books.forEach(function(book){
      ui.addBookToUI(book);
    })
  }
  static removeBook (isbn){
    const books = Store.getBooks();
    books.forEach(function(book, index){
      if (book.isbn == isbn){

      books.splice(index, 1);
      }
    })
  localStorage.setItem('books', JSON.stringify(books))
  }
}

document.addEventListener('DOMContentLoaded', Store.viewBooksLS)



const form = document.getElementById('book-form');
form.addEventListener('submit', function(e){
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;
  const book = new Book(title, author, isbn);

  const ui = new UI();
  if (title == '' || author == '' || isbn == '') {
    // alert('إملى الفراغات يبني الأول متتعبنيش معاك');
    ui.alertMessage('| Insert values in inputs first!. |', 'error');
  } else {
    
    ui.addBookToUI(book);
    ui.clearInputs(title, author, isbn);
    Store.addBooks(book);
    ui.alertMessage('| Book Added. |', 'success');


        
  console.log(book);
  }
  e.preventDefault();
})

const table = document.querySelector('#book-list');
table.addEventListener('click',function(e){
  if(e.target.classList.contains('delete')){
    const ui = new UI();
    ui.deleteBook(e);
    ui.alertMessage('| Book removed. |', 'success');
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent)
  }else {
    console.log(false);
  }
})
