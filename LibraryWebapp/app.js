class Book {
    constructor(name, author, genre) {
        this.name = name;
        this.author = author;
        this.genre = genre;
    }
}

class bookshow {
    addbook(book) {
        let html;
        bookobj.forEach(function (element) {
            html = `<tr>
        <td>${element.title}</td>
        <td>${element.author}</td>
        <td>${element.genre}</td>
        </tr>`
        });
        document.getElementById('table').innerHTML += html
    }
    clear() {
        let textarea = document.getElementById("libraryForm");
        textarea.reset();
    }
    validate(book) {
        if (book.name.length > 3 && book.author.length > 3) {
            return true;
        }
        else {
            return false;
        }
    }
    msg(type, message) {
        let alert = document.getElementById('message');
        let alerthtml;
        let strongTxt;
        if (type == 'success') {
            strongTxt = 'Success'
        } else {
            strongTxt = 'Error!'
        }
        alerthtml = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
        <strong>${strongTxt}</strong> ${message}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>`
        alert.innerHTML = alerthtml;
        setTimeout(function () {
            alert.innerHTML = ''
        }, 5000);
    }
}

let drum = document.getElementById('libraryForm');
drum.addEventListener('submit', formbookclass);

function formbookclass(e) {
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('authorName').value;
    let thrilling = document.getElementById('thrilling');
    let cooking = document.getElementById('cooking');
    let programming = document.getElementById('programming');
    if (thrilling.checked) {
        genre = thrilling.value;
    } else if (cooking.checked) {
        genre = cooking.value;
    } else if (programming.checked) {
        genre = programming.value
    }
    let book = new Book(name, author, genre);

    let show = new bookshow()
    if (show.validate(book)) {
        let booklist = localStorage.getItem('booklist')
        if (booklist == null) {
            bookobj = [];
        }
        else {
            bookobj = JSON.parse(booklist)
        }
        let myobj = {
            title: book.name,
            author: book.author,
            genre: book.genre
        }
        // console.log(myobj)
        bookobj.push(myobj)
        localStorage.setItem('booklist', JSON.stringify(bookobj))
        show.addbook(book);
        show.msg('success', 'Your Book Has Been Successfully Added');
        show.clear();
    }
    else {
        show.msg('danger', 'Sorry You Can Not Add This Book');
    }
    e.preventDefault();
}



function addbook(e) {
    let booklist = localStorage.getItem('booklist')
    if (booklist == null) {
        bookobj = [];
    }
    else {
        bookobj = JSON.parse(booklist)
    }
    let html
    bookobj.forEach(function (element,index) {
        html += `<tr>
                <td><i><b>${element.title}</b></i></td>
                <td>${element.author}</td>
                <td>${element.genre}</td>
                <td><button  id="${index}" onclick="deletebook(this.id)" class="btn btn-warning btn-sm">Delete</button></td>
                </tr>`
    });
    document.getElementById('table').innerHTML += html
}

addbook();

function deletebook(index){
    let booklist = localStorage.getItem('booklist')
    if (booklist == null) {
        bookobj = [];
    }
    else {
        bookobj = JSON.parse(booklist)
    }
    bookobj.splice(index,1);
    localStorage.setItem('booklist', JSON.stringify(bookobj))
    addbook()

}