import express, { json }  from "express"

import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoute from "./routes/auth.js"
import userRoute from "./routes/users.js"
import videoRoute from "./routes/videos.js"
import commentRoute from "./routes/comments.js"
import cookieParser from "cookie-parser"
const PORT =8000
const app = express();

dotenv.config()


// user toute pe bejna hai mne 
app.use(cookieParser())
app.use(express.json())
app.use("/apis/auth", authRoute)
app.use("/apis/user", userRoute)
app.use("/apis/video", videoRoute)
app.use("/apis/comment", commentRoute)

app.use((error,req,res,next)=>{
    const status = error.status || 500;
    const message = error.message || "some thing is wrong ";
    return res.status(status).json({
        success:false,
        status,
        message,
    })
})

 const connectDb = () => {

    console.log("Connect Database")

    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}



        app.listen(PORT, () => {
            connectDb()

            console.log("Server is working")
        
        })
 