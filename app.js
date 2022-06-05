const express = require('express')
const cookieParser = require("cookie-parser")
const multer = require('multer');

const body_parser = require("body-parser")

const cors = require('cors');

//for checking student exist
const studentsController = require("./Controller/studentsController");

const hbs = require('express-handlebars');

const verifyCookie = require('./Routes/verifyCookie')
const jwt = require('./Routes/jwt')

const loginRouter = require('./Routes/loginRouter')
const logoutRouter = require('./Routes/logoutRouter')
const dashboard = require('./Routes/dashboard')
const studentsRouter = require('./Routes/studentsRouter')
const booksRouter = require('./Routes/booksRouter')
const rentsRouter = require('./Routes/rentsRouter')
const adminsRouter = require('./Routes/adminsRouter')

const app = express();

app.engine('hbs', hbs({layoutsDir:__dirname+"/views/layouts",extname: ".hbs"}))
app.set('view engine', 'hbs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './images/all')
    }, filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({storage: storage})

app.use(body_parser())

app.use(express.json())
app.use(cookieParser());
app.use(cors())
app.use(express.static(__dirname+"/publics"));

app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/dashboard",verifyCookie, dashboard);
app.use("/students", verifyCookie, studentsRouter);
app.use("/books", verifyCookie, booksRouter);
app.use("/rents", verifyCookie, rentsRouter);
app.use("/admins", verifyCookie, adminsRouter);

app.post("/photo", upload.single("studentPhoto"), async (req, res) => {

    const fs = require('fs');
    if (!req.file) return res.send("please select a valid image.")
    let file = undefined;
    let student;

    if (req.body.IS_ID) {//if IS_ID is passed.
        let response = await studentsController.getStudentsByIS_ID(req.body.IS_ID);
        if (response) {
            student = await response;
        } else {
            return res.send("unable to get a student with IS_ID = " + req.body.IS_ID)
        }
    } else//if no IS_ID is passed to us
        return res.send("IS_ID is undefined")

    if (student.length < 1) {//checking for student exist
        console.log("unable to get student with IS_ID = " + req.body.IS_ID)
        return res.send("unable to get student with IS_ID = " + req.body.IS_ID);
    }

    if (req.file.originalname.toLowerCase().endsWith(".png")
        || req.file.originalname.toLowerCase().endsWith(".jpeg")
        || req.file.originalname.toLowerCase().endsWith(".jpg"))
        file = fs.readFileSync(req.file.path);

    let extension;
    let originalName = req.file.originalname;
    if (originalName.endsWith(".jpeg")) extension = '.jpeg';
    else if (originalName.endsWith('.jpg')) extension = '.jpg';
    else if (originalName.endsWith('.png')) extension = '.png';

    if (file) {
        const photoName = "./images/students/" + `__${student[0].IS_ID}__`+ extension;
        fs.writeFile(photoName, file, (err) => {
            if (!err) {//if written successfully

                //writing the name to the student table
                studentsController.updateStudentPhoto({
                    path : photoName,
                    IS_ID : req.body.IS_ID
                }).then(success=>{//photo path is added to the respective student in the students table

                    console.log("The image is stored successfully.");
                    res.send("Your image is submitted successfully.")

                }).catch(err=>{//unable to add photo path to the db

                    console.log(err);
                    res.send(err);

                })
            } else {
                console.log("unable to write the file")
                res.send('unable to save the file to the server.\nPlease try again.')
            }
        });
    } else {
        console.log("The file isn't image file.")
        res.send("The file isn't image file.")
    }
})

app.post("/verify", async (req, res) => {
    let signedJWT = req.body.signedJWT;
    jwt.verifyToken(signedJWT).then(normal => {
        res.send(normal)
    }).catch(error => res.send());
});

app.get("/", async (req, res) => {
    res.render("homepage",{title:"Infoken Homepage"});
    console.log("clients are browsing home page");
})
app.listen(3000, () => {
    console.log("The server is up and running......");
})