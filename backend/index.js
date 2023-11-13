import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import morgan from "morgan";
import userRoute from "./routes/user.routes.js";
import errorHandler from "./middlewares/error.middlewares.js"


// init express app
const app= express();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(cors());
app.use(morgan("dev"));

// Routes
app.use("/v1/users", userRoute);

app.get("/", (req, res)=>{
    res.send("hello world")
})

// error handler
app.use(errorHandler);


//mongoDB connect with server

const PORT= process.env.PORT || 4000
mongoose.connect(process.env.MONGO_URI||"").then(()=>{
    app.listen(PORT, ()=>console.log(`🎉 MongoDB connected and server start on http://localhost:${PORT}`));
});