import  express  from "express";
import { signUp, login} from "../controller/auth.js";
const router = express.Router();


// user registration
router.post("/signup", signUp)


// user login 
router.post("/login",login)



// user signup from google 
router.post("/google",)



// export the route
export default router;