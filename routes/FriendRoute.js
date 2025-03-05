const router = require("express").Router();
const { IsUser } = require("../middleware/JWTAuth");
const {
  sendFriendRequest,
  acceptFriendRequest,
  getFriendRequests,
  getFriends,
} = require("../controllers/FriendController");

router.post("/send", IsUser, sendFriendRequest);
router.put("/accept/:requestId", IsUser, acceptFriendRequest);
router.get("/requests", IsUser, getFriendRequests);
router.get("/friends", IsUser, getFriends);

module.exports = router;
