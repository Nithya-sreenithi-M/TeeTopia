//schema for user
const mongoose = require("mongoose")
const crypto = require("crypto");
// no need to import time stamp in user
const uuidv1 = require("uuid/v1");

var userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    },
    lastname: {
        type: String,
        maxlength: 32,
        trim: true
      },
      email: {
        type: String,
        trim: true,
        required: true,
        unique: true
      },
      userinfo: {
        type: String,
        trim: true
      },
      //TODO: come back here
      encry_password: {
        type: String,
        required: true
      },
      salt: String,
      role: {
        type: Number,
        default: 0
      },
      purchases: {
        type: Array,
        default: []
      }
},{timeStamp : true});

userSchema.virtual("password")
  .set(function(password)//password entered by user
  {
    this._password = password//stored in private variable safely
    //sALT value it can be reffered in securePassword method
    this.salt = uuidv1(); //salt value is assigned
    this.encry_password = this.securePassword(password)
    //password is parameter password
    //the user given password is passed to the function
    //it used salt and crypto to hash it and returns a hashed value

  })
  .get(function(){
    return this._password; //unencrypted password not stored
    //database. if someone needs it get() will give it
  })
userSchema.methods =
 {
  authenticate:function(plainpassword)
  {
    return this.securePassword(plainpassword) === this.encry_password
    //returns true if matched else false
  },
  securePassword : function(plainpassword)
  {
    if(!plainpassword) return ""; //if there is null password empty string is returned
    try
    {
      return crypto.createHmac('sha256', this.salt)
      .update(plainpassword)
      .digest('hex');
    }
    catch(err)
    {
      return"";
    }
  }
}
module.exports = mongoose.model("User",userSchema);