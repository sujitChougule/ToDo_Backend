import {Task} from '../models/task.js';
import ErrorHandler from '../middlewares/error.js'
export const newTask=async(req,res,next)=>{
   try {
    const {title,description}=req.body;
    await Task.create({
        title,
        description,
        user:req.user,
    });
    res.status(201).json({
        success: true,
        message:"task added successfully"
    })
   } catch (error) {
        next(error)
   }
}

export const getMyTask = async(req,res,next)=>{
try {
    const userid= req.user._id;
    const task = await Task.find({user:userid._id});
    res.status(200).json({
        success:true,
        task,
    })
} catch (error) {
    next(error)
}
}

export const upadateTask = async(req,res,next)=>{
    try {
        const task = await Task.findById(req.params.id);
        if(!task) return next(new ErrorHandler("Invalid Id",404))
        
        task.isCompleted=!task.isCompleted;
    
        await task.save();
    
        res.status(200).json({
            success:true,
            message:"task upadated"
        })
    } catch (error) {
        next(error)
    }
}

export const deleteTask = async(req,res,next)=>{
    try {
        const task = await Task.findById(req.params.id);
    if(!task) return next(new ErrorHandler("Invalid Id",400))

    await task.deleteOne();

    res.status(200).json({
        success:true,
        message:"task deleted"
    })
    } catch (error) {
        next(error)
    }
}