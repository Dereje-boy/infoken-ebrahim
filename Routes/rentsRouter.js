const express = require("express");
const Router = express.Router();

const rentsController = require('../Controller/rentsController');
const studentsController = require('../Controller/studentsController');
const booksController = require('../Controller/booksController');

Router.get("/", (req, res) => {
    res.send("welcome to rent homepage.....")
})

Router.post("/new", async (req, res) => {
    const IS_ID = req.body.IS_ID
    const IB_ID = req.body.IB_ID

    if (IS_ID ===undefined || IB_ID===undefined){
        res.send("the student and/or book is not defined.")
        return
    }
    rentsController.newRent(IS_ID, IB_ID).then(result => {
        res.send(result)
    }).catch(error => {
        res.send(error)
    })
})

Router.post('/returnbyIR_ID', (req, res) => {
    let IR_ID = (parseInt(req.body.IR_ID)).toString();

    if (parseInt(IR_ID)) {
        rentsController.returBookbyIR_ID(parseInt(IR_ID)).then(result => {
            res.send(result);
        }).catch(error => {
            res.send(error);
        })
    } else {
        res.send(req.body.IR_ID + " is not a number.")
    }
})

Router.get("/getAll", (req, res) => {
    rentsController.getAllRents().then(result => {
        res.send(result)
    }).catch(error => {
        res.send(error)
    })
})

Router.post("/getByIR_ID",(req,res)=>{
    let IR_ID = parseInt(req.body.IR_ID);
    if (! IR_ID) res.send("wrong IR_ID")
    else rentsController.getByIR_ID(IR_ID).then(result=>{
        if (result.length>0){
            studentsController.getStudentsByIS_ID(result[0].IS_ID).then(student=>{
                if (student.length>0){//the student found
                    booksController.searchBookByIB_ID(result[0].IB_ID).then(book=>{
                        if (book.length>0){//everything found...
                            res.send({
                                result,student,book
                            })
                        }else{
                            res.send("a book not found...")
                        }
                    }).catch(error=>res.send(error))
                }else res.send("a student not found....");
            }).catch(error=>{res.send(error)})
        }else{
            res.send("unable to get rent with IR_ID : " + IR_ID)
        }
    }).catch(error=>res.send(error))
})

//returns all rents having both returned false and true
Router.get("/getBoth", (req, res) => {
    console.log(req.admin);
    rentsController.getBoth().then(result => {
        res.send(result)
    }).catch(error => res.send(error));
})

module.exports = Router;