const table = document.querySelector(".my_table");
const tableHeaders = table.insertRow();
tableHeaders.classList.add('header-row', 'row');

const bookAuthor = tableHeaders.insertCell();
bookAuthor.textContent = 'Author';
const bookTitle = tableHeaders.insertCell();
bookTitle.textContent = "Title";
const bookReleaseYear = tableHeaders.insertCell();
bookReleaseYear.textContent = "Year";
const bookPages = tableHeaders.insertCell();
bookPages.textContent = "pages";
const readStatus = tableHeaders.insertCell();
readStatus.textContent = "readed";
document.body.appendChild(table);

table.appendChild(tableHeaders)

const myLibrary = [];

function Book(author, title, releaseYear, pages, hasreaded = "No") {
    this.author = author;
    this.title = title;
    this.releaseYear = releaseYear;
    this.pages = pages;
    this.hasreaded = hasreaded
    return {
        'author': this.author,
        'title':this.title,
        'releaseYear': this.releaseYear,
        'pages':this.pages,
        'hasReaded': this.hasreaded,
    }
}
function validateBook(book){
    let returnValue;
    if (book.author === '' ||
        book.title === '' ||
        book.releaseYear === '' ||
        book.pages === ''
    ){
        returnValue = false
    }else{
        returnValue = true
    }
    return returnValue;

}
function addBookToLibrary(book) {
    let returnValue;
    if (validateBook){
        myLibrary.push(book);
    }
    return
}

function displayBooksInLibrary(library){
    for(let book of library){
        console.log(`Author: ${book.author} Title: ${book.title} Released Year:
            (${book.releaseYear}) with ${book.pages} pages`)
    }
}
/*test*/
const book1 = Book('Leo Tolstoy', 'War and Peace','1869', '1,225');
const book2 = Book('George Orwell', '1984', '1949', '328');
const book3 = Book('J.R.R. Tolkien', 'The Lord of the Rings', '1954', '1,178');
const book4 = Book('Harper Lee', 'To Kill a Mockingbird', '1960', '281');
const book5 = Book('Gabriel García Márquez', 'One Hundred Years of Solitude', '1967', '417');
addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);
addBookToLibrary(book4);
addBookToLibrary(book5);
console.log(myLibrary);

function displayBook(library){
    for(let book of library){
        const readButton = document.createElement("button");
        readButton.classList.add('readBtn');
        readButton.textContent = book.hasReaded;
        const bookRow = table.insertRow();
        bookRow.classList.add("book-row");
        bookRow.insertCell(0).textContent = book.author;
        bookRow.insertCell(1).textContent = book.title;
        bookRow.insertCell(2).textContent = book.releaseYear;
        bookRow.insertCell(3).textContent = book.pages;
        bookRow.insertCell(4).appendChild(readButton)
    }
}
function insertNewRow(author, title, releaseYear, pages, hasreaded ){
    const newReadBtn = document.createElement("button");
    newReadBtn.classList.add('readBtn');
    newReadBtn.textContent = hasreaded;
    const newRow = table.insertRow(-1);
    newRow.insertCell(0).textContent = author;
    newRow.insertCell(1).textContent = title;
    newRow.insertCell(2).textContent = releaseYear;
    newRow.insertCell(3).textContent = pages;
    newRow.insertCell(4).appendChild(newReadBtn)
}


const showForm = document.querySelector(".show-form");
const dialogAdd = document.querySelector("#add-new-dialog");
const bookForm = document.querySelector("#book-form");
const select = dialogAdd.querySelector("select");
const  cancelBtn = document.querySelector("#cancel-btn");
const  submitBtn = dialogAdd.querySelector("#confirm-Btn");

showForm.addEventListener('click', () => {
    dialogAdd.showModal();
})

bookForm.addEventListener("submit", (event) => {
    event.preventDefault();

    //get data
    const authorValue = bookForm.elements['author'].value;
    const titleValue = bookForm.elements['title'].value;
    const yearValue = bookForm.elements['year'].value;
    const pagesValue = bookForm.elements['pages'].value;
    const hasreadedValue = bookForm.elements['hasReaded'].value;
    const newBook = Book(authorValue, titleValue, yearValue, pagesValue, hasreadedValue);

    addBookToLibrary(newBook);
    insertNewRow(authorValue, titleValue, yearValue, pagesValue, hasreadedValue);
    console.log(newBook);

    dialogAdd.close();
    bookForm.reset();
})

cancelBtn.addEventListener('click', () => {
    dialogAdd.close()
})

//keep it always down
displayBook(myLibrary)
const readBtns = document.querySelectorAll(".readBtn");
for (let btn of readBtns){
    btn.addEventListener("click", () => {
        btn.textContent === "No"? btn.textContent = "Yes":
        btn.textContent = "No"
    })
}