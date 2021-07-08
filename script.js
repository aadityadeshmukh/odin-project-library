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
addBookToLibrary('the War of Art', 'Steven Pressfield', 'ISBN2191');
console.log(myLibrary);
buildLibraryUI();
function buildLibraryUI() {
  myLibrary.forEach(element => {
    console.log(element.name);
    let booklist = document.getElementById('BookList');
    let bookDiv = document.createElement('div');
    bookDiv.setAttribute('class', 'Book');
    booklist.appendChild(bookDiv);
  });
}
