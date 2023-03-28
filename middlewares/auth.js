import { User } from "../models/user.js";
import jwt from 'jsonwebtoken';
export const isAuthenticated=async(req,res,next)=>{
    const {token}= req.cookies;
    if(!token)
        return res.status(400).json({
            success:false,
            message:"login first"
        })
    const decoded = jwt.verify(token,process.env.JWT_SECRETE);
    req.user = await User.findById(decoded._id);
    next();
}