var express = require('express')
const { body} = require('express-validator');

var router = express.Router()
const {signout, signup, signin, isSignedIn} = require("../controllers/auth")
router.get("/testroute",isSignedIn,(req,res)=>{
    res.json(req.auth)
})


// add isSignedIn isAuthenticated isAdmin middlewares in the routes
router.post("/signin",[
    body('email',"enter a valid email").isEmail(),
    body('password').isLength({min:1}).withMessage("Password is required")
],signin);

router.get("/signout",signout);

router.post("/signup",[
    body('name',"name is not valid--- should be atleast 3 characters").isLength({min:3}),
    body('email',"enter a valid email").isEmail(),
    body('password').isLength({min:5}).withMessage("Enter strong password")
],signup)
module.exports = router;
