const booksDatabases = require('../Databases/booksDatabases');

function addNewBook(book) {
    return booksDatabases.addNewBook(book);
}

async function getAll(){
    return booksDatabases.getAll();
}

async function getBoth(){
    return booksDatabases.getBoth();
}

async function searchBookByIB_ID(IB_ID){
    return booksDatabases.searchBookByIB_ID(IB_ID);
}

async function searchBookByTitle(title){
    return booksDatabases.searchBookByTitle(title);
}

async function searchBookByCategory(category){
    return booksDatabases.searchBookByCategory(category);
}

async function searchBookByAuthor(author){
    return booksDatabases.searchBookByAuthor(author);
}
async function updateBook(newBook,existingIB_ID){
    return booksDatabases.updateBook(newBook,existingIB_ID);
}

async function deleteBook(IB_ID){
    return booksDatabases.deleteBook(IB_ID);
}

module.exports.addNewBook = addNewBook;

//get all books
module.exports.getAll = getAll
module.exports.getBoth = getBoth

//search books
module.exports.searchBookByIB_ID = searchBookByIB_ID;
module.exports.searchBookByTitle = searchBookByTitle;
module.exports.searchBookByAuthor = searchBookByAuthor;
module.exports.searchBookByCategory = searchBookByCategory;

//update book
module.exports.updateBook = updateBook;

//delete book
module.exports.deleteBook = deleteBook;