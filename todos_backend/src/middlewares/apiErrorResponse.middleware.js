import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";

const apiErrorResponse = asyncHandler(async (err, req, res, next) => {
    if (err instanceof ApiError) {
        res
        .status(err.StatusCode)
        .json({
            success: false,
            message: err.message,
            errors: err.errors,
        })
    } else{
        res
        .status(500)
        .json({
            success: false,
            message: "Internal Sever Error"
        })
    }
});

export {apiErrorResponse}


