const Router = require('express').Router();

Router.get("/",(req,res)=>{
    console.log("welcome to logout page");
    res.clearCookie("token");
    res.clearCookie("wrongCookie");
    res.render("login",{message:"we wish you get back!"})
})

module.exports = Router