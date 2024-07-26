const express = require("express");
const { userRegValidation, userLoginValidation } = require("../validation/userValidation");
const { userRegister, userLogin, userDetails } = require("../controllers/userController");
const upload = require("../config/multer");
const userRoutes = express.Router();

userRoutes.post("/register", upload.single("avatar"), userRegValidation, userRegister);
userRoutes.post("/login", userLoginValidation, userLogin);
userRoutes.get("/user-details", userDetails);

module.exports = userRoutes;