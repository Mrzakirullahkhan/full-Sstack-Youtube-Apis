import  express  from "express";
import { addComments ,getComments,deleteComments} from "../controller/comment.js";
import {verifyToken} from "../verifyToken.js"
const router = express.Router();

// add comments
router.post("/addcomments",verifyToken, addComments)

// get comments
router.get("/:videoId", getComments)


// delete comments
router.delete("/:id",verifyToken, deleteComments)



// export the route
export default router;