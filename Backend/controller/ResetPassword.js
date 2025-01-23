const User =require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");


//resetPasswordToken
exports.resetPasswordToken = async (req,res) => {
    try{
       const {email} = req.body;

       if (!email || !/\S+@\S+\.\S+/.test(email)) {
        return res.status(400).json({
            success: false,
            message: "Invalid email format",
        });
    }
       const user = await User.findOne({email});
       if(!user){
        return res.json({success:false,
            message:"your email is not registered",
        });

       }
       const token = crypto.randomUUID();
       user.resetPasswordToken = token ;
       user.resetPasswordExpires = Date.now() + 5*60*1000;
       await user.save();
  
       const url = `http://localhost:3000/update-password/${token}`;
       await mailSender(email,
                         "Password Reset Link",
                         `Click the following link to reset your Password  ${url}` );
       
       return res.json({
        success:true,
        message:"email sent successfully",
       });



    }
    catch(error){
         console.log(error);
         return res.status(500).json({
            success:false,
            message:"Something went wrong",
         });
    }
};
//resetPassword
exports.resetPassword = async (req,res) =>{
    try{
       const {password,confirmPassword,token} =req.body;
       if (!password || !confirmPassword || !token) {
        return res.status(400).json({
            success: false,
            message: "All fields are required",
        });
    }
       if(password !== confirmPassword){
         return res.json({
            success:false,
            message:'Password not matching',
         });
       }
       const userDetails = await User.findOne({ resetPasswordToken: token});
       if(!userDetails){
        return res.json({
            success: false,
            message:"invalid token",
        });
       }
       if(userDetails.resetPasswordExpires < Date.now()){
        return res.json({
            success:false,
            message:"Token is expired,Please regenerate your token",
        });
       }
       const hashedPassword = await bcrypt.hash(password,10);
       await User.findOneAndUpdate({resetPasswordToken:token},
         {password:hashedPassword},
         {new:true},
       );
       return res.status(200).json({
        success:true,
        message:'Password reset successfully',
       });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
           success:false,
           message:"Something went wrong",
        });
    }
}