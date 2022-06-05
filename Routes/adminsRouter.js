const express = require('express');
const Router = express.Router();
const adminsController = require('../Controller/adminsController')

Router.get("/", (req, res) => {
    res.send("welcome to admin page");
})

Router.post("/new", (req, res) => {
    let admin = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password: req.body.password,
        phoneNumber: req.body.phoneNumber,
    }

    let checkResult = checkNewAdmin(admin);

    if (checkResult === true) {
        adminsController.newAdmin(admin).then(result => res.send(result))
    } else res.send(checkResult);

})

Router.post("/update", (req, res) => {
    let IA_ID = parseInt(req.body.IA_ID);

    if (isNaN(IA_ID)) {//unable to convert the string to integer
        res.send("IA_ID should be integer")
        return;
    }

    adminsController.getByIA_ID(IA_ID).then(theAdmin => {
        if (theAdmin.length < 1) {//no admin found
            res.send("there is no admin with IA_ID = " + IA_ID);
        } else {//the admin is found
            let newAdmin = {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                username: req.body.username,
                password: req.body.password,
                phoneNumber: req.body.phoneNumber,
            }

            let checkResult = checkNewAdmin(newAdmin);

            //the new admin fulfills the admin criteria.
            if (checkResult) {
                adminsController.updateAdmin(IA_ID, newAdmin).then(result => {
                    res.send(result)
                }).catch(error => res.send(error));
            }
            //the new admin doesn't fulfill the admin criteria. so why do we proceed. return to client here
            else {
                res.send(checkResult);
            }
        }
    }).catch(error => {
        res.send(error)
    })

})

Router.get("/getAll", (req, res) => {
    adminsController.getAllAdmin().then(result => res.send(result))
        .catch(error => res.send(error));
})

Router.get("/getBoth", (req, res) => {
    adminsController.getBoth().then(result => res.send(result))
        .catch(error => res.send(error))
})

Router.post("/delete", (req, res) => {

    let IA_ID = parseInt(req.body.IA_ID);

    if (isNaN(IA_ID)) {//unable to convert the string to integer
        res.send("IA_ID should be integer")
    } else {
        adminsController.getByIA_ID(IA_ID).then(theAdmin => {
            if (theAdmin.length < 1) {//no admin found
                res.send("there is no admin with IA_ID = " + IA_ID)
            } else {
                adminsController.deleteAdmin(IA_ID).then(updatedAdmin=>{
                    res.send(updatedAdmin);
                }).catch(error=>{
                    res.send(error)
                })
            }
        }).catch(error => {
            res.send(error)
        });
    }
})

Router.get("/getByIA_ID/:IA_ID", (req, res) => {

    let IA_ID = parseInt(req.params.IA_ID);

    if (isNaN(IA_ID)) {//unable to convert the string to integer
        res.send("IA_ID should be integer")
    } else {
        adminsController.getByIA_ID(IA_ID).then(result => res.send(result))
            .catch(error => res.send(error))
    }
})

function checkNewAdmin(admin) {

    let {firstname, lastname, username, password, phoneNumber} = admin;

    for (let info in admin) {
        if (admin[info] === undefined) return admin[info] + " is undefined";
    }

    if (firstname.length <= 3) return firstname + ' : is less than four letters'
    else if (lastname.length <= 3) return lastname + ' : is less than four letters'
    else if (username.length <= 5) return username + ' : is less than six letters'
    else if (password.length <= 5) return password + ' : is less than six letters'
    else if (phoneNumber.length <= 9) return phoneNumber + ' : is less than standard phone number length'
    else return true
}

module.exports = Router;