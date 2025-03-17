import { User } from "../models/user.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
    // if the user is valid the its cookies shall definitely have the access token,
    // from that token, after decoding extract the pyaload, access token payload contained everythin except _id
    // find the user by _id, and then attact it with the req by req.user, 
    // so on whichever url this midddleare is injected, 
    // that path will have access this user information
    try {
        const token = req.cookies?.accessToken || req.headers["authorization"]?.replace("Bearer ", "");
        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }

        // verify the token against access token secret
        const decodedToken = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        console.log("decoded token has the following information: ", decodedToken)

        // The decodedToken will contain the payload that was originally signed when creating the JWT.
        // If _id was included in the payload during token generation, then decodedToken._id will be present.
        // access token was given everything in payload while refresh token was given only _id
        // due to this reason, we can use decodedToken._id to fetch the user from the database as we are doing below

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
        if (!user) {
            throw new ApiError(401, "Invalid access token")
        }

        req.user=user;

    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }
})