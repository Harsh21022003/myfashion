const User=require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();


//Login 
exports.login = async (req, res) => {
    const { emailOrMobile, password } = req.body;
  
    try {
      const user = await User.findOne({ emailOrMobile });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
  
      res.status(200).json({ message: "Login successful", token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };

  // Signup 
  exports.signup = async (req, res) => {
    const { fullName, email, contactNumber, password, confirmPassword } = req.body;
  
    try {
      if (!fullName || !email || !contactNumber || !password || !confirmPassword) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
      }
  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new User({
        fullName,
        email,
        contactNumber,
        password: hashedPassword,

      });
  
      await newUser.save();
  
      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };

//sendOtp
exports.sendOTP = async (req,res) => {
    try{
      const {email} = req.body;
 
      const checkUserPresent = await User.findOne({email});
  
      if(checkUserPresent){
          return res.status(401).json({
              success:false,
              message:'User already registered',
          })
      }
      var otp = otpgenerator.generate(6,{
         upperCaseAlphabets:false,
         lowerCaseAlphabets:false,
         specialChars:false,
      });
      console.log("OTP generated: ",otp);
 
      let result = await OTP.findOne({otp: otp});
      while(result){
         otp = otpgenerator(6,{
             upperCaseAlphabets:false,
             lowerCaseAlphabets:false,
             specialChars:false,
         });
         result = await OTP.findOne({otp: otp});
 
      }
 
      const otpPayload = {email,otp};
      const otpBody = await OTP.create(otpPayload);
      console.log(otpBody);
      res.status(200).json({
         success:true,
         message:"otp sent successfully",
         otp,
      })
    }
    catch(error){
         console.log(error);
         return res.status(500).json({
             success:false,
             message:error.message,
 
         })
    }
 };

 //changepassword
exports.changePassword = async (req,res) => {
  try{

   
   const {email,newPassword,confirmPassword} = req.body;

   

   if(newPassword !== confirmPassword){
       return res.json({
           sucess:false,
           message:"newPassword and confirmPassword is not matched",
       });
   }
    const hashedPassword = await bcrypt.hash(newPassword,10);
    await User.findOneAndUpdate({email},
      {password:hashedPassword},
      {new:true},
    );
   await mailSender(email,
       "Password changed Successfully");
   //return response
   return res.status(200).json({
       success:true,
       message:"password changed successfully",
   });
  }
  catch(error){
      console.log(error);
      return res.status(500).json({
       success:false,
       message:"password not changed",
      });
  }
};
