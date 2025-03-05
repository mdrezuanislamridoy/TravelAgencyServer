const Message = require("../models/MessageModel");
const User = require("../models/User");

exports.sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, message } = req.body;
    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);
    if (!sender || !receiver) {
      return res.status(404).json({ error: "User not found" });
    }
    const newMessage = await Message.create({
      sender: senderId,
      receiver: receiverId,
      message,
    });

    res.status(201).json({ message: newMessage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
  `    `;
};
exports.getMessages = async (req, res) => {
  try {
    const { senderId, receiverId } = req.params;
    const messages = await Message.find({
      $or: [
        { sender: senderId, receiver: receiverId },
        { sender: receiverId, receiver: senderId },
      ],
    });
    res.status(200).json({ messages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.markMessageAsRead = async (req, res) => {
  try {
    const { messageId } = req.params;
    const message = await Message.findByIdAndUpdate(
      messageId,
      { read: true },
      { new: true }
    );
    res.status(200).json({ message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
