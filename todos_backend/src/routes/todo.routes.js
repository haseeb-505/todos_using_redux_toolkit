import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { publishTodo } from "../controllers/todos.controllers.js";

const router = Router();

// every user to access todos shall be verified
router.use(verifyJWT);

// publish todo
router.route("/").post(publishTodo);


export default router




