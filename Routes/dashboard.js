const express = require('express');
const Router = express.Router();

Router.get("/",(req,res)=>{
    // console.log(req);
    res.render("dashboard",{
        username:req.admin.username,
        fullname:req.admin.firstname+" "+req.admin.lastname
    })
});

module.exports = Router;