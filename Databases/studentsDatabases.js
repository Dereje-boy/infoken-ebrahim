const mysql = require('mysql')
const dotenv = require('dotenv').config()

const db = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
});

async function addNewStudent(student) {
    let {firstname, lastname, studentID, department, gender, dorm, phoneNumber, registrarID} = student;

    let sql = "INSERT INTO students set ?";

    return new Promise((resolve, reject) => {
        db.query(sql, student, (err, result) => {
            if (err) reject(err)
            else resolve(result);
        })
    })
}

async function updateStudent(newStudent, existingStudent) {
    return new Promise(async (resolve, reject) => {
        let studentFound = await searchStudentByID(existingStudent.studentID);
        //any student found
        if (studentFound) {
            let preparedSQL = prepareUpdateSQL(newStudent, existingStudent);
            db.query(preparedSQL, (err, result) => {
                if (err) reject(err);
                resolve(result);
            })
        }
        //student not found
        else {
            reject(studentFound)
        }
    })
}

function prepareUpdateSQL(newStudent1, existingStudent) {
    // making table complement changes
    let newStudent = {
        firstname: newStudent1.newFirstname,
        lastname: newStudent1.newLastname,
        studentID: newStudent1.newStudentID,
        department: newStudent1.newDepartment,
        gender: newStudent1.newGender,
        dorm: newStudent1.newDorm,
        phoneNumber: newStudent1.newPhoneNumber
    }


    let update = ""
    let needComma = false;
    for (let info in newStudent) {
        if (newStudent[info]) {
            let comma = " , ";
            if (needComma) {
                update = update + comma;
            }

            let temp = `${info} = '${newStudent[info]}' `;
            update = update + temp;
        }
        //starting from the second comma is needed like this fir...=dere , las=....
        needComma = true;
    }
    let sql = `update students set ${update} where IS_ID = '${existingStudent.IS_ID}'`
    return sql;
}

async function searchStudentByID(studentID) {
    return await searchByStudentByID(studentID);
}

async function getSomeStudent(search) {

    console.log(search);

    return new Promise((resolve, reject) => {

        db.query(`select * from students where ${search.searchKey} like "%${search.searchValue}%";`,
            (error, results) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(results);
                }
            });
    });
}

async function getAllStudents() {
    let sql = "select * from students;";
    return new Promise((resolve, reject) => {
        db.query(sql, (error, result) => {
            if (error) reject(error)
            resolve(result);
        })
    })
}

async function getStudentsByIS_ID(IS_ID) {
    return new Promise((resolve, reject) => {
        let sql = `select * from students where IS_ID = '${IS_ID}';`;
        db.query(sql, (error, result) => {
            if (error) reject(error)
            else resolve(result);
        })
    })
}

async function getStudentsByFirstname(firstname) {
    return new Promise((resolve, reject) => {
        let sql = `select * from students where firstname = '${firstname}';`;
        db.query(sql, (error, result) => {
            if (error) reject(error)
            else resolve(result);
        })
    })
}

async function getStudentsByDepartment(department) {
    return new Promise((resolve, reject) => {
        let sql = `select * from students where department = '${department}';`;
        db.query(sql, (error, result) => {
            if (error) reject(error)
            else resolve(result);
        })
    })
}

async function searchByStudentByID(studentID) {
    return new Promise((resolve, reject) => {
        let sql = `select * from students where studentID like "%${studentID}%";`;
        db.query(sql,
            (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result);
                }
            })
    })
}

async function deleteStudent(IS_ID) {
    return new Promise((resolve, reject) => {
        let sql = `delete from students where IS_ID = ${IS_ID}`;
        db.query(sql, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        })
    })
}

async function updateStudentPhoto(photo) {
    let path = photo.path
    let IS_ID = photo.IS_ID;

    return new Promise((resolve, reject) => {
        if (! (path && IS_ID) ) reject("parameters are undefined")
        db.query(`update students set studentsPhoto = '${path}' where IS_ID = ${IS_ID}`
            ,(err, result) => {
                if (err) reject(err)
                else
                    resolve(result);
            })
    })
}

module.exports.addNewStudent = addNewStudent;
module.exports.getSomeStudent = getSomeStudent;
module.exports.updateStudent = updateStudent;
module.exports.getAllStudents = getAllStudents;

//searching....
module.exports.getStudentsByIS_ID = getStudentsByIS_ID;
module.exports.getStudentsByFirstname = getStudentsByFirstname;
module.exports.getStudentsByDepartment = getStudentsByDepartment;
module.exports.searchStudentByID = searchStudentByID;


//blob
module.exports.updateStudentPhoto = updateStudentPhoto

//deleting student
module.exports.deleteStudent = deleteStudent