import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { apiErrorResponse } from "../src/middlewares/apiErrorResponse.middleware.js";

const app = express();

app.use( cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

// data handling settings
app.use(express.json({limit: "16Kb"}));

// urlencoding
app.use(express.urlencoded({extended: true}));

// statis data folder
app.use(express.static("public"))

// cookie parser
app.use(cookieParser())

// error handling middleware for all routes
app.use(apiErrorResponse)

//routes import 
import userRouter from "./routes/user.routes.js";
import todoRouter from "./routes/todo.routes.js"


// routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/todos", todoRouter);


export { app }