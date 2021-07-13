let myLibrary = [];
function Book(name, author, ISBN) {
  // constructor
  this.name = name;
  this.author = author;
  this.isbn = ISBN;
}
function addBookToLibrary(name, author, ISBN) {
  //create the Book using constructor
  let newBook = new Book(name, author, ISBN);
  //add the book to the array
  let len = myLibrary.push(newBook);
  return len;
}

addBookToLibrary('Atomic Habits', 'James Clear', 'ISBN1234');
addBookToLibrary('Sapiens', 'Yuval Noah Harari', 'ISBN6871');
addBookToLibrary('The Art of War', 'Sun Tzu', 'ISBN9912');
addBookToLibrary('The War of Art', 'Steven Pressfield', 'ISBN2191');
console.log(myLibrary);
let newBtn = document.getElementById('newBookBtn');
newBtn.onclick = function() {
  let overlay = document.getElementById('overlay');
  overlay.style.display = 'block';
};
function OnSubmit() {
  let bookName = document.getElementById('newBookName').value;
  let bookAuth = document.getElementById('newBookAuthor').value;
  let bookISBN = document.getElementById('newBookISBN').value;
  let idx = addBookToLibrary(bookName, bookAuth, bookISBN);
  document.getElementById('overlay').style.display = 'none';
  console.log(myLibrary);
  addCard(bookName, bookAuth, bookISBN, idx - 1);
}
buildLibraryUI();
function buildLibraryUI() {
  myLibrary.forEach(function(element, i) {
    console.log(element.name);
    addCard(element.name, element.author, element.isbn, i);
  });
}
function addCard(bookName, bookAuth, bookISBN, idx) {
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
  let statusLabel = document.createElement('label');
  statusLabel.setAttribute('for', 'statusChk');
  statusLabel.innerText = 'Mark as read';
  bookDiv.appendChild(paraName);
  bookDiv.appendChild(paraAuth);
  bookDiv.appendChild(paraISBN);
  bookDiv.appendChild(delBtn);
  bookDiv.appendChild(status);
  bookDiv.appendChild(statusLabel);
  bookUI.appendChild(bookDiv);
}

function deleteBook(buttonObj) {
  console.log(buttonObj);
  console.log(buttonObj.parentNode.getAttribute('data-index'));
  myLibrary.splice(buttonObj.parentNode.getAttribute('data-index'), 1);
  buttonObj.parentNode.remove();
}
