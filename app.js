// Book Constructor
function Book(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI Constructor
function UI(){}

// Add book to list
UI.prototype.addBookToList = function(book){
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
// Show alert
UI.prototype.showAlert = function(message, className){
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

// Delete book
UI.prototype.deleteBook = function(target){
    if(target.className ==='delete'){
        target.parentElement.parentElement.remove();
    }
}

// Clear Fields
UI.prototype.clearFields=function(){
    document.getElementById('title').value = ' ';
    document.getElementById('author').value = ' ';
    document.getElementById('isbn').value = ' ';
}


// Event Listener for add book
document.getElementById('book-form').addEventListener('submit', (e)=>{
    // Get Form Values
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value;

// Instantiating book
    const book = new Book(title, author, isbn);

    // Instantiating UI obj
    const ui = new UI();
    // Validate
    if(title===''||author===''||isbn ===''){
        // Error alert
        ui.showAlert('Please fill in all fields', 'error');
    }else{
        // Add book to list
        ui.addBookToList(book);
        // Show succes
        ui.showAlert('Book Added!', 'success');
        // Clear fields
        ui.clearFields();
    }


    e.preventDefault();
});

// Event listener for delete
document.getElementById('book-list').addEventListener('click',(e)=>{
    const ui = new UI();
    ui.deleteBook(e.target);

    // Show alert
    ui.showAlert('Book Removed!', 'success');


    e.preventDefault();
});










