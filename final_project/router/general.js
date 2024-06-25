const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const arrayOfBooks = Object.entries(books);

// Function to check if the user exists
const doesExist = (username) => {
  let userswithsamename = users.filter((user) => {
    return user.username === username;
  });
  return userswithsamename.length > 0;
};


public_users.post("/register", (req, res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!doesExist(username)) {
      users.push({ "username": username, "password": password });
      return res.status(200).json({ message: "User successfully registered. Now you can login" });
    } else {
      return res.status(404).json({ message: "User already exists!" });
    }
  }
  return res.status(404).json({ message: "Unable to register user." });
});


// Get the book list available in the shop
public_users.get('/', function (req, res) {
  //Write your code here
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Promise resolved")
    }, 3000)
  });

  promise.then((success) => {
    return res.status(200).json({ message: books });
  })

  //return res.status(200).json({ message: books });
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;

  if (isbn >= 1 && isbn <= arrayOfBooks.length) {
    return res.status(200).json({ message: arrayOfBooks[isbn - 1] });
  } else {
    return res.status(400).json({ message: 'No ISBN found' });

  }
});

// Get book details based on author
// public_users.get('/author/:author', function (req, res) {
//   //Write your code here

//   const b = arrayOfBooks.filter((book =>{

//     if( book[1].author === req.params.author) {
//       return book[1];
//     }
//   }))
//   const br = (b[0])[1];
//   return res.status(200).json({ BookByAuthor: br});
// });

public_users.get('/author/:author', function (req, res) {
  let promise = new Promise((resolve, reject) => {

    setTimeout(() => {
      const b = arrayOfBooks.filter((book => {

        if (book[1].author === req.params.author) {
          return book[1];
        }
      }))

      resolve = (b[0])[1];
    }, 2000)

  }).then((success) => {

    return res.status(200).json({ message: success });
  })

});

// Get all books based on title
// public_users.get('/title/:title', function (req, res) {
//   const b = arrayOfBooks.filter((book => {

//     if (book[1].title === req.params.title) {
//       return book[1];
//     }
//   }))
//   const br = (b[0])[1];
//   return res.status(200).json({ BookByTitle: br });
// });

public_users.get('/title/:title', function (req, res) {

  let promise = new Promise((resolve, reject) => {

    setTimeout(() => {
      const b = arrayOfBooks.filter((book => {

        if (book[1].title === req.params.title) {
          return book[1];
        }
      }))

      resolve = (b[0])[1];
    }, 2000)

  }).then((success) => {

    return res.status(200).json({ BookByTitle: success });
  })

});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;

  if (isbn >= 1 && isbn <= arrayOfBooks.length) {
    const b = arrayOfBooks[isbn - 1];
    console.log(b[1].reviews)
    return res.status(200).json({ reviews: b[1].reviews });
  } else {
    return res.status(400).json({ reviews: 'No review found' });

  }
});

module.exports.general = public_users;
