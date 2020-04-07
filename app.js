
const db = require('./db');
const { Book } = db.models;
const path = require('path');
const express = require('express')
// const routes = require('./routes/index')
const books = require('./routes/books')

const app = express();
app.get('/', (req, res) => {
    res.render("/books", { title: 'Hey', message: 'Hello there!' })
    // res.render("index", { title: 'Hey', message: 'Hello there!' })

    // res.send("Hi");
})

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// app.use('/', routes);
app.use('/books', books);

app.listen(3000);

(async () => {
    // sync "Books" table
    await db.sequelize.sync({ force: true });
    try {
        //new instances of the Book class
        const bookInstances = await Promise.all([
            Book.create({
                title: "Little Fires Everywhere",
                author: "Celeste Ng",
                genre: "Drama",
                year: 2017
            }),
            Book.create({
                title: "Where the Crawdads Sing",
                author: "Delia Owens",
                genre: "Literary Fiction",
                year: 2018

            }),
            Book.create({
                title: "The Boy From the Woods",
                author: "Harlan Coben",
                genre: "Drama",
                year: 2020
            }),
            Book.create({
                title: "The Sinner",
                author: "J.R. Ward",
                genre: "Horror Fiction",
                year: 2020
            }),
            Book.create({
                title: "The Last Odyssey",
                author: "James Rollins",
                genre: "Thriller",
                year: 2020
            }),
            Book.create({
                title: "In Five Years",
                author: "Rebecca Serle",
                genre: "Romance Novel",
                year: 2020
            }),
            Book.create({
                title: "American Dirt",
                author: "Jeanine Cummins",
                genre: "Thriller",
                year: 2020
            }),
            Book.create({
                title: "The Glass Hotel",
                author: "Emily St. John Mandel",
                genre: "Mystery",
                year: 2020
            }),
            Book.create({
                title: "Then She Was Gone",
                author: "Lisa Jewell",
                genre: "Mystery",
                year: 2017
            }),
            Book.create({
                title: "The Silent Patient",
                author: "Alex Michaelides",
                genre: "Thriller",
                year: 2019
            })
        ]);
        const booksJSON = bookInstances.map(book => book.toJSON());
        console.log(booksJSON);

        // await sequelize.authenticate();
        // console.log('Connection to the database successful')
    } catch (error) {
        console.error('Error connecting to the database: ', error);
    }
})();