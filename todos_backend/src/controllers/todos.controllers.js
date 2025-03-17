import {Todo} from "../models/todos.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHnadler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";

const publishTodo = asyncHnadler(async (req, res) => {
    // get the title and description from req.body
    // get the user from req.user
    // get the userId if needed
    // validations on title, description, and user
    // create the newTodo with this title and content
    // save the newTodo to db
    // return the response

    const {title, description} = req.body;
    const user = req.user;
    if (!user) {
        // 
        throw new ApiError(404, "User not found")
    }

    // title and description validation, here title only as title is the only required field
    if (title?.trim() === "") {
        throw new ApiError(404, "Title can't be empty")
    }

    // create newTodo
    const newTodo = new Todo({
        title: title.trim(),
        description: description.trim(),
        owner: user._id,
        image: "",
        isDone: true
    })

    // save the newTodo
    await newTodo.save();

    // return the respones
    return res
        .status(200)
        .json(
            new ApiResponse(200, newTodo, "New Todo is added Successfully")
        )
})


export {
    publishTodo,
}