
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

app.listen(3000);
