const express = require("express");
const { userRegValidation, userLoginValidation, userUpdateValidation } = require("../validation/userValidation");
const { userRegister, userLogin, userDetails, updateUser } = require("../controllers/userController");
const upload = require("../config/multer");
const userRoutes = express.Router();

// userRoutes.post("/register", userRegValidation, upload.single("avatar"), userRegister);
userRoutes.post("/register", upload.single("avatar"), userRegValidation, userRegister);
userRoutes.post("/login", userLoginValidation, userLogin);
userRoutes.get("/user-details", userDetails);
userRoutes.post("/update", upload.single("avatar"), userUpdateValidation, updateUser);

module.exports = userRoutes;