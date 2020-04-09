const express = require('express');
const router = express.Router();
const Book = require('../models').Book;

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

// get / - Home route should redirect to the /books route.
// get /books - Shows the full list of books.
// get /books/new - Shows the create new book form.
// post /books/new - Posts a new book to the database.
// get /books/:id - Shows book detail form.
// post /books/:id - Updates book info in the database.
// post /books/:id/delete - Deletes a book.

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
    let book;
    try {
        book = await Book.create(req.body);
        console.log(req.body)
        res.redirect("/books/" + book.id)
    } catch (error) {
        if (error.name === "SequelizeValidationError") {
            book = await Book.build(req.body);
            res.render("new-book", { book, errors: error.errors, title: "New Book" })
        } else {
            throw error;
        }
    }
}))

// GET books/:id - shows book detail form
router.get("/:id", asyncHandler(async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    if (book) {
        res.render("update-book", { book, title: book.title })
    } else {
        res.sendStatus(404);
    }
}));

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