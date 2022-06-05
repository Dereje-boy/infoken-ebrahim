const mysql = require('mysql')
const dotenv = require('dotenv').config()
const rentsController = require("../Controller/rentsController")
const booksController = require("../Controller/booksController")

const db = mysql.createConnection({
    host: dotenv.parsed.host,
    user: dotenv.parsed.user,
    password: dotenv.parsed.password,
    database: dotenv.parsed.database
})

async function addNewBook(book) {
    const title = book.title;
    const quantity = book.quantity;
    const author = book.author;
    const category = book.category;
    const description = book.description;
    const registrarID = 1;
    const sql = "insert into books set ?";

    return new Promise((resolve, reject) => {
        db.query(sql, {title, quantity, author, category, registrarID,description},
            (error, result) => {
                if (error) reject(error)
                else resolve(result)
            })
    })
}

async function getAll() {
    let sql = "select * from books where isAvialable = true; ";
    return new Promise((resolve, reject) => {
        db.query(sql, (error, result) => {
            if (error) reject(error)
            else resolve(result);
        })
    })
}

async function getBoth() {
    let sql = "select * from books;";
    return new Promise((resolve, reject) => {
        db.query(sql, (error, result) => {
            if (error) reject(error)
            else resolve(result);
        })
    })
}

//searching...books
async function searchBookByIB_ID(IB_ID){
    return new Promise((resolve, reject) => {
        let sql = `select * from books where IB_ID = '${IB_ID}' and isAvialable = true;`;
        db.query(sql,(err,result)=>{
            if (err) reject(err)
            else resolve(result);
        })
    })
}

async function searchBookByTitle(title){
    return new Promise((resolve, reject) => {
        let sql = `select * from books where title = '${title}' and isAvialable = true;`;
        db.query(sql,(err,result)=>{
            if (err) reject(err)
            else resolve(result);
        })
    })
}

async function searchBookByAuthor(author){
    return new Promise((resolve, reject) => {
        let sql = `select * from books where author = '${author}' and isAvialable = true;`;
        db.query(sql,(err,result)=>{
            if (err) reject(err)
            else resolve(result);
        })
    })
}

async function searchBookByCategory(category){
    return new Promise((resolve, reject) => {
        let sql = `select * from books where category = '${category}' and isAvialable = true;`;
        db.query(sql,(err,result)=>{
            if (err) reject(err)
            else resolve(result);
        })
    })
}

//update books
async function updateBook(newBook,existingIB_ID){
    let sql = prepareUpdateSQL(newBook,existingIB_ID);
    return new Promise((resolve, reject) => {
        let re = db.query(sql,(error,result)=>{
            if (error) reject(error)
            else
                resolve(result);
        })
        console.log(re);
    })
}

//delete books
async function deleteBook(IB_ID){
    return new Promise((resolve, reject) => {

        let sql = `update books set isAvialable = false where IB_ID = '${IB_ID}'`;
        db.query(sql,(error,result)=>{
            if (error) reject(error)
            else resolve(result);
        });

        //first of all check for its available to be deleted
        // booksController.searchBookByIB_ID(IB_ID).then(theBook=>{
        //     if (theBook.length>0){
        //
        //     }else{
        //         resolve("the book is ")
        //     }
        // })

    })
}

function prepareUpdateSQL(newBook1,existingIB_ID){
    // making table complement changes
    let newBook = {
        title : newBook1.newTitle,
        author : newBook1.newAuthor,
        category : newBook1.newCategory,
        quantity : newBook1.newQuantity,
        description : newBook1.description
    }

    let update = "";

    let needComma = false;
    for (let info in newBook){
        if (newBook[info]){
            let comma  = " , ";
            if (needComma){
                update = update + comma;
            }

            let temp = `${info} = '${newBook[info]}' `;
            update = update + temp;
        }
        //starting from the second comma is needed like this fir...=dere , las=....
        needComma = true;
    }
    let sql = `update books set ${update} where IB_ID = ${existingIB_ID}`
    return sql;
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
module.exports.updateBook = updateBook

//delete book
module.exports.deleteBook = deleteBook