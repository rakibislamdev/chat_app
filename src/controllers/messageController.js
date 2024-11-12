const httpStatus = require("http-status");
const { successResponse, errorResponse } = require("../helpers/response");
const { sendMessageService, getChatHistoryService } = require("../services/messageService");

const sendMessage = async (req, res) => {
    try {
        const message = req.body || {};
        const newMessage = await sendMessageService(message);
        return successResponse({ res, message: "Message sent", data: newMessage, code: httpStatus.CREATED });
    } catch (error) {
        return errorResponse({ res, message: error.message, code: httpStatus.BAD_REQUEST });
    }
};

// Get chat history between two users
const getChatHistory = async (req, res) => {
    try {
        const { sender, receiver } = req.body || {};
        const chatHistory = await getChatHistoryService(sender, receiver);
        return successResponse({ res, message: "Chat history", data: chatHistory, code: httpStatus.OK });
    } catch (error) {
        return errorResponse({ res, message: error.message, code: httpStatus.BAD_REQUEST });
    }
};


module.exports = {
    sendMessage,
    getChatHistory
};