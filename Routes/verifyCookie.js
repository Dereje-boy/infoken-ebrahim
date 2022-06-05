const jwt = require('./jwt')

async function verifyCookie(req,res,next) {
    const originalURL =req.originalUrl.toString().toLowerCase()

    if (isAllowed(originalURL)) {
        console.log("allowed end point....");
        next()
        return ;
    }

    //check if cookie is found
    const token = req.cookies['token'];
    if (token) {//if there is token cookie
        jwt.verifyToken(token).then(admin=>{
            if (admin===undefined){
                res.render("login",{message:"unable to recognize you as an admin"})
                return;
            }
            req.admin = admin;
            next();
        }).catch(error=>{
            console.log("error found. Please login again with valid admin account");
            res.render("login",{message: "error found. Please login again with valid admin account : "
                + error.toString()});
        })
    }
    else res.redirect("../login",303);
}

function isAllowed(URL1){
    let originalURL =  URL1.toString().toLowerCase();
    switch (originalURL) {
        case "/students/":
        case "/students":
        case "/books/":
        case "/books":
        case "/admins/":
        case "/admins":
        case "/rents/":
        case "/rents":
        case "/admins/getByIA_ID/":
            return true;
        default:
            return false;
    }
}

module.exports =verifyCookie;