const express = require('express');
const booksController = require('../Controller/booksController');
const Router = express.Router();

Router.get("/",(req,res)=>{
    res.send("you are here: /books/")
})

Router.get('/getall',(req,res)=>{
    booksController.getAll().then(result =>{
        res.send(result);
    }).catch(error=>{
        res.send(error);
    })
})

Router.get('/getboth',(req,res)=>{

    booksController.getBoth().then(result =>{
        res.send(result);
    }).catch(error=>{
        res.send(error);
    })
})

Router.post('/new',async (req,res)=>{
    const book = {
        title:req.body.title,
        quantity:req.body.quantity,
        author:req.body.author,
        category:req.body.category,
        description:req.body.description
    };


    let checkResult = checkNewBook(book);

    if (! checkResult.isSuccess) {
        res.send(checkResult);
        return;
    }

    booksController.addNewBook(book).then(result=>{
        res.send(result)
    }).catch(error => res.send(error))
})

//searching books
Router.get('/searchBookbyIB_ID/:IB_ID',(req,res)=>{
    booksController.searchBookByIB_ID(req.params.IB_ID).then(result=>{
        res.send(result)
    }).catch(error=>{
        res.send(error)
    })
})
Router.get('/searchBookbytitle/:title',(req,res)=>{
    booksController.searchBookByTitle(req.params.title).then(result=>{
        res.send(result)
    }).catch(error=>{
        res.send(error)
    })
})
Router.get('/searchBookbyCategory/:category',(req,res)=>{
    booksController.searchBookByCategory(req.params.category).then(result=>{
        res.send(result)
    }).catch(error=>{
        res.send(error)
    })
})
Router.get('/searchBookbyAuthor/:author',(req,res)=>{
    booksController.searchBookByAuthor(req.params.author).then(result=>{
        res.send(result)
    }).catch(error=>{
        res.send(error)
    })
})

//update book
Router.post("/update",(req,res)=>{

    const existingIB_ID = parseInt(req.body.IB_ID).toString();
    if (isNaN(existingIB_ID)){
        res.send("IB_ID of the book to be updated is not an integer. IB_ID : " + existingIB_ID);
        return;
    }

    booksController.searchBookByIB_ID(existingIB_ID).then(theBook=>{
        if (theBook.length<1){//no book with this IB_ID
            res.send("No book is found with IB_ID : " + existingIB_ID);
        }else{

            const newBook = {
                newTitle:req.body.newTitle,
                newQuantity:req.body.newQuantity,
                newAuthor:req.body.newAuthor,
                newCategory:req.body.newCategory,
                newDescription:req.body.newDescription
            };

            let checkResult = checkNewBook({
                title:newBook.newTitle,
                quantity: newBook.newQuantity,
                author: newBook.newAuthor,
                category: newBook.newCategory
            });

            if (! checkResult.isSuccess) {
                res.send(checkResult);
                return;
            }

            booksController.updateBook(newBook,existingIB_ID).then(result=>{
                res.send(result)
            }).catch(error => res.send(error))
        }
    }).catch(error => res.send(error))

})

//deleting book
Router.post("/delete",(req,res)=>{
    let IB_ID = parseInt(req.body.IB_ID).toString();

    if (isNaN(IB_ID)) {
        res.send("IB_ID should be an integer, but IB_ID : " + IB_ID);
        return;
    }

    booksController.deleteBook(IB_ID).then(result=>{
        res.send(result)
    }).catch(error=>{
        res.send(error)
    })
})

function checkNewBook(book){

    let toReturn = {
        isSuccess:false,
        message:"checking the book parameter is failed"
    }

    let title = book.title;

    //checking for undefined
    if (title===undefined){
        toReturn.isSuccess = false;
        toReturn.message = 'Error.\nBook title is not defined or filled out'
        return toReturn;
    }else{
        if (title.toString().length<2){
            toReturn.isSuccess = false;
            toReturn.message =
                "Error. \nBook title shouldn't be less than 2 characters or letters";
            return toReturn;
        }else{
            toReturn.isSuccess = true;
            toReturn.message = "Success.\nBook title is defined well"
            return toReturn;
        }
    }





}

module.exports = Router;