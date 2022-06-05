const express = require('express');
const Router = express.Router();
const studentsController = require("../Controller/studentsController");

Router.get("/", (req, res) => {
    res.send("welcome to the students page....");
    console.log("A client is browsing students page.....");
})

Router.post("/new", async (req, res) => {
    let body = req.body;
    let firstname = body.firstname;
    let lastname = body.lastname;
    let studentID = body.studentID;
    let department = body.department;
    let gender = body.gender;
    let dorm = body.dorm;
    let phoneNumber = body.phoneNumber;
    let registrarID = req.admin.IA_ID || -1;

    console.log("this is the admin id " + req.admin.IA_ID);

    let student = {
        firstname,
        lastname, studentID,
        department,
        gender,
        dorm,
        phoneNumber,
        registrarID
    }

    let checkResult = checkNewStudent(student);

    if (!checkResult.isSuccess) {//if no full info
        res.render("newStudent", {message: checkResult.message})
    } else {//sufficient to add the student
        let databaseResult = await studentsController.addNewStudent(student);
        console.log(databaseResult);

        let successMessage = "the student is added with IS_ID : " + databaseResult.insertId
        res.render("newStudent",{message:successMessage})

    }
})

Router.get("/new", async (req, res) => {
    res.render("newStudent");
})

Router.post("/getSome", async (req, res) => {
    let search = {
        searchKey: req.body.searchKey,
        searchValue: req.body.searchValue
    }

    getSomeStudent(search).then(result => {
        console.log(result);
        res.send(result);
    }).catch(error => {
        console.log(error);
        res.send(error);
    })

});

Router.get("/getAll", async (req, res) => {

    studentsController.getAllStudents().then(result => {
        res.send(result)
    }).catch(error => {
        res.send(error)
    })

})

// the three search modes ID, firstname ,department
Router.get("/searchStudentByID/:studentID", async (req, res) => {
    let studentID = req.params.studentID;
    searchStudentByID(studentID).then(result => {
        res.send(result)
    }).catch(error => {
        res.send(error)
    })
})

Router.get("/searchStudentByFirstname/:Firstname", (req, res) => {
    let firstname = req.params.Firstname;
    console.log(firstname);

    if (!firstname) res.send('please specify student\'s firstname ');

    //is-id found so search for it...
    else {
        studentsController.getStudentsByFirstname(firstname).then(result => {
            res.send(result)
        }).catch(error => {
            res.send(error)
        })
    }
});

Router.get("/searchStudentByDepartment/:Department", (req, res) => {
    let department = req.params.Department;
    console.log(department);

    if (!department) res.send('please specify student\'s department ');

    //is-id found so search for it...
    else {
        studentsController.getStudentsByDepartment(department).then(result => {
            res.send(result)
        }).catch(error => {
            res.send(error)
        })
    }
});

Router.get("/searchStudentByIS_ID/:IS_ID", (req, res) => {
    let IS_ID = req.params.IS_ID;
    console.log(IS_ID);

    if (!IS_ID) res.send('please specify student\'s IS_ID ');

    //is-id found so search for it...
    else {
        studentsController.getStudentsByIS_ID(IS_ID).then(result => {
            res.send(result)
        }).catch(error => {
            res.send(error)
        })
    }
});

Router.post("/update", async (req, res) => {
    let newStudent = {
        newFirstname: req.body.newFirstname,
        newLastname: req.body.newLastname,
        newStudentID: req.body.newStudentID,
        newDepartment: req.body.newDepartment,
        newGender: req.body.newGender,
        newDorm: req.body.newDorm,
        newPhoneNumber: req.body.newPhoneNumber,
    }

    let existingStudent = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        studentID: req.body.studentID,
        department: req.body.department,
        gender: req.body.gender,
        dorm: req.body.dorm,
        phoneNumber: req.body.phoneNumber,
        IS_ID: req.body.IS_ID,
    }

    updateStudent(newStudent, existingStudent).then(result => {
        res.send(result)
    }).catch(err => {
        res.send(err)
    })

})

Router.post("/delete", (req, res) => {
    console.log("deleting a student");
    let IS_ID = req.body.IS_ID
    if (!IS_ID) return res.send("please provide correct IS_ID");

    studentsController.deleteStudent(req.body.IS_ID).then(result => {
        res.send(result)
    }).catch(err => {
        res.send(err)
    })
})

async function searchStudentByID(studentID) {
    return studentsController.searchStudentByID(studentID)
}

async function getSomeStudent(search) {

    let go = true;
    if (search.searchKey === undefined || search.searchValue === undefined)
        return false;

    switch (search.searchKey.toString().toLowerCase()) {
        case "firstname":
            search.searchKey = "firstname"
            break;
        case "lastname":
            search.searchKey = "lastname"
            break;
        case "studentid":
            search.searchKey = "studentID"
            break;
        case "department":
            search.searchKey = "department"
            break;
        default:
            search.searchKey = "firstname"
    }

    // let databaseResult = await studentsController.getSomeStudent(search);

    return await studentsController.getSomeStudent(search);

}

function checkNewStudent(student) {

    let returnResult = {
        isSuccess: false,
        message: "your student data is not fully provided"
    }

    //destructuring...
    let {firstname, lastname, studentID, department, gender, dorm, phoneNumber} = student;

    //are the students data defined
    if (firstname === undefined) {
        returnResult.isSuccess = false;
        returnResult.message = "Error.\nStudent first name is not defined or filled out";
        return returnResult;
    } else if (lastname === undefined) {
        returnResult.isSuccess = false;
        returnResult.message = "Error.\nStudent last name is not defined or filled out";
        return returnResult;
    } else if (studentID === undefined) {
        returnResult.isSuccess = false;
        returnResult.message = "Error.\nStudent ID is not defined or filled out";
        return returnResult;
    } else if (dorm === undefined) {
        returnResult.isSuccess = false;
        returnResult.message = "Error.\nStudent dorm is not defined or filled out";
        return returnResult;
    } else if (department === undefined) {
        returnResult.isSuccess = false;
        returnResult.message = "Error.\nStudent department is not defined or filled out";
        return returnResult;
    }

    //checking for letters length
    if (firstname.length < 3) {
        returnResult.isSuccess = false;
        returnResult.message = "Error.\nStudent first name should not be less than 3 letters";
    } else if (lastname.length < 3) {
        returnResult.isSuccess = false;
        returnResult.message = "Error.\nStudent last name should not be less than 3 letters";
    } else if (studentID.length < 5) {
        returnResult.isSuccess = false;
        returnResult.message = "Error.\nStudent ID should not be less than 5 letters";
    } else if (department.length < 3) {
        returnResult.isSuccess = false;
        returnResult.message = "Error.\nStudent department should not be less than 3 letters";
    } else if (dorm.length < 3) {
        returnResult.isSuccess = false;
        returnResult.message = "Error.\nStudent dorm should not be less than 3 letters";
    } else {
        returnResult.isSuccess = true;
        returnResult.message = "Success.\nStudent data is successfully delivered.";
    }

    return returnResult;
}

async function updateStudent(newStudent, existingStudent) {
    let updateResult = await studentsController.updateStudent(newStudent, existingStudent);
    return updateResult;
}

function addNewStudent(student) {

    //checking new student
    let returnResult = checkNewStudent(student);

    //returning to caller if something goes wrong
    if (!returnResult.isSuccess)
        return returnResult;

    //adding the student to db

}

module.exports = Router;