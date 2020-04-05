# sql-library-manager
node_modules/

Initialize Sequelize and create models

-book model with the following properties:
    title - string
    author - string
    genre - string
    year - integer
validation
    title and author can't be empty/null

-Server, middleware and routes
    get /
    get /books
    get /books/new
    post /books/new
    get /books/:id
    post /books/:id
    post /books/:id/delete

error handling middleware 
404 not found page

-build pug views
    layout.pug
    index.pug
    new-book.pug
    update-book.pug
    error.pug
    page-not-found.pug

-required fields and forms
    error message for empty fields

