const httpStatus = require("http-status");
const { userRegisterService, findUserByEmailService } = require("../services/userService");
const { errorResponse, successResponse, successResponseWithToken } = require("../config/response");
const { hashPassword, comparePassword } = require("../helpers/hashPassword");
const { generateAccessToken, generateRefreshToken } = require("../config/token");

const userRegister = async (req, res) => {
  try {
    const user = req.body;
    const hash_pass = hashPassword(user.password);
    user.password = hash_pass;
    const newUser = await userRegisterService(user);

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
const userDetails = async (req, res) => {};
const updateUser = async (req, res) => {};
const deleteUser = async (req, res) => {};

module.exports = {
  userRegister,
  userLogin,
  userDetails,
  updateUser,
  deleteUser,
};
