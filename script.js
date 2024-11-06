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
const deleteBtn = tableHeaders.insertCell();
deleteBtn.textContent = "remove book";

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


function displayBooksInLibrary(library){
    for(let book of library){
        console.log(`Author: ${book.author} Title: ${book.title} Released Year:
            (${book.releaseYear}) with ${book.pages} pages`)
    }
}
function addBookToLibrary(book) {
    myLibrary.push(book);
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

function removeBookFromLibrary(index){
    myLibrary.splice(index, 1);
    displayBook(myLibrary); //refresh book libray after deletion
}
function displayBook(library){
    // table.innerHTML = '';
    // table.appendChild(tableHeaders);
    library.forEach((book, index)=> {
        const readButton = document.createElement("button");
        readButton.classList.add('readBtn');
        readButton.textContent = book.hasReaded;

        const deleteBook = document.createElement("button");
        deleteBook.classList.add("deleteBtn");
        deleteBook.textContent = "delete";
        deleteBook.style.color = 'red';

        deleteBook.addEventListener('click', ()=> {
            removeBookFromLibrary(index); //remove book from library
        })
    } 
);

        const bookRow = table.insertRow();
        bookRow.classList.add("book-row");
        bookRow.insertCell(0).textContent = book.author;
        bookRow.insertCell(1).textContent = book.title;
        bookRow.insertCell(2).textContent = book.releaseYear;
        bookRow.insertCell(3).textContent = book.pages;
        bookRow.insertCell(4).appendChild(readButton);
        bookRow.insertCell(5).appendChild(deleteBook);
}
//adding new book to library
function insertNewRow(author, title, releaseYear, pages, hasreaded){
    const newReadBtn = document.createElement("button");
    const newDeleteBtn = document.createElement("button");
    
    newDeleteBtn.classList.add('deleteBtn');
    newDeleteBtn.style.color = "red"
    newDeleteBtn.textContent = "Delete"
    newReadBtn.classList.add('readBtn');
    newReadBtn.textContent = hasreaded;
    const newRow = table.insertRow(-1);
    newRow.insertCell(0).textContent = author;
    newRow.insertCell(1).textContent = title;
    newRow.insertCell(2).textContent = releaseYear;
    newRow.insertCell(3).textContent = pages;
    newRow.insertCell(4).appendChild(newReadBtn);
    newRow.insertCell(5).appendChild(newDeleteBtn);

    newReadBtn.addEventListener("click", ()=> {
        newReadBtn.textContent = newReadBtn.textContent === "No"? "Yes" : "No"
    })
    newDeleteBtn.addEventListener("click", ()=> {
        newRow.remove();
    })
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
    const authorValue = bookForm.elements['author'].value.trim();
    const titleValue = bookForm.elements['title'].value.trim();
    const yearValue = bookForm.elements['year'].value.trim();
    const pagesValue = bookForm.elements['pages'].value.trim();
    const hasreadedValue = bookForm.elements['hasReaded'].value;
    //empty form validation
    if (!authorValue ||
        !titleValue ||
        !yearValue ||
        !pagesValue){
            if (!document.querySelector('#alertMsg')){
                const alertMsg = document.createElement('p');
                alertMsg.id = 'alertMsg'
                alertMsg.textContent = 'please fill all form'
                alertMsg.style.color = 'red';
                bookForm.appendChild(alertMsg);

            }
        }else{
            const existingAlert = document.querySelector('#alertMsg');
            if (existingAlert){
                existingAlert.remove()
            }

            const newBook = Book(authorValue, titleValue, yearValue, pagesValue, hasreadedValue);
            addBookToLibrary(newBook);
            insertNewRow(authorValue, titleValue, yearValue, pagesValue, hasreadedValue);
            console.log(newBook);
            dialogAdd.close();
            bookForm.reset();
        }
})

cancelBtn.addEventListener('click', () => {
    dialogAdd.close()
})

//initial adding eventlistner
displayBook(myLibrary)
const readBtns = document.querySelectorAll(".readBtn");
const deleteBtns = document.querySelectorAll(".deleteBtn");
for (let btn of readBtns){
    btn.addEventListener("click", () => {
        btn.textContent = btn.textContent === "No"? "Yes" : "No"
    })
}
