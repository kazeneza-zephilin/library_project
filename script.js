const table = document.createElement('table');
table.classList.add('library-table');
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
document.body.appendChild(table);

table.appendChild(tableHeaders)

const myLibrary = [];

function Book(author, title, releaseYear, pages) {
    this.author = author;
    this.title = title;
    this.releaseYear = releaseYear;
    this.pages = pages;
    return {
        'author': this.author,
        'title':this.title,
        'releaseYear': this.releaseYear,
        'pages':this.pages,
    }
}
function addBookToLibrary(book) {
    myLibrary.push(book);
}
function displayBooksInLibrary(library){
    for(let book of library){
        console.log(`Author: ${book.author} Title: ${book.title} Released Year:(${book.releaseYear}) with ${book.pages} pages`)
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