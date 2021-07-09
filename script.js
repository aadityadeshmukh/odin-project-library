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
  myLibrary.push(newBook);
}

addBookToLibrary('Atomic Habits', 'James Clear', 'ISBN1234');
addBookToLibrary('Sapiens', 'Yuval Noah Harari', 'ISBN6871');
addBookToLibrary('The Art of War', 'Sun Tzu', 'ISBN9912');
addBookToLibrary('The War of Art', 'Steven Pressfield', 'ISBN2191');
console.log(myLibrary);
buildLibraryUI();
function buildLibraryUI() {
  myLibrary.forEach(element => {
    console.log(element.name);
    let bookUI = document.getElementById('BookUI');
    let bookDiv = document.createElement('div');
    bookDiv.setAttribute('class', 'Book');
    let paraName = document.createElement('p');
    paraName.innerHTML = element.name;
    paraName.setAttribute('class', 'BookName');
    let paraAuth = document.createElement('p');
    paraAuth.innerHTML = element.author;
    paraAuth.setAttribute('class', 'Author');
    let paraISBN = document.createElement('p');
    paraISBN.innerHTML = element.isbn;
    paraISBN.setAttribute('class', 'ISBN');
    bookDiv.appendChild(paraName);
    bookDiv.appendChild(paraAuth);
    bookDiv.appendChild(paraISBN);
    bookUI.appendChild(bookDiv);
  });
}

let newBtn = document.getElementById('newBookBtn');
newBtn.onclick = function() {
  let overlay = document.getElementById('overlay');
  overlay.style.display = 'block';
};
function OnSubmit() {
  let bookName = document.getElementById('newBookName').textContent;
  let bookAuth = document.getElementById('newBookAuth').textContent;
  let bookISBN = document.getElementById('newBookISBN').textContent;
  addBookToLibrary(bookName, bookAuth, bookISBN);
  document.getElementById('overlay').style.display = 'none';
}
