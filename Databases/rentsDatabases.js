const mysql = require('mysql')
const studentsController = require('../Controller/studentsController')
const booksController = require('../Controller/booksController')
const dotenv = require('dotenv').config()

let connection = mysql.createConnection({
    host: dotenv.parsed.host,
    user: dotenv.parsed.user,
    password: dotenv.parsed.password,
    database: dotenv.parsed.database
})

async function newRent(IS_ID, IB_ID, IA_ID) {
    return new Promise((resolve, reject) => {
        studentsController.getStudentsByIS_ID(IS_ID)
            .then(student => {
                if (student.length < 1) {
                    resolve("unable to get a student with " + IS_ID)
                    return
                }

                //the student found by IS_ID
                booksController.searchBookByIB_ID(IB_ID)
                    .then(book => {
                        if (book.length < 1) {
                            resolve("unable to get a book with " + IB_ID)
                            return
                        }


                        //the book found by IB_ID
                        //so both the book and the student found

                        newRentOperation(IS_ID, IB_ID).then(result => {
                            resolve(result)
                        }).catch(error => {
                            reject(error)
                        })
                    }).catch(error => {
                    //unable to perform book sql operation
                    reject(error);
                })
            }).catch(error => {
            //unable to perform student sql operation
            reject(error);
        })
    })
}

async function returnBookbyIR_ID(IR_ID) {
    //check for existance first
    return new Promise((resolve, reject) => {
        checkRents(IR_ID).then(result => {
            console.log(result);
            if (result.length > 0) {//rents found
                let sql = `update rents set isReturned = true, dateReturned = CURRENT_TIMESTAMP where IR_ID = ${IR_ID} `;
                connection.query(sql, (error, result) => {
                    if (error) reject(error)
                    else {
                        resolve(result);
                    }
                })

            } else {
                //rents not found but the sql operation is successfully executed
                resolve("wrong IR_ID")
            }
        }).catch(error => reject(error));
    })
}

async function getAllRents() {
    return new Promise((resolve, reject) => {
        let sql = "select * from rents where isReturned = false;";
        connection.query(sql, (error, result) => {
            if (error) reject(error)
            else resolve(result);
        })
    })
}

async function getByIR_ID(IR_ID) {
    return new Promise((resolve, reject) => {
        let sql = `select * from rents where IR_ID = ${IR_ID}`;
        connection.query(sql, (error, result) => {
            if (error) {
                reject(error)
            }
            else resolve(result)
        })
    })
}

//returns all records in the rents table including true and false isReturn
async function getBoth() {
    let sql = "select * from rents;";
    return new Promise((resolve, reject) => {
        connection.query(sql, (error, result) => {
            if (error) reject(error)
            else resolve(result)
        })
    })
}

async function newRentOperation(IS_ID, IB_ID, IA_ID) {
    return new Promise((resolve, reject) => {
        let sql = `insert into rents (IS_ID, IB_ID, IA_ID) values (${IS_ID},${IB_ID},1);`
        connection.query(sql, (error, result) => {
            if (error) reject(error);
            else
                resolve(result)
        })
    })
}

async function checkRents(IR_ID) {
    let sql = `select * from rents where IR_ID = ${IR_ID} and isReturned = false;`;
    return new Promise((resolve, reject) => {
        connection.query(sql, (error, result) => {
            if (error) reject(error)
            else {
                resolve(result);
            }
        })

    })
}

module.exports.newRent = newRent;

module.exports.returBookbyIR_ID = returnBookbyIR_ID;
module.exports.getAllRents = getAllRents;
module.exports.getBoth = getBoth;
module.exports.getByIR_ID = getByIR_ID;
