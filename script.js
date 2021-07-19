let myLibrary = [];
function Book(name, author, ISBN, status) {
  // constructor
  this.name = name;
  this.author = author;
  this.isbn = ISBN;
  this.status = status;
}

Book.prototype.changeStatus = function() {
  if (this.status === true) this.status = false;
  else this.status = true;
};
function addBookToLibrary(name, author, ISBN, status, isNewBook = 1) {
  //create the Book using constructor
  let newBook = new Book(name, author, ISBN, status);
  //add the book to the array
  let len = myLibrary.push(newBook);
  console.log(isNewBook);
  if (isNewBook === 1) {
    // localStorage.removeItem('BookList');
    console.log('New Book');
    localStorage.setItem('BookList', JSON.stringify(myLibrary));
  }
  console.log(localStorage.getItem('BookList'));
  return len;
}

addBookToLibrary('Atomic Habits', 'James Clear', 'ISBN1234', true, 0);
addBookToLibrary('Sapiens', 'Yuval Noah Harari', 'ISBN6871', true, 0);
addBookToLibrary('The Art of War', 'Sun Tzu', 'ISBN9912', true, 0);
addBookToLibrary('The War of Art', 'Steven Pressfield', 'ISBN2191', true, 0);
let newBtn = document.getElementById('newBookBtn');
newBtn.onclick = function() {
  let overlay = document.getElementById('overlay');
  overlay.style.display = 'block';
};
function OnSubmit() {
  let bookName = document.getElementById('newBookName').value;
  let bookAuth = document.getElementById('newBookAuthor').value;
  let bookISBN = document.getElementById('newBookISBN').value;
  let status = document.getElementById('newBookStatus').checked;
  let idx = addBookToLibrary(bookName, bookAuth, bookISBN, status, 1);
  document.getElementById('overlay').style.display = 'none';
  addCard(bookName, bookAuth, bookISBN, idx - 1, status);
}
buildLibraryUI();
function buildLibraryUI() {
  let localBooks = JSON.parse(localStorage.getItem('BookList'));
  console.log(localStorage.getItem('BookList'));
  localBooks.forEach(function(element, i) {
    addCard(element.name, element.author, element.isbn, i, element.status);
  });
}
function addCard(bookName, bookAuth, bookISBN, idx, readstatus) {
  let bookUI = document.getElementById('BookUI');
  let bookDiv = document.createElement('div');
  bookDiv.setAttribute('class', 'Book');
  bookDiv.setAttribute('data-index', idx);
  let paraName = document.createElement('p');
  paraName.innerHTML = bookName;
  paraName.setAttribute('class', 'BookName');
  let paraAuth = document.createElement('p');
  paraAuth.innerHTML = bookAuth;
  paraAuth.setAttribute('class', 'Author');
  let paraISBN = document.createElement('p');
  paraISBN.innerHTML = bookISBN;
  paraISBN.setAttribute('class', 'ISBN');
  let delBtn = document.createElement('button');
  delBtn.setAttribute('class', 'deleteBook');
  delBtn.setAttribute('onclick', 'deleteBook(this)');
  delBtn.innerText = 'Delete';
  let status = document.createElement('input');
  status.setAttribute('type', 'checkbox');
  status.setAttribute('name', 'statusChk');
  status.setAttribute('onclick', 'flipStatus(this)');
  let statusLabel = document.createElement('label');
  statusLabel.setAttribute('for', 'statusChk');
  if (readstatus === true) {
    status.checked = true;
    statusLabel.innerText = 'Mark as unread';
  } else {
    statusLabel.innerText = 'Mark as read';
  }
  bookDiv.appendChild(paraName);
  bookDiv.appendChild(paraAuth);
  bookDiv.appendChild(paraISBN);
  bookDiv.appendChild(delBtn);
  bookDiv.appendChild(status);
  bookDiv.appendChild(statusLabel);
  bookUI.appendChild(bookDiv);
}

function deleteBook(buttonObj) {
  myLibrary.splice(buttonObj.parentNode.getAttribute('data-index'), 1);
  buttonObj.parentNode.remove();
}

function flipStatus(chkBoxObj) {
  let dataObj = myLibrary[chkBoxObj.parentNode.getAttribute('data-index')];
  dataObj.changeStatus();
}
