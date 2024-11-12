const Message = require("../models/messageModel");

const sendMessageService = async (message) => {
    try {
        return await Message.create(message);
    } catch (error) {
        throw new Error(error);
    }
};

// Get chat history between two users
const getChatHistoryService = async (sender, receiver) => {
    try {
        return await Message
            .find({
                $or: [
                    { sender, receiver },
                    { sender: receiver, receiver: sender },
                ],
            })
            .populate("sender")
            .populate("receiver")
            .sort({ createdAt: -1 });
    } catch (error) {
        throw new Error(error);
    }
};



module.exports = {
    sendMessageService,
    getChatHistoryService
};