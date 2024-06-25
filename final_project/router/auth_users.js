const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => { //returns boolean
  //write code to check is the username is valid
}

const authenticatedUser = (username, password) => { //returns boolean
  console.log("authenticatedUser", users)
  let validusers = users.filter((user) => {
    return user.username === username && user.password === password;
  });
  return validusers.length > 0;
}

//only registered users can login
regd_users.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(404).json({ message: "Error logging in" });
  }

  if (authenticatedUser(username, password)) {
    let accessToken = jwt.sign({
      data: password
    }, 'access', { expiresIn: 60 * 60 });

    req.session.authorization = {
      accessToken, username
    };
    return res.status(200).send("User successfully logged in");
  } else {
    return res.status(208).json({ message: "Invalid Login. Check username and password" });
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const isbn = req.params.isbn;
  const arrayOfBooks = Object.entries(books);
  console.log("PUT")
  if (isbn >= 1 && isbn <= arrayOfBooks.length) {
    const b = arrayOfBooks[isbn - 1];
    b[1].reviews = req.params.reviews
    console.log(b[1])
    return res.status(200).json({ message: `The review for the book with ISBN ${isbn} has been added/updated` });
  } else {
    return res.status(400).json({ reviews:  'No review found' });

  }
  
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const isbn = req.params.isbn;
  const arrayOfBooks = Object.entries(books);
  console.log("PUT")
  if (isbn >= 1 && isbn <= arrayOfBooks.length) {
    const b = arrayOfBooks[isbn - 1];
    b[1].reviews = req.params.reviews
    console.log(b[1])
    return res.status(200).json({ message: `The review for the book with ISBN ${isbn} has been deleted` });
  } else {
    return res.status(400).json({ reviews:  'No review found' });

  }
  
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
