const express = require("express");
const { messageValidation } = require("../validation/messageValidation");
const { sendMessage, getChatHistory } = require("../controllers/messageController");
const { verifyToken } = require("../helpers/token");

const messageRoutes = express.Router();
messageRoutes.post("/send", messageValidation, verifyToken, sendMessage);
messageRoutes.post("/history", verifyToken, getChatHistory);

module.exports = messageRoutes;