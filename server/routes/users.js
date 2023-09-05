import  express  from "express";
import { update, deleteUser,getUser,subscribe,unSubscribe,likevideo,dislikevideo} from "../controller/user.js";
import {verifyToken} from "../verifyToken.js"
const router = express.Router();


// update user
router.put("/:id",verifyToken, update)


// delete user
router.delete("/:id",verifyToken, deleteUser)


// getUser user
router.get("/find/:id", getUser)


// subscribe a user
router.put("/subscribe/:id",verifyToken, subscribe)


// unsubscribe a user
router.put("/unsubscribe/:id", verifyToken,unSubscribe)


  // like video  function 
router.put("/:id",verifyToken, likevideo)


  // un-like video  function 
router.put("/:id",verifyToken, dislikevideo)



// export the route
export default router;