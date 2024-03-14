const myLibrary = [];
const libraryElement = document.querySelector('.library');

addBookToLibrary('J.K. Rowling', 'Harry Potter and the Sorcerer\'s Stone', 309, true);
addBookToLibrary('George Orwell', '1984', 328, false);
addBookToLibrary('Jane Austen', 'Pride and Prejudice', 432, true);
addBookToLibrary('Agatha Christie', 'Murder on the Orient Express', 274, true);
addBookToLibrary('J.R.R. Tolkien', 'The Hobbit', 310, false);

function Book(author, title, pages, is_read) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.is_read = is_read;
}

function addBookToLibrary(author, title, pages, is_read) {
    const book = new Book(author, title, pages, is_read);
    myLibrary.push(book);
}

function clearLibrary() {
    libraryElement.innerHTML = '';  
}

function deleteBook(id){
    myLibrary.splice(id, 1)
    clearLibrary()
    displayBooks()
}

function displayBooks(){
    myLibrary.forEach( function(book){
        const book_id = myLibrary.indexOf(book);
        const bookNode = document.createElement('div');
        bookNode.classList.add('book')
        const title = document.createElement('h2');
        title.textContent = book.title;
        const pages = document.createElement('p');
        pages.textContent = book.pages + ' ' + 'pages';
        const author = document.createElement('h4');
        author.textContent = 'Author:' + ' ' + book.author;
        const read_div = document.createElement('div');
        read_div.classList.add('read_div')
        const is_read = document.createElement('input');
        is_read.setAttribute('type', 'checkbox')
        is_read.setAttribute('id', 'read_' + book_id)
        is_read.checked = book.is_read;
        const read_label = document.createElement('p')
        read_label.textContent = 'Read: '
        read_div.appendChild(read_label);
        read_div.appendChild(is_read);
        const x = document.createElement('button');
        const x_img = document.createElement('img')
        x_img.style.width = '100%';
        x_img.style.height = '100%';
        x_img.src = 'x.png';
        x_img.classList.add('x_img');
        x.classList.add('x');
        x.appendChild(x_img);
        x.addEventListener('click', () => deleteBook(book_id));
        bookNode.setAttribute('id', book_id);
        bookNode.appendChild(x);
        bookNode.appendChild(title);
        bookNode.appendChild(pages);
        bookNode.appendChild(author);
        bookNode.appendChild(read_div);
        libraryElement.appendChild(bookNode);

    })
}

function openPopup() {
    document.getElementById('popup').style.display = 'block';
    document.querySelector('.library').classList.add('popup-open');
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
    document.getElementById('bookForm').reset();
    document.querySelector('.library').classList.remove('popup-open');
}

function submitForm(event) {
    event.preventDefault();
    const author = document.getElementById('author').value;
    const read = document.getElementById('read');
    const pages = document.getElementById('pages').value;
    const title = document.getElementById('title').value;

    addBookToLibrary(author, title, pages, read.checked);
    closePopup();
    clearLibrary();
    displayBooks();
}




displayBooks()



// let card = event.target.parentNode.parentNode;
// let index = card.index
// myLibrary[index].read = !myLibrary[index].read;
// let p = card.querySelector('p:nth-child(5)').textContent = Read: ${myLibrary[index].read};


