import express from 'express';
import mongoose from 'mongoose';
import env from 'dotenv';
import auth from "../api/Route/auth.js"
import User from "../api/Route/User.js"
import userpost from "../api/Route/Post.js"
import cors from "cors";
import cookieParser from "cookie-parser";
const app=express();

env.config();
app.use(cookieParser());
app.use(express.json());
app.use(cors());
const connect =async() => {
    try {
     await  mongoose.connect(process.env.MONGO);
         console.log("Connected to Database");
    } 
    catch(err){
        console.log("Not connected to Database");
    }
}

app.get("/",(req,res) => {
    res.setHeader("Access-Control-Allow-Credentials","true");
    res.send("Welcome to the api page");
})

app.use("/auth",auth);
app.use("/user",User);
app.use("/userpost",userpost);



app.listen(8800,() => {
    connect();
    console.log("Server started at port 8800");
})