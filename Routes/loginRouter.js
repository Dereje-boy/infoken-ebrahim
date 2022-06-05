const express = require('express')
const Router = express.Router();

const adminsController = require('../Controller/adminsController')
const jwt = require('./jwt')


Router.get("/", async (req, res) => {
    console.log(req);

    let token = req.cookies.token;
    if (!token) res.render("login");
    jwt.verifyToken(token).then(admin=>{
        console.log(admin);
        res.redirect('../dashboard')
    }).catch(error=>{
        console.log(error);
        res.render("login");
    })

})

Router.post("/", async (req, res) => {
    const username = await req.body.username
    const password = await req.body.password

    // console.log(await req.body);

    Authorize(username, password, req, res);
})

// Router.get("/:username/:password",(req,res)=>{
//     const username = req.params.username
//     const password = req.params.password
//
//     Authorize(req.params.username,req.params.password,res);
// })

function Authorize(username, password, req, res) {

    console.log("username:", username, "\npassword:", password);

    if (username === undefined || password === undefined
        || username.length < 6 || password.length < 6) {
        console.log("no admin info found");
        // res.cookie("wrongCookie","iogeoghweoihgweio")
        res.render("login", {
                "message": "username and / or password not defined or less than six letters"
            }
        )
        return;
    }

    adminsController.getByUsernameAndPassword(username, password).then(async result => {
        if (result.length < 1) {
            //if no admin with username and password above is found
            res.render("login", {
                    message: "unable to get an admin with the above password and username"
                }
            )
        } else {

            const adminString = `{
                "firstname":"${result[0].firstname}",
                "lastname":"${result[0].lastname}",
                "username":"${result[0].username}",
                "password":"${result[0].password}",
                "phoneNumber":"${result[0].phoneNumber}",
                "isGranted":"${result[0].isGranted}",
                "registrarID":"${result[0].registrarID}",
                "IA_ID":"${result[0].IA_ID}"
            }`;

            const admin = {
                "firstname": result[0].firstname,
                "lastname": result[0].lastname,
                "username": result[0].username,
                "password": result[0].password,
                "phoneNumber": result[0].phoneNumber,
                "isGranted": result[0].isGranted,
                "registrarID": result[0].registrarID,
                "IA_ID": result[0].IA_ID
            };

            // console.log(JSON.parse(adminString));

            jwt.signToken(adminString).then(token => {
                    if (token) {
                        res.cookie("token", token)
                        req.username = admin.username
                        req.fullname = admin.firstname.concat(" " + admin.lastname)

                        res.redirect("dashboard")
                    } else {
                        res.render("login", {
                                "success": false,
                                message: "unable to create token"
                            }
                        )
                    }
                }
            ).catch(error => {
                console.log(error);

                res.render("login", {
                        "success": false,
                        message: "problem with jwt token creator : "
                    }
                )
            })
        }
    }).catch(error => res.render("login", {
        message: "problem with async database controller"
    }))
}

function LoginRequest(username, password, res) {

    console.log("username:", username, "\npassword:", password);

    if (username === undefined || password === undefined
        || username.length < 6 || password.length < 6) {
        console.log("no admin info found");
        // res.cookie("wrongCookie","iogeoghweoihgweio")
        // res.render("login.hbs",{})
        res.render("login", {
                "message": "username and / or password not defined or less than six letters"
            }
        )
        return;
    }

    adminsController.getByUsernameAndPassword(username, password).then(async result => {
        if (result.length < 1) {
            //if no admin with username and password above is found
            res.send({
                    "success": false,
                    "message": "unable to get an admin with the above password and username"
                }
            )
        } else {

            const adminString = `{
                "firstname":"${result[0].firstname}",
                "lastname":"${result[0].lastname}",
                "username":"${result[0].username}",
                "password":"${result[0].password}",
                "phoneNumber":"${result[0].phoneNumber}",
                "isGranted":"${result[0].isGranted}",
                "registrarID":"${result[0].registrarID}",
                "IA_ID":"${result[0].IA_ID}"
            }`;


            jwt.signToken(adminString).then(token => {
                if (token) {
                    res.cookie("token", token)
                    res.send({
                            "success": true,
                            "message": "successfully logged in ",
                            "token": token.toString()
                        }
                    )
                } else {
                    res.send({
                            "success": false,
                            "message": "unable to create token"
                        }
                    )
                }
            }).catch(error => {
                console.log(error);
                res.send({
                        "success": false,
                        "message": "problem with jwt token creator : ",
                        "error": error
                    }
                )
            })
        }
    }).catch(error => res.send({
        "success": false,
        "message": "problem with async database controller",
        "error": error
    }))
}

module.exports = Router;