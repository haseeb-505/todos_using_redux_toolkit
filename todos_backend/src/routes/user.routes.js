import { Router } from "express";
import { 
    registerUser,
    loginUser,
 } from "../controllers/user.controllers.js";

 import { upload } from "../middlewares/multer.middleware.js";
 import { verifyJWT } from "../middlewares/auth.middleware.js"

const router = Router()

// registration route with multer upload function
router.route("/register").post(upload.fields([
    {
        name: "avatar",
        maxCount: 1,
    },
    {
        name: "coverImage",
        maxCount: 1
    }
]), registerUser);
// login route
router.route("/login").post(loginUser)


export default router