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
function addBookToLibrary(name, author, ISBN, status) {
  //create the Book using constructor
  let newBook = new Book(name, author, ISBN, status);
  //add the book to the array
  let len = myLibrary.push(newBook);
  localStorage.setItem(name, JSON.stringify(newBook));
  return len;
}

addBookToLibrary('Atomic Habits', 'James Clear', 'ISBN1234', true);
addBookToLibrary('Sapiens', 'Yuval Noah Harari', 'ISBN6871', true);
addBookToLibrary('The Art of War', 'Sun Tzu', 'ISBN9912', true);
addBookToLibrary('The War of Art', 'Steven Pressfield', 'ISBN2191', true);
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
  let idx = addBookToLibrary(bookName, bookAuth, bookISBN, status);
  document.getElementById('overlay').style.display = 'none';
  addCard(bookName, bookAuth, bookISBN, idx - 1, status);
}
buildLibraryUI();
function buildLibraryUI() {
  let localBooks = [];
  let keyArray = Object.keys(localStorage);
  console.log(keyArray);
  for (let i = 0; i < keyArray.length; i++) {
    if (keyArray[i] !== 'editorLastConnected')
      localBooks.push(JSON.parse(localStorage.getItem(keyArray[i])));
  }
  console.log(localBooks);
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
  // myLibrary.splice(buttonObj.parentNode.getAttribute('data-index'), 1);
  // let bookName = buttonObj.parentNode.querySelector('BookName');
  let parentObj = buttonObj.parentNode;
  let bookNameElem = parentObj.querySelector('.BookName');
  console.log(bookNameElem.innerText);
  localStorage.removeItem(bookNameElem.innerText);
  console.log(localStorage);
  buttonObj.parentNode.remove();
}

function flipStatus(chkBoxObj) {
  let dataObj = myLibrary[chkBoxObj.parentNode.getAttribute('data-index')];
  dataObj.changeStatus();
}
