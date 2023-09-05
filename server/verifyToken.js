import jwtoken from "jsonwebtoken";


export const verifyToken = (req,res,next)=>{
    const token = req.cookies.access_token;
    if(!token) return res.status(404).json("you are not authanticated")
    
    jwtoken.verify(token,process.env.jwt, (err,user)=>{
    if(err) return res.status(403).json("token is not valid");
    req.user = user;
    next()
});
};

