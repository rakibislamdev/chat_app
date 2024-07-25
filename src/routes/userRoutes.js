const express = require("express");
const { userRegValidation, userLoginValidation } = require("../validation/userValidation");
const { userRegister, userLogin } = require("../controllers/userController");
const userRoutes = express.Router();

userRoutes.post("/register", userRegValidation, userRegister);
userRoutes.post("/login", userLoginValidation, userLogin);

module.exports = userRoutes;