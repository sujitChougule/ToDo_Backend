import {User} from '../models/user.js';
import bcrypt from 'bcryptjs'; 
import { sendCookie } from '../utils/features.js';
import ErrorHandler from '../middlewares/error.js';
 

export const login=async(req,res,next)=>{
    try {
    const {email,password}=req.body;

    let user = await User.findOne({email}).select("+password");

    if(!user) return next(new ErrorHandler("Invalid email or password",404));

    const isMatch= await bcrypt.compare(password,user.password);
     
    if(!isMatch) return next(new ErrorHandler("Invalid email or password",404))

    sendCookie(user,res,`Welcome back ${user.name}`,200)
    } catch (error) {
        next(error)
    }
};

export const register=async(req,res,next)=>{
    try {
        const {name, email, password}= req.body;
    let user = await User.findOne({email});
    if(user) return next(new ErrorHandler("user Already exist",404))

    const hashPassword = await bcrypt.hash(password,10)
    user=await User.create({
        name,
        email,
        password:hashPassword
    });

    sendCookie(user,res,"registered successfully", 201)
    } catch (error) {
        next(error)
    }
};


export const getMyProfile= async(req,res)=>{
    res.status(201).json({
        message:true,
        user:req.user
    })
};

export const logout= (req,res)=>{
    res.status(201).cookie("token","",{
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true,
    }).json({
        success:true,
        message:"loged out"
    })
}
