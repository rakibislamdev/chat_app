const express = require("express");
const { messageValidation, chatHistoryValidation } = require("../validation/messageValidation");
const { sendMessage, getChatHistory } = require("../controllers/messageController");
const jwtMiddleware = require("../utils/authMiddleware");

const messageRoutes = express.Router();
messageRoutes.post("/send", messageValidation, jwtMiddleware, sendMessage);
messageRoutes.post("/history", chatHistoryValidation, jwtMiddleware, getChatHistory);

module.exports = messageRoutes;