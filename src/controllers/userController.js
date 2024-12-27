const httpStatus = require("http-status");
const { userRegisterService, findUserByEmailService, findUserByIdService, updateUserService } = require("../services/userService");
const { hashPassword, comparePassword } = require("../helpers/hashPassword");
const { successResponse, errorResponse, successResponseWithToken } = require("../helpers/response");
const { generateAccessToken, generateRefreshToken } = require("../helpers/token");
const fs = require("fs");

const userRegister = async (req, res) => {
  try {
    const user = req.body || {};

    // Check if user exists
    const userExists = await findUserByEmailService(user.email);
    if (userExists) {
      return errorResponse({ res, message: "User already exists", code: httpStatus.CONFLICT });
    }
   
    // For image
    if (req.file) {
      user.avatar = req.file.path;
    }

    // Hash password
    const hash_pass = hashPassword(user.password);
    user.password = hash_pass;

    // Call the service
    const newUser = await userRegisterService(user);

    // Return success response
    return successResponse({
      res,
      message: "User registered successfully",
      data: newUser,
      code: httpStatus.CREATED,
    });

  } catch (error) {
    return errorResponse({ res, message: error.message, code: httpStatus.BAD_REQUEST });
  }
};


const userLogin = async (req, res) => {
  try {
    const user = req.body;
    const foundUser = await findUserByEmailService(user.email);
    if (!foundUser) {
      return errorResponse({ res, message: "User not found", code: httpStatus.NOT_FOUND });
    }
    const match = await comparePassword(user.password, foundUser.password);
    if (!match) {
      return errorResponse({ res, message: "Invalid password", code: httpStatus.UNAUTHORIZED });
    }

    // Generate access token and refresh token
    const accessToken = await generateAccessToken(foundUser);
    const refreshToken = await generateRefreshToken(foundUser);

    return successResponseWithToken({ res, message: "Login successful", data: foundUser, accessToken, refreshToken, code: httpStatus.OK });
    
  } catch (error) {
    return errorResponse({ res, message: error.message, code: httpStatus.BAD_REQUEST });
    
  }
};


const userDetails = async (req, res) => {
  try {
    const id  = req.params.id || {};
    
    const user = await findUserByIdService(id);
    if (!user) {
      return errorResponse({ res, message: "User not found", code: httpStatus.NOT_FOUND });
    }
    return successResponse({ res, message: "User details", data: user, code: httpStatus.OK });
  } catch (error) {
    return errorResponse({ res, message: error.message, code: httpStatus.BAD_REQUEST });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = req.body;
    // Check if user exists
    const userExists = await findUserByIdService(user.id);
    if (!userExists) {
      return errorResponse({ res, message: "User not found", code: httpStatus.NOT_FOUND });
    }

    // For image
    if (req.file) {
      // Delete the old image
      if (userExists.avatar) {
        fs.unlinkSync(userExists.avatar);
      }
      user.avatar = req.file.path;
    }
    const updatedUser = await updateUserService(id, user);
    return successResponse({ res, message: "User updated successfully", data: updatedUser, code: httpStatus.OK });
  } catch (error) {
    return errorResponse({ res, message: error.message, code: httpStatus.BAD_REQUEST });
  }
};
const deleteUser = async (req, res) => {};

module.exports = {
  userRegister,
  userLogin,
  userDetails,
  updateUser,
  deleteUser,
};
