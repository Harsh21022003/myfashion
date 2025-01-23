const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
        trim:true,
    },
    
    email:{
        type:String,
        required:true,
        trim:true,
    },
    contactNumber: {
        type:Number,
        trim:true
    },
    password:{
        type:String,
        required:true,
        
    },

 
    token : {
        type:String,
    },
    resetPasswordToken: {
        type: String, 
    },
    resetPasswordExpires:{
        type:Date,
    },
  

});

module.exports = mongoose.model("User",userSchema);