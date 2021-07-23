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

let newBtn = document.getElementById('newBookBtn');
newBtn.onclick = function() {
  let overlay = document.getElementById('overlay');
  overlay.style.display = 'grid';
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
function OnCancel() {
  document.getElementById('overlay').style.display = 'none';
}
buildLibraryUI();
function buildLibraryUI() {
  let localBooks = [];
  let keyArray = Object.keys(localStorage);
  console.log(keyArray);
  for (let i = 0; i < keyArray.length; i++) {
    if (
      keyArray[i] !== 'editorLastConnected' &&
      keyArray[i] !== 'editorHasEmittedBundle'
    ) {
      localBooks.push(JSON.parse(localStorage.getItem(keyArray[i])));
    }
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
  let imgSrc = document.createElement('img');
  imgSrc.setAttribute('class', 'coverImage');
  let baseurl = 'https://source.boringavatars.com/bauhaus/150/';
  let trailurl = '?colors=B9D3B0,81BDA4,B28774,F88F79,F6AA93';
  imgSrc.src = baseurl + bookName + trailurl;
  let paraName = document.createElement('p');
  paraName.innerHTML = bookName;
  paraName.setAttribute('class', 'BookName');
  let paraAuth = document.createElement('p');
  paraAuth.innerHTML = bookAuth;
  paraAuth.setAttribute('class', 'Author');
  let paraISBN = document.createElement('p');
  paraISBN.innerHTML = bookISBN;
  paraISBN.setAttribute('class', 'ISBN');
  let organizeElem = document.createElement('div');
  organizeElem.setAttribute('class', 'organizeElem');
  let delBtn = document.createElement('button');
  delBtn.setAttribute('class', 'deleteBook');
  delBtn.setAttribute('onclick', 'deleteBook(this)');
  delBtn.innerText = 'Delete';
  organizeElem.appendChild(delBtn);
  let statusContainer = document.createElement('div');
  statusContainer.setAttribute('class', 'statusCntnr');
  let status = document.createElement('input');
  status.setAttribute('type', 'checkbox');
  status.setAttribute('name', 'statusChk');
  status.setAttribute('onclick', 'flipStatus(this)');
  status.setAttribute('class', 'status');
  let statusLabel = document.createElement('label');
  statusLabel.setAttribute('for', 'statusChk');
  statusLabel.setAttribute('class', 'statusChk');
  if (readstatus === true) {
    status.checked = true;
    statusLabel.innerText = 'Mark as unread';
  } else {
    statusLabel.innerText = 'Mark as read';
  }
  statusContainer.appendChild(status);
  statusContainer.appendChild(statusLabel);
  bookDiv.appendChild(imgSrc);
  bookDiv.appendChild(paraName);
  bookDiv.appendChild(paraAuth);
  bookDiv.appendChild(paraISBN);
  organizeElem.appendChild(statusContainer);
  bookDiv.appendChild(organizeElem);
  bookUI.appendChild(bookDiv);
}

function deleteBook(buttonObj) {
  let parentObj = buttonObj.parentNode.parentNode;
  let bookNameElem = parentObj.querySelector('.BookName');
  console.log(bookNameElem.innerText);
  localStorage.removeItem(bookNameElem.innerText);
  console.log(localStorage);
  parentObj.remove();
}

function flipStatus(chkBoxObj) {
  let statusLabel = chkBoxObj.parentNode.querySelector('label');
  let parentObj = chkBoxObj.parentNode.parentNode.parentNode;
  let bookNameElem = parentObj.querySelector('.BookName');
  console.log(bookNameElem.innerText);
  let localBook = JSON.parse(localStorage.getItem(bookNameElem.innerText));
  if (localBook.status === true) {
    localBook.status = false;
    statusLabel.innerText = 'Mark as read';
  } else {
    localBook.status = true;
    statusLabel.innerText = 'Mark as unread';
  }
  localStorage.removeItem(bookNameElem.innerText);
  localStorage.setItem(bookNameElem.innerText, JSON.stringify(localBook));
  console.log(localStorage);
}
