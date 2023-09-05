import mongoose from "mongoose";
import User from "../models/User.js"
import bcryptjs from "bcryptjs";
import jwtoken from "jsonwebtoken";


// create function for user 

export const signUp = async (req, res, next) => {
    try {
        const salt = bcryptjs.genSaltSync(10);
        const hash = bcryptjs.hashSync(req.body.password, salt);
        const newUser = new User({ ...req.body, password : hash})

        const user = await newUser.save()
        res.status(200).json(user)
      
    } catch (error) {
       next(error)
    }
}

// login function 

export const login = async (req, res, next) => {
    try {
      const user = await User.findOne({username:req.body.username});
      if(!user) return res.status(404).json("username not found")
      
      const isCorrectPas = await bcryptjs.compare(req.body.password, user.password)
      if(!isCorrectPas) return res.status(400).json("incorrect password")
      const token = jwtoken.sign({id:user._id},process.env.jwt)
      const {password, ...others} = user._doc;
      res.cookie("access_token",token,{
          httpOnly:true
      }).status(200).json(others)

    } catch (error) {
       next(error)
    }
}