const User = require("../models/User");
const FriendModel = require("../models/FriendsModel");
require("dotenv").config();

exports.sendFriendRequest = async (req, res) => {
  try {
    const { userId, friendId } = req.body;
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      return res.status(404).json({ error: "User not found" });
    }
    if (user.friends.includes(friendId)) {
      return res.status(400).json({ error: "Friend request already sent" });
    }

    const newReq = await FriendModel.create({
      sender: userId,
      receiver: friendId,
    });

    res
      .status(201)
      .json({ request: newReq, message: "Friend Request sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.acceptFriendRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const request = await FriendModel.findByIdAndUpdate(requestId, {
      new: true,
    });
    res.status(200).json({
      success: true,
      message: "Friend request accepted",
      request,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getFriendRequests = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const friendRequests = await FriendModel.find({
      receiver: userId,
      status: "pending",
    });
    res.status(200).json({ friendRequests });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.getFriends = async (req, res) => {
  const friends = await FriendRequest.find({
    $or: [{ sender: req.user._id }, { receiver: req.user._id }],
    status: "accepted",
  }).populate("sender receiver", "name email");

  res.status(200).json({
    success: true,
    friends,
  });
};
