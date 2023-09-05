import  express  from "express";
import { addvideo, updatevideo ,deletevideo,getvideo,addview,trend,random,subscribeVedio,searchByTagg,searchByTitle} from "../controller/video.js";
const router = express.Router();
import {verifyToken} from "../verifyToken.js"

// add a video
router.post("/addvideo",verifyToken, addvideo)

// update video
router.put("/:id",verifyToken, updatevideo)

// delete video
router.delete("/:id",verifyToken, deletevideo)

// get video
router.get("/find/:id",verifyToken, getvideo)

// add view
router.put("/view/:id",addview)

// trending view
router.get("/trend",trend)

// add view
router.get("/random",random)

// sub 
router.get("/subscribevideo",subscribeVedio)

// search by tagg
router.get("/tags",searchByTagg)

// search by title
router.get("/search",searchByTitle)



// export the route
export default router;