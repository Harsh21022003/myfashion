const express= require("express");
const app =express();

const userRoutes = require('./Route/User');
const cartRoutes = require('./Route/cart');
const couponRoutes = require('./Route/coupon');

const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 4000;
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin:"http://localhost:3000",
        credentials:true,
    })
)

app.use("/auth",userRoutes);
app.use('/cart', cartRoutes);
app.use('/coupon', couponRoutes);

app.listen(PORT,()=>{
    console.log(`server started successfully at ${PORT}`);
})
database.dbconnect();


app.get("/",(req,res) =>{
    return res.json({
     success:true,
     message:'Your server is up and running...',
    });
 })