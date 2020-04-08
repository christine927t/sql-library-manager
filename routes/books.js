const express = require('express');
const router = express.Router();
const Book = require('../db').models.Book;

// Helper function to wrap each route
function asyncHandler(cb) {
    return async (req, res, next) => {
        try {
            await cb(req, res, next)
        } catch (error) {
            res.status(500).next(error);
        }
    }
}

// GET books - show full list of books
router.get('/', asyncHandler(async (req, res) => {
    const books = await Book.findAll()
    res.render("index", { books, title: books.title })
}));

// GET books/new - create new book form
router.get('/new', (req, res) => {
    res.render("new-book", { books: {}, title: "New Book" })
});

// POST books/new - posts new book to database
router.post('/', asyncHandler(async (req, res) => {
    let book;
    try {
        book = await Book.create(req.body);
        res.redirect("/books/" + book.id)
    } catch (error) {
        if (error.name === "SequelizeValidationError") {
            book = await Book.build(req.body);
            res.render("new-book", { article, errors: error.errors, title: "New Article" })
        } else {
            throw error;
        }
    }
}))

// // GET books/:id/edit - edit book form
// router.get("/:id/edit", (req, res) => {
//     const book = await Book.findByPk(req.params.id);
//     if (book) {
//         res.render("books/edit")
//     } else {
//         res.sendState(404)
//     }
// })


// POST books/:id - updates book info
// router.post('/:id/edit', (req, res) => {
//     let book;
//     try {
//         book = await Book.findByPk(req.params.id);
//         if (book) {
//             await book.update(req.body)
//             res.redirect("/books/" + book.id)
//         } else {
//             res.sendStatus(404);
//         }
//     }
// })

// // GET books/:id - shows book detail form
// router.get("/:id", (req, res) => {
//     const book = await Book.findByPk(req.params.id);
//     if (book) {
//         res.render("books/detail")
//     } else {
//         res.sendStatus(404);
//     }
// })


// // POST books/:id/delete - deletes a book from list
// router.get("/:id/delete", (req, res) => {
//     const book = await Book.findByPk(req.params.id)
//     if (book) {
//         res.render("books/delete")
//     } else {
//         res.sendStatus(404);
//     }
// })

module.exports = router;