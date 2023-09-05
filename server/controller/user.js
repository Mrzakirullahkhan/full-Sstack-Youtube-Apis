import User from "../models/User.js"


// update user function 
export const update = async (req,res,next)=>{
   if (req.params.id===req.user.id) {
    try {
        const updateUser = await User.findByIdAndUpdate(req.params.id,{
            $set:req.body,
        },{new:true}
        );
        res.status(200).json(updateUser)
    } catch (error) {
        next(error)
    }
   } else {
    res.status(403).json("you can only update your account!!")
   }
}

// delete user function 
export const deleteUser =async (req,res,next)=>{
    if (req.params.id===req.user.id) {
        try {
             await User.findByIdAndDelete(req.params.id)
            res.status(200).json("User has been deleted")
        } catch (error) {
            next(error)
        }
       } else {
        res.status(403).json("you can only delete your account!!")
       }
 }

 // getuser  function 
export const getUser = async(req,res,next)=>{
    try {
        const currentUser = await User.findById(req.params.id)
        res.status(200).json(currentUser)
    } catch (error) {
        next(error)
    }
}

 // subscribe a user  function 
 export const  subscribe = async(req,res,next)=>{
    try {
        await User.findByIdAndUpdate(req.user.id,{
            $push:{subscribedUsers:req.params.id},
        });
        await User.findByIdAndUpdate(req.params.id,{
            $inc:{subscribers:1}
        });
        res.status(200).json("subscription successfully !!")
    } catch (error) {
        next(error)
    }
 }

 // unsubscribe a user  function 
 export const unSubscribe = async(req,res,next)=>{
    try {
        await User.findByIdAndUpdate(req.user.id,{
            $pull:{subscribedUsers:req.params.id},
        });
        await User.findByIdAndUpdate(req.params.id,{
            $inc:{subscribers:-1}
        });
        res.status.json("Unsubscription successfully !!")
    } catch (error) {
        next(error)
    }
 }

  // like video  function 
  export const likevideo = async(req,res,next)=>{
    try {
        
    } catch (error) {
        next(error)
    }
  }

   // un-like video  function 
   export const dislikevideo = async(req,res,next)=>{
    try {
        
    } catch (error) {
        next(error)
    }
   }