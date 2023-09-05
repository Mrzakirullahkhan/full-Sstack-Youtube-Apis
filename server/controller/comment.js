import Comment from "../models/Comment.js"
import Video from "../models/Video.js"

// add comments function 
export const addComments = async(req,res,next)=>{
    const newComment = new Comment({...req.body, userId:req.user.id})
    try {
        const saveComment = await newComment.save();
        res.status(200).json(saveComment)
    } catch (error) {
        next(error)
    }
}


// get comments function 
export const getComments = async(req,res,next)=>{
    try {
        const comment = await Comment.find({videoId:req.params.videoId})
        res.status(200).json(comment);
    } catch (error) {
        next(error)
    }
}

// delete comments function 
export const deleteComments = async(req,res,next)=>{
    try {
        const comment =await Comment.findById(res.params.id)
        const video =await Video.findById(res.params.id);
        if(req.user.id === comment.userId || req.user.id === video.userId){
            await Comment.findByIdAndDelete(req.params.id)
            res.status(200).json("comment deleted ")
        }else{
            return res.status(403).json("you can delete your comment")
        }
    } catch (error) {
        next(error)
    }
}