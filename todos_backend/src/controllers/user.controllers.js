import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req, res) => {
  // Extract fields from the request body
  const { username, email, fullName, password, confirmPassword } = req.body;
  // Log the received data
  console.log('Received user data:', { username, email, fullName, password, confirmPassword });

  // Send a response back to the frontend
  res.status(200).json({
    message: 'User registration successful',
    user: { username, email, fullName },
  });
});

// loginUser
const loginUser = asyncHandler(async (req, res) => {
  const {email, username, password} = req.body;
  // log the data
  console.log("Recieved User data for login page is: ", email, username, password);

  // send the response back to frontend
  res.status(200)
      .json({
        message: 'User registration successful',
        user: { username, email, fullName },
      })
})

export { 
  registerUser,
  loginUser,
 };