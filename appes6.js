class Book{
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI{
    static addBookToList(book){
        const list = document.getElementById('book-list');
        // Create tr element
        const row = document.createElement('tr');
        // Insert cols
        row.innerHTML=`
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="delete">X</a></td>
        `
    
        list.appendChild(row);
    }

    static showAlert(message, className){
         // Create div
        const div = document.createElement('div');
        // Add classes
        div.className = `alert ${className}`;
        // Add text
        div.appendChild(document.createTextNode(message));
        // Get a parent
        const container = document.querySelector('.container');
        // Get a form
        const form = document.querySelector('#book-form');
        // Insert alert
        container.insertBefore(div, form);//In the container, insert div before form
        // Timeout after 3 sec
        setTimeout(()=>{
            document.querySelector('.alert').remove();
        },3000);
    }

    static deleteBook(target){
        if(target.className ==='delete'){
            target.parentElement.parentElement.remove();
        }
    }

    static clearFields(){
        document.getElementById('title').value = ' ';
        document.getElementById('author').value = ' ';
        document.getElementById('isbn').value = ' ';
    }

}

// Local Storage Class
class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books')===null){
            books=[];
        }else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static displayBooks(){
        const books = Store.getBooks();
        books.forEach((book)=>{
            // Add book to UI
            UI.addBookToList(book);
        });
    }

    static addBook(book){
        const books = Store.getBooks();
        
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }
    static removeBook(isbn){
        const books = Store.getBooks();
        
        books.forEach((book,index)=>{
            if(book.isbn===isbn){
                books.splice(index,1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));

    }
}

// DOM Load Event

document.addEventListener('DOMContentLoaded', Store.displayBooks);

// Event Listener for add book
document.getElementById('book-form').addEventListener('submit', (e)=>{
    // Get Form Values
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value;

// Instantiating book
    const book = new Book(title, author, isbn);

    // Instantiating UI obj
    // const ui = new UI();
    // Validate
    if(title===''||author===''||isbn ===''){
        // Error alert
        UI.showAlert('Please fill in all fields', 'error');
    }else{
        // Add book to list
        UI.addBookToList(book);
        // Add books to local storage
        Store.addBook(book);
        // Show succes
        UI.showAlert('Book Added!', 'success');
        // Clear fields
        UI.clearFields();
    }


    e.preventDefault();
});

// Event listener for delete
document.getElementById('book-list').addEventListener('click',(e)=>{
    // const ui = new UI();
    if(e.target.className==='delete'){
    UI.deleteBook(e.target);
    // Remove from local Storage
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    // Show alert
    UI.showAlert('Book Removed!', 'success');
    }


    e.preventDefault();
});