const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");


const otpSchema = new mongoose.Schema({
   
   email:{
    type:String,
    required:true,
   },
   createdAt:{
    type:Date,
    default:Date.now(),
    expires:5*60,
   },
   otp:{
    type:String,
    required:true,
   },


});


async function sendVerificationEmail(email,otp){
    try{
        const htmlContent = `<p>Your OTP for verification is: <b>${otp}</b></p>`;
        const mailResponse = await mailSender(email,"Verification Email from TaylorZone", htmlContent);
        console.log("Email sent Successfully",mailResponse);
        return true;
    }
    catch(error){
      console.log("error occured while sending emails:",error);
      throw error;
    }
}
otpSchema.pre("save",async function(next){
    try {
        const emailSent = await sendVerificationEmail(this.email, this.otp);
        if (!emailSent) {
            console.warn("Warning: OTP saved but email sending failed.");
        }
        next();
    } catch (error) {
        console.error("Error in pre-save middleware:", error);
        next(error);
    }
    
});
module.exports = mongoose.model("OTP",otpSchema);