import Video from "../models/Video.js"
import User from "../models/User.js"

// add video
export const addvideo = async(req,res,next)=>{
const newVideo =  new Video({userId:req.user.id,...req.body})
try {
    const saveVideo = await newVideo.save();
    res.status(200).json(saveVideo)
    
} catch (error) {
    next(error)
}
}

// update video
export const updatevideo = async(req,res,next)=>{
    try {
        const video = await Video.findById(req.params.id)
        if(!video) return res.status(404).json("there is no any video !!")
        if(req.user.id === video.userId){
            const updateVideo = await Video.findByIdAndUpdate(req.params.id,{
                $set:req.body
            },{new:true} 
            );
            res.status(200).json(updateVideo)
        }
        else{
            res.status(404).json("you can update your video")
        }
    
    } catch (error) {
        
    }
}

// delete video
export const deletevideo = async(req,res,next)=>{
    try {
        const video = new Video.findById(req.params.id)
        if(!video) return res.status(404).json("there is no any video !!")
        if(req.user.id === video.userId){
        await Video.findByIdAndDelete(req.params.id);
            res.status(200).json("video delete successfully")
        }
        else{
            res.status(404).json("you can update your video")
        }
        
    } catch (error) {
        next(error)
    }
}

// get video
export const getvideo = async(req,res,next)=>{
    try {
        const video = await Video.findById(req.params.id)
        res.status(200).json(video)
    } catch (error) {
        next(error)
    }
}
// add view
export const addview = async(req,res,next)=>{
    try {
        await Video.findByIdAndUpdate(req.params.id,{
            $inc:{views:1}
        })
        res.status(200).json("added view successfully")
    } catch (error) {
        next(error)
    }
}

// trends view
export const trend = async(req,res,next)=>{
    try {
        const videos = await Video.find().sort({views:-1})
        res.status(200).json(videos)
    } catch (error) {
        next(error)
    }
}

//  random 
export const random = async(req,res,next)=>{
    try {
        const videos = await Video.aggregate([{$sample:{size:1}}])
        res.status(200).json(videos)
    } catch (error) {
        next(error)
    }
}

//  subscribeVedio isme tora msla hai 
export const subscribeVedio = async(req,res,next)=>{
    try {
        const user = await User.findById(req.user.id);
        const subscribedchannel = user.subscribedUsers;
        const list = await Promise.all(
            subscribedchannel.map((channelId)=>{
                return Video.find({userId:channelId})
            })
        )
        res.status(200).json(list.flat().sort((a,b)=> b.createdAt - a.createdAt))
    } catch (error) {
        next(error)
    }
}

// search by tagg
export const searchByTagg = async(req,res,next)=>{
    // addding taggs
    const tags = req.query.tags.split(",")
    
    try {
        const videos = await Video.find({tags:{$in: tags}}).limit(20);
        res.status(200).json(videos)
    } catch (error) {
        next(error)
    }
}

// search by title
export const searchByTitle =async(req,res,next)=>{
    // addding taggs
    const query = req.query.q;
    
    try {
        const videos = await Video.find({
            title:{ $regex: query, $options: "i"},
        }).limit(40);
        res.status(200).json(videos)
    } catch (error) {
        next(error)
    }
}