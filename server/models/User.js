import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    // yha properties aengi ..
    username:{
        type:String,
        required:true,
        min:5,
        max:20,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        max:40,
        
    },
    password:{
        type:String,
        required:true,
        min:6,
        max:20,
    },
    img:{
        type:String,

    },
    subscribers:{
        type:Number,
        default:0
    },
    subscribedUsers:{
        type:[String],
        max:50,
    },
    
},
{ timestamps: true }
);

export default mongoose.model("User", userSchema)