const express = require("express");
const { userRegValidation, userLoginValidation, userUpdateValidation, userDetailsValidation } = require("../validation/userValidation");
const { userRegister, userLogin, userDetails, updateUser } = require("../controllers/userController");
const upload = require("../config/multer");
const jwtMiddleware = require("../utils/authMiddleware");
const userRoutes = express.Router();

// userRoutes.post("/register", userRegValidation, upload.single("avatar"), userRegister);
userRoutes.post("/signup", upload.single("avatar"), userRegValidation, userRegister);
userRoutes.post("/signin", userLoginValidation, userLogin);
userRoutes.get("/user-details/:id", jwtMiddleware, userDetails);
userRoutes.post("/update", upload.single("avatar"), userUpdateValidation, updateUser);

module.exports = userRoutes;