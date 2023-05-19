const User = require('../models/user')
const {validationResult} = require('express-validator');
const expressJwt = require("express-jwt");
const jwt = require("jsonwebtoken");

exports.signup = (req,res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json(
            errors
        )
    }

    const user = new User(req.body);
    
    user.save((err,user) =>{
        if(err){
            return res.status(400).json({
                err: "Not able to save user in DB"
            })
        }
        res.json({
            name: user.name,
            email: user.email,
            id: user._id
        })
    })
}
exports.signin = (req,res) =>{
    const errors = validationResult(req);
    const {email,password} = req.body;
    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg,
            param: errors.array()[0].param
        })
    }
   // console.log(email);
    User.findOne({email},(err,user) =>{
        if(err || !user){
            return res.status(400).json(   {
                    error: "user email does not exists"
                });
        };
        if(!user.authenticate(password))
        {
            //when authentication fails
            return res.status(401).json({
                    error: "email and password do not match"
                })
        }
        //email and password matched
        //creating token
        const token = jwt.sign({_id: user._id},process.env.SECRET);

        //put token in cookie
        res.cookie("token", token, {expire: new Date() + 9999});

        //sent response to front-end
        //send response to front end
        const { _id, name, email, role } = user;
        return res.json({ token, user: { _id, name, email, role } }); 

    })
};

exports.signout =(req,res) => {
    res.clearCookie("token");
    res.json({
        message: "signout successfull"
    })
}

//protected routes
//expressjwt is inbuild middleware
//checker for token
exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty: "auth"
})

//custom middlewares
exports.isAuthenticated = (req,res,next)=>{

    // proper checker is the correct way
   // let checker = req.profile && req.auth && req.profile._id == req.auth._id;

   //testing payment

   let checker = true;
    /*
    console.log("req",req);
    console.log("req.profile ", req.profile);
    console.log("req.auth ", req.auth);
    console.log("req.auth._id ", req.auth._id);
    console.log("req.profile._id ",req.profile._id);
 
    console.log("req.profile && req.auth && req.profile._id == req.auth._id", req.profile && req.auth && req.profile._id == req.auth._id);
    */
    if (!checker) {

        return res.status(403).json({
            error: "ACCESS DENIED"
        })
    }
    next();
};

exports.isAdmin =  (req,res,next)=>{
    if (req.profile.role === 0) {
        return res.status(403).json({
            error: "Non admin user... ACCESS DENIED"
        })
    }
    next();
};