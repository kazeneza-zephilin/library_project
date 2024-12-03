//creating table UI
const table = document.querySelector(".my_table");
const tableHeaders = table.insertRow();
//adding table header
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

//adding table to body DOM elt
document.body.appendChild(table);
//adding first row (header) to table
table.appendChild(tableHeaders)


//factoring book constructor from function construtor to class
class Book {
    constructor(author, title, releaseYear, pages, hasReaded = "No"){
        //check if class called with new keyword
        if (!new.target){
            throw new Error("You must use `new` keyword");
        }
        this.author = author;
        this.title = title;
        this.releaseYear = releaseYear;
        this.pages = pages;
        this.hasReaded = hasReaded;

    }
    static myLibrary = [];
    //attaching function (methods) that works on book inside class

    static addBookToLibrary(book) {
        Book.myLibrary.push(book);
    }

    static removeBookFromLibrary(index){
        Book.myLibrary.splice(index, 1);
        Book.displayBook(Book.myLibrary); //refresh book libray after deletion
    }

    //rendering book on UI
    static displayBook(){
        table.innerHTML = ''; //cleaning dom
        table.appendChild(tableHeaders);
        Book.myLibrary.forEach((book, index)=> {
            //adding read button to row dynamically
            const readButton = document.createElement("button");
            readButton.classList.add('readBtn');
            readButton.textContent = book.hasReaded;

            //adding delete button to book row dynamically
            const deleteBook = document.createElement("button");
            deleteBook.classList.add("deleteBtn");
            deleteBook.textContent = "delete";
            deleteBook.style.color = 'red';

            //remove book from library
            deleteBook.addEventListener('click', ()=> {
                Book.removeBookFromLibrary(index); //remove book from library
            })
            //inserting new book row
            const bookRow = table.insertRow();
            bookRow.classList.add("book-row");
            bookRow.insertCell(0).textContent = book.author;
            bookRow.insertCell(1).textContent = book.title;
            bookRow.insertCell(2).textContent = book.releaseYear;
            bookRow.insertCell(3).textContent = book.pages;
            bookRow.insertCell(4).appendChild(readButton);
            bookRow.insertCell(5).appendChild(deleteBook);

            //toggle `has readed` property of book row
            readButton.addEventListener("click", () =>{
                this.hasReaded = this.hasReaded === "No" ? "Yes" : "No";
                readButton.textContent = this.hasReaded;
            })
        }
    );
    }


}

//creating book instances
const book1 = new Book('Leo Tolstoy', 'War and Peace','1869', '1,225');
const book2 = new Book('George Orwell', '1984', '1949', '328');
const book3 = new Book('J.R.R. Tolkien', 'The Lord of the Rings', '1954', '1,178');
const book4 = new Book('Harper Lee', 'To Kill a Mockingbird', '1960', '281');
const book5 = new Book('Gabriel García Márquez', 'One Hundred Years of Solitude', '1967', '417');

//populate sample books to library
Book.addBookToLibrary(book1);
Book.addBookToLibrary(book2);
Book.addBookToLibrary(book3);
Book.addBookToLibrary(book4);
Book.addBookToLibrary(book5);


//selecting dom element
const showForm = document.querySelector(".show-form");
const dialogAdd = document.querySelector("#add-new-dialog");
const bookForm = document.querySelector("#book-form");
const select = dialogAdd.querySelector("select");
const  cancelBtn = document.querySelector("#cancel-btn");
const  submitBtn = dialogAdd.querySelector("#confirm-Btn");


//get new book from form submission of new book

//displaying user input form dialog
showForm.addEventListener('click', () => {
    dialogAdd.showModal();
})

bookForm.addEventListener("submit", (event) => {
    event.preventDefault(); //avoiding page releod

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

            const newBook = new Book(authorValue, titleValue, yearValue, pagesValue, hasreadedValue);
            Book.addBookToLibrary(newBook);
            Book.displayBook(); // adding new book to the table
            dialogAdd.close();
            bookForm.reset();
        }
})

cancelBtn.addEventListener('click', () => {
    dialogAdd.close()
})

//displaying current books in library
Book.displayBook();``