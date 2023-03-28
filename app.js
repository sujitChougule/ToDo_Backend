import express from "express";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import cors from 'cors';
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";



export const app= express();
//using middleware must use before routes
app.use(express.json());
//cookie parser
app.use(cookieParser());

app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","POST","PUT","DELETE"],
    Credentials:true, 
}))

//using routes
app.use("/api/v1/users",userRouter);
app.use("/api/v1/task",taskRouter);



config({
    path:"./data/config.env"
})


app.get("/",(req,res)=>{
    res.send("working")
})

app.use(errorMiddleware)

