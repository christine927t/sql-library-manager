
// const db = require('./db');
// const { Book } = db.models;
const path = require('path');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const routes = require('./routes/index');
const books = require('./routes/books');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());

/////MIDDLEWARE////
//sets view engine
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'pug');

//serves static files in public folder
app.use('/static', express.static('public'));

app.use('/', routes);
app.use('/books', books);

////404 error catch///
app.use((req, res, next) => {
    const err = new Error("Sorry, this page does not exist!");
    err.status = 404;
    next(err);
});

// /////ERROR HANDLER/////
app.use((err, req, res, next) =>{
    res.locals.error = err;
    res.status(err.status || 500);
    res.render('page-not-found');
    console.log(`Error ${err.status} - ${err.message}`);
});

app.listen(3000);
