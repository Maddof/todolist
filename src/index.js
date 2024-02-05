import "./style.css";

const myLibrary = [
  {
    title: "The Hobbit",
    author: "J.R.R Tolkien",
    status: "Not read",
  },
  {
    title: "When the Moon Hatched",
    author: "Sarah A. Parker",
    status: "Read",
  },
];

class Book {
  static displayBooks() {
    const bookList = document.querySelector(".books");
    bookList.innerHTML = "";
    myLibrary.forEach((book, i) => {
      const htmlBook = `
            <li class ="books-item" index="${i}">
                <div>${book.title}</div>
                <div>${book.author}</div>
                <div><button class="status" index="${i}" value="${book.status}">${book.status}</button></div>
                <div><button class="delete" onClick="Book.deleteBook(${i})">Delete</button></div>
            </li>
        `;
      bookList.insertAdjacentHTML("beforeend", htmlBook);
    });
  }

  static addBookToLibrary(newBookObj) {
    myLibrary.push(newBookObj);
    this.displayBooks();
    console.log(myLibrary);
  }

  static toggleStatus(i) {
    if (myLibrary[i].status === "Read") {
      myLibrary[i].status = "Not read";
    } else {
      myLibrary[i].status = "Read";
    }
    this.displayBooks();
  }

  static deleteBook(i) {
    myLibrary.splice(i, 1);
    this.displayBooks();
  }
}

Book.displayBooks();

// window.myToggle = function (i) {
//   console.log("status button was clicked with index: " + i);
// };
// window.myToggle = myToggle;

// const statusButtons = document.querySelectorAll(".status");
// console.log(statusButtons);

// statusButtons.forEach((button, i) => {
//   button.addEventListener("click", () => {
//     console.log("Hello button nr " + i);
//     if (myLibrary[i].status === "Read") {
//       myLibrary[i].status = "Not read";
//     } else {
//       myLibrary[i].status = "Read";
//     }
//   });
// });

const books = document.querySelector(".books");

books.addEventListener("click", function (e) {
  const btnIndex = e.target.attributes.index.value;
  if (e.target.classList.contains("status")) {
    console.log("click");
    console.log(btnIndex);
    if (myLibrary[btnIndex].status === "Read") {
      myLibrary[btnIndex].status = "Not read";
    } else {
      myLibrary[btnIndex].status = "Read";
    }
  }
  Book.displayBooks();
});

const form = document.querySelector(".book-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  // Object constructor for form
  let formData = new FormData(form);
  // output as an object
  Book.addBookToLibrary(Object.fromEntries(formData));
  // clear inputs
  form.reset();
});
