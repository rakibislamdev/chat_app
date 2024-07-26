const express = require("express");
const { userRegValidation, userLoginValidation } = require("../validation/userValidation");
const { userRegister, userLogin } = require("../controllers/userController");
const upload = require("../config/multer");
const userRoutes = express.Router();

userRoutes.post("/register", upload.single("avatar"), userRegValidation, userRegister);
userRoutes.post("/login", userLoginValidation, userLogin);

module.exports = userRoutes;