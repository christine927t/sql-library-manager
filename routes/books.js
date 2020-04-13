const express = require('express');
const router = express.Router();
const Book = require('../models').Book;

// Helper function to wrap each route
function asyncHandler(cb) {
    return async (req, res, next) => {
        try {
            await cb(req, res, next)
        } catch (error) {
            console.log(error)
            res.render("error")
            throw error;
        }
    }
}

// GET books - show full list of books
router.get('/', asyncHandler(async (req, res) => {
    const books = await Book.findAll({ order: [["createdAt", "DESC"]] });
    res.render("index", { books, title: books.title })
}));

// GET books/new - create new book form
router.get('/new', (req, res) => {
    res.render("new-book", { book: {}, title: "New Book" })
});

// POST books/new - posts new book to database
router.post('/new', asyncHandler(async (req, res) => {
    console.log(req)
    let book;
    try {
        book = await Book.create(req.body);
        res.redirect("/books/")
    } catch (error) {
        if (error.name === "SequelizeValidationError") {
            book = await Book.build(req.body);
            res.render("new-book", { book, errors: error.errors, title: "New Book" })
        } else {
            throw error;
        }
    }
}));

// GET books/:id - shows book detail form
router.get("/:id", asyncHandler(async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    if (book) {
        res.render("update-book", { book, title: book.title })
    } 
    else {
        res.render("error");
    }
}));

// POST books/:id - updates book info
router.post('/:id/edit', asyncHandler(async (req, res) => {
    let book;
    try {
        book = await Book.findByPk(req.params.id);
        if (book) {
            await book.update(req.body)
            res.redirect("/books/")
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        if(error.name === "SequelizeValidationError"){
            book = await Book.build(req.body);
            book.id = req.params.id;
            res.render("update-book", { book, errors: error.errors, title: "Edit Book"})
        } else {
            throw error;
        }
    }
}))

// POST books/:id/delete - deletes a book from list
router.post("/:id/delete", asyncHandler(async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    if (book) {
        await book.destroy();
        res.redirect("/books")
    } else {
        res.sendStatus(404);
    }
}))

module.exports = router;