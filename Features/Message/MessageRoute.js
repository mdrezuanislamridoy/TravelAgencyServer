const express = require("express");
const messageRouter = express.Router();
const Message = require("./MessageController");
const { IsUser } = require("../../middleware/JWTAuth");

messageRouter.post("/send", IsUser, Message.sendMessage);
messageRouter.get("/:id", IsUser, Message.getMessages);

module.exports = messageRouter;
