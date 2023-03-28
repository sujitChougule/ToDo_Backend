import {app} from './app.js';
import { connectDB } from './data/database.js';

//db
connectDB();

app.listen(process.env.PORT,()=>{
    console.log(`server working at port ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
})  