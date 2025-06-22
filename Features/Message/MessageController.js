const User = require("../../Authentication/UserModel");
const Message = require("./MessageModel");
const Conversation = require("../Conversation/conversationModel");

exports.sendMessage = async (req, res) => {
  try {
    const senderId = req.cookies.userId;
    const receiverId = req.params.id;

    const { message } = req.body;

    if (!message || !receiverId) {
      return res
        .status(400)
        .json({ error: "Message and receiverId are required" });
    }
    const conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      const newConversation = new Conversation({
        sender: senderId,
        receiver: receiverId,
      });
      await newConversation.save();
    }

    const newMessage = new Message({
      sender: senderId,
      receiver: receiverId,
      message: message,
    });

    conversation.messages.push(newMessage._id);
    Promise.all([conversation.save(), newMessage.save()])
      .then(() => {
        res
          .status(200)
          .json({
            message: "Message sent successfully",
            messageData: newMessage,
          });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      });

    await newMessage.save();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.getMessages = async (req, res) => {
  try {
    const userId = req.cookies.userId;
    const { id } = req.params;
    if (!userId || !id) {
      return res
        .status(400)
        .json({ error: "User ID and conversation ID are required" });
    }

    const conversation = await Conversation.findOne({
      members: { $all: [userId, id] },
    }).populate("messages");

    if (!conversation) {
      await Conversation.create({
        members: [senderId, receiverId],
        messages: [],
      });
      return res
        .status(200)
        .json({ message: "No previous messages", messages: [] });
    }

    return res.status(200).json({
      message: "Messages retrieved successfully",
      messages: conversation.messages,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
