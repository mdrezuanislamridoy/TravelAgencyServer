const mongoose = require("mongoose");
const User = require("../../Authentication/UserModel");
const Message = require("../Message/MessageModel");

const conversationSchema = new mongoose.Schema({
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
    },
  ],
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: Message,
      required: true,
      default: [],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Conversation = mongoose.model("Conversation", conversationSchema);

module.exports = Conversation;
