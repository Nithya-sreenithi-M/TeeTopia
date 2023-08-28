const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema;

const ProductCartSchema = new mongoose.Schema({
    product:{
        type : ObjectId,
        ref : "Product"
    },
    name:String,
    count:Number,//quantity order
    price : Number

    //many properties can be added like coupons,etc..
})



const orderSchema = new mongoose.Schema({
     products:[ProductCartSchema],
     transaction_id:{},//we can have a boolean for cash on delivery or not if needed.
     amount:{
         type:Number
     },
     address : String,
     updated : Date,
     status:{
        type: String,
        default:"received",
        enum: ["Cancelled", "Delivered", "shipped", "processing", "received"]
     },
     user:{
         type:ObjectId,
         ref : "User"
     }
     //to know who ordered, and later can be added to users purchased list,..

},
{
    timestamps : true
})

const Order = mongoose.model("Order",orderSchema);
const ProductCart = mongoose.model("ProductCart",ProductCartSchema);
//to export them

module.exports = {Order, ProductCart};