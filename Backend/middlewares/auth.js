const JWT = require("jsonwebtoken");
require("dotenv").config();



exports.auth = async (req,res,next) => {
    try{
       const token = req.cookies.token || req.headers["Authorisation"]?.replace("Bearer ","");
       if(!token){
        return res.status(401).json({
            success:false,
            message:"token is missing",
        });
       }
       try{
        const decode = JWT.verify(token,process.env.JWT_SECRET);
        console.log(decode);
        req.user = decode;
        next();
       }
       catch(err){
           return res.status(401).json({
            success:false,
            message:'token is invalid',
           });
       }
       
    }
    catch(error){
        console.log(error);
         return res.status(401).json({
            success:false,
            message:"Something went wrong while validating token",
         });
    }
};
