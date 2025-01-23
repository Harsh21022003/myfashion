const nodemailer = require("nodemailer");
require("dotenv").config();
const mailSender = async (email,title,body)=>{
    try{
          let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            port: process.env.MAIL_PORT || 587,
            secure: false, 
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            },
          });

          let info = await transporter.sendMail({
            from:`"TaylorZone" <${process.env.MAIL_USER}>`,
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`,
          })
          console.log(info);
          return info;
    }
    catch(error){
        console.log(error.message);
    }
};

module.exports = mailSender;