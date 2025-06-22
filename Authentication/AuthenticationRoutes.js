const { IsUser } = require("../middleware/JWTAuth");

const {
  verifyCode,
  SignUp,
  LogIn,
  profile,
  updateUser,
  getAllUsers,
} = require("./AuthenticationController");

const authRoute = require("express").Router();

authRoute.post("/verifyCode", verifyCode);
authRoute.post("/signup", SignUp);
authRoute.post("/login", LogIn);
authRoute.get("/me", IsUser, profile);
authRoute.put("/update/:id", IsUser, updateUser);
authRoute.get("/getAllUsers", IsUser, getAllUsers);

authRoute.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
});

module.exports = authRoute;
