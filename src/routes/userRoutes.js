const express = require("express");
const { userRegValidation } = require("../validation/userValidation");
const { userRegister } = require("../controllers/userController");
const userRoutes = express.Router();

userRoutes.post("/register", userRegValidation, userRegister);

module.exports = userRoutes;