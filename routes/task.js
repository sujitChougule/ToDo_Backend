import express from 'express';
const router = express.Router();
import {isAuthenticated} from '../middlewares/auth.js'
import {newTask,getMyTask, upadateTask, deleteTask} from "../controllers/task.js"

router.post("/new",isAuthenticated,newTask);

router.get("/my",isAuthenticated,getMyTask);

router.route("/:id").put(isAuthenticated,upadateTask).delete(isAuthenticated,deleteTask)


export default router;