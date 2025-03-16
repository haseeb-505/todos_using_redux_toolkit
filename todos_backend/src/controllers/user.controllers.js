import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req, res) => {
  console.log('Request Body:', req.body); // Debugging: Check if the request body is received

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

export { registerUser };