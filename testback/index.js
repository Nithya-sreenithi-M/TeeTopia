const express = require("express");

const app = express();//to use express and app is a traditonal common name.

const port = 8000;

const admin = (req,res) =>{
    return res.send("ADMIN DASHBOARD");
}

const isAdmin = (req,res,next) =>{
    console.log("validating admin login");
    next(); // this next is supposed to move the control to the admin response
}

const isLoggedin = (req,res,next) =>{
    console.log("is logged in.....")
    next();
}
app.get('/admin',isLoggedin, isAdmin,admin)





app.listen(port,() => (
    console.log("server  is running...")
));


