import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";
import { uploadaToCloudinary } from "../utils/cloudinary.js";


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

export { 
  registerUser,
  loginUser,
 };