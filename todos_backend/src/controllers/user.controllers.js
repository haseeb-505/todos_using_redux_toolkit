import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";
import { uploadaToCloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";

const generateAccessRefreshToken = async(userId) => {
  try {
    const user = await User.findById(userId)
    const accessToken = await user.generateAccessToken()
    const refreshToken = await user.generateRefreshToken()
  
    // save the refresh token created now in db against current user
    user.refreshToken = refreshToken
  
    await user.save({validateBeforeSave: false})
  
    return [accessToken, refreshToken]
  } catch (error) {
    console.error("Token generation error:", error);
    throw new ApiError(500, "Token generation failed, server failure")
  }

}

// functionalities for user
// registerUser, loginUser, logoutUser, refreshAccessToken,
// updatePassword, updateAccountDetails, updateUserAvatar, updateCoverImage
// updateAccountDetails

const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  // validation whether username or email is empty, 
  // or email is in correct format
  // check  if user already exists (unique email and username)
  // check for images
  // check for avatar
  // upload to cloudinary
  // check for avatar on cloudinary
  // create user object - create entry in db
  // remove password and refresh token field from response
  // check for user creation
  // return response

  // Extract fields from the request body
  const { username, email, fullName, password, confirmPassword } = req.body;
  // Log the received data
  console.log('Received user data:', { username, email, fullName, password, confirmPassword });

  if (
    [ username, email, fullName, password, confirmPassword ].some( (field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "Please fill all the fields")
  }

  // user already exists
  const existingUser = await User.findOne({
    $or: [{username}, {email}]
  });
  if (existingUser) {
    return res.status(400).json({message: "Username or email already exists"})
  }

  // check for avatar and extract its path
  const avatarLocalPath = req.files?.avatar[0].path;
  // avatar for is optional for time being
  // if (!avatarLocalPath) {
  //   throw new ApiError(400, "Avatar Local file path not found!")
  // }

  // coverImage
  const coverImageLocalPath = req.files?.coverImage[0].path;
  // we do not need to throw error if cover Image is not found as it is optional in this case

  // upload these files to cloudinary
  const avatar = await uploadaToCloudinary(avatarLocalPath);
  const coverImage = await uploadaToCloudinary(coverImageLocalPath);

  // check if avatar is uploaded to cloudinary
  // we made avtar optiona as well
  // if (!avatar) {
  //   throw new ApiError(400, "Please upload an avatar")
  // }

  // check if confrim password value is same as of password value
  if (confirmPassword !== password) {
    throw new ApiError("Confirm password does not match with password")
  }

  // create user object and save it in db
  const user = await User.create({
    username: username.toLowerCase(),
    email: email.toLowerCase(),
    fullName: fullName,
    avatar: avatar?.url || "",
    coverImage: coverImage?.ulr || "",
    password: password
  });

  // check user creation
  if (!user) {
      throw new ApiError(500, "User could not be created")
  }


  // remove password and refresh token field from response
  const createdUser = await User.findById(user._id).select("-password -refreshToken")

  // Send a response back to the frontend
  res.status(201).json(
    new ApiResponse(200, createdUser, "User Created Successfully!")
  );
});

// loginUser
const loginUser = asyncHandler(async (req, res) => {
  // fetch the data through req.body
  // check if username or email is present
  // check if user exist with these credentials
  // check if password is correct
  // generate access token and refresh token
  // send token to secure cookies

  const {email, username, password} = req.body;
  // log the data
  console.log("Recieved User data for login page is: ", email, username, password);

  if (!username && !email) {
    return res.status(400).json({message: "One of the username or email is must"})
  }

  // find user by username or email
  const user = await User.findOne({
    $or: [{username}, {email}]
  })
  if (!user) {
    return res.status(401).json({message: "no user found with these credentials"})
  }

  // password check
  const isPasswordCorrect = await user.isPasswordSame(password)
  if (!isPasswordCorrect) {
    console.log("Incorrect Password")
    return res.status(404).json({message: "user password is incorrect"})
  }
  
  // generate access and refresh token
  const [accessToken, refreshToken] = await generateAccessRefreshToken(user._id)
  if (!accessToken || !refreshToken) {
    throw new ApiError(500, "token generation failed")
  }
  // send token to secure cookies without password
  const loggedInUser = await User.findById(user._id).select("-password -refreshToken")
  
  // now send the data
  const options = {
    httpOnly: true, // to prevent xss attacks, cookies can only be modified by server. can be seen by browser but can't be modified
    secure: true,
  }



  // send the response back to frontend
  res.status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
          new ApiResponse(200, 
              // data field below
              {
                  user: loggedInUser, accessToken, refreshToken
              },
              // message field below
              "User logged in successfully"
          )
      )
})

// logout user
const logoutUser = asyncHandler( async (req, res) => {
  // since on logout route, we have verifyJWT, 
  // which checks if the current user the accesstoken
  // if so, we extract the user and then from its decoded payload,
  // we get _id of the current user and attach it with req
  // so we find the user by id here and update the refresh token to undefined so the user can't access its login session again
  // update the refresh token to undefined so the user can't access its login session again
  // Model.findByIdAndUpdate(id, update, options, callback);
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined
      }
    },
    { // send the option with accepting new value
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  }

// now send the response and remove the access and refresh token cookies
return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(
          new ApiResponse(200, null, "user logged out!")
        )

});

// current usre information
const refreshAccessToken = asyncHandler(async (req, res) => {
  // get the refresh token from the cookies
  // check if refresh token is valid
  // decode the token to extract current user id from payload
  // get the user from the refresh token
  // match the refresh token in db with the incoming refresh token
  // generate new access token
  // send the new access token

  const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
  if (!incomingRefreshToken) {
    // when attached to backend, comment the next code line
    // and uncomment the return line
    throw new ApiError(401, "Please login to conitnue")
    // return res
    //       .status(401)
    //       .json(
    //           new ApiResponse(401, null, "Please login to continue")
    //         )
  }

  // decode the token to get id of current user
  // comapre the incomig accesstoken with .env accessToken
  try {
    const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)
    if (!decodedToken) {
      throw new ApiError(401, "Invalid refresh token")
      // return res.status(401).json(
      //   new ApiResponse(401, null, "Invalid refresh token")
      // )
    }
  
    const user = await User.findById(decodedToken?._id);
    if (!user) {
      throw new ApiError(401, "Invalid refresh token")
      // return res.status(401).json(
      //   new ApiResponse(401, null, "Invalid refresh token")
      // )
    }
  
    // match the refresh token in db with the incoming refresh token
    if (user?.refreshToken !== incomingRefreshToken) {
      throw new ApiError(401, "Refresh Token is expired")
      // return res.status(401).json(new ApiResponse(401, null, "Refresh Token is expired"))
    }
  
    // create new refreshToken
    const options = {
      httpOnly: true,
      secure: true
    }
  
    const {accessToken, newRefreshToken} = await generateAccessRefreshToken(user._id)
  
    return res
          .status(200)
          .cookie("accessToken", accessToken, options)
          .cookie("refreshToken", newRefreshToken, opitions)
          .json(
            new ApiResponse(200, {
                accessToken,
                refreshToken: newRefreshToken
              },
              "Access token is refreshed successfully"
            )
          )
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh Token")
  }
})

export { 
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
 };