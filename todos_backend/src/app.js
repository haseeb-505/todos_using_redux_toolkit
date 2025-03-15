import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

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
app.use(cookieParser)

export { app }