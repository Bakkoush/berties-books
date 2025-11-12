// Create a new router
const express = require("express");
const router = express.Router();

// Home page
router.get('/', (req, res) => {
    res.render('index.ejs');
});

// About page
router.get('/about', (req, res) => {
    res.render('about.ejs');
});

// ✅ Show all books
router.get('/books/list', (req, res, next) => {
    const sqlquery = "SELECT * FROM books";
    db.query(sqlquery, (err, result) => {
        if (err) {
            next(err);
        } else {
            res.render('list.ejs', { books: result });
        }
    });
});

// ✅ Show add book form
router.get('/books/addbook', (req, res) => {
    res.render('addbook.ejs');
});

// ✅ Handle form submission (add book)
router.post('/books/bookadded', (req, res, next) => {
    const sqlquery = "INSERT INTO books (name, price) VALUES (?, ?)";
    const newrecord = [req.body.bookname, req.body.price];

    db.query(sqlquery, newrecord, (err, result) => {
        if (err) {
            next(err);
        } else {
            // Redirect back to list after adding
            res.redirect('/books/list');
        }
    });
});

// Export the router object
module.exports = router;
