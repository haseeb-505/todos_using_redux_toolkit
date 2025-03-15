import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async() => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONOGO_DB_URI}/${DB_NAME}`)
        // print a message for successfull connection
        console.log(`\n Mongo DB connedted successfully!!\n DB HOST/ ${DB_NAME}: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("MonogDB connection error: ", error);
        process.exit(1);
    }
}

export default connectDB;