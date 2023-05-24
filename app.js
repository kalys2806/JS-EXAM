window.onload = function () {
    displayBooks();
};

document.getElementById('bookForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    addBook(title, author);
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
});

function addBook(title, author) {
    let books = JSON.parse(localStorage.getItem('books'))[''];
    const book = { title, author, read: false, quantity: 1 };
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
    displayBooks();
}

function displayBooks() {
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = '';

    let books = JSON.parse(localStorage.getItem('books'))[''];

    books.forEach(function (book, index) {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.read ? 'Да' : 'Нет'}</td>
        <td>${book.quantity}</td>
        <td>
          <button onclick="editBook(${index})" class="btn btn-primary btn-sm">Редактировать</button>
          <button onclick="deleteBook(${index})" class="btn btn-danger btn-sm">Удалить</button>
          <button onclick="toggleReadStatus(${index})" class="btn btn-secondary btn-sm">Изменить статус</button>
        </td>
      `;

        bookList.appendChild(row);
    });
}

function editBook(index) {
    let books = JSON.parse(localStorage.getItem('books'))[''];
    const book = books[index];

    const newTitle = prompt('Введите новое название книги:', book.title);
    const newAuthor = prompt('Введите нового автора книги:', book.author);

    if (newTitle && newAuthor) {
        book.title = newTitle;
        book.author = newAuthor;
        localStorage.setItem('books', JSON.stringify(books));
        displayBooks();
    }
}

function deleteBook(index) {
    let books = JSON.parse(localStorage.getItem('books'))[''];
    books.splice(index, 1);
    localStorage.setItem('books', JSON.stringify(books));
    displayBooks();
}

function toggleReadStatus(index) {
    let books = JSON.parse(localStorage.getItem('books')) || [''];
    const book = books[index];
    book.read = !book.read;
    localStorage.setItem('books', JSON.stringify(books));
    displayBooks();
}