import ErrorHandler from "../middlewares/error.js";
import { Authentication } from "../models/authController.js";


const send_auth = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return next(new ErrorHandler("Please Fill Full Authentication Form!", 400));
  }

  try {
    await Authentication.create({ username, password});
    res.status(201).json({
      success: true,
      message: "Authentication Created Successfully!",
    });
  } catch (error) {
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return next(new ErrorHandler(validationErrors.join(', '), 400));
    }

  
    // Handle other errors
   return next(error);
    
  }
};

export default send_auth;

