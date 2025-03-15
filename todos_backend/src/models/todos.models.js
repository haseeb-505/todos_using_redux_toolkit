import mongoose, { Schema } from "mongoose";

// schema of todos => id, owner, title, content/description, 
// image(optional), isDone (todo is done or not)
const todoSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    description: {
        type: String,
        trim: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    image: {
        type: String,
    },
    isDone: {
        default: false,
    },
}, {timeseries: true});

export const Todo = mongoose.model("Todo", todoSchema);