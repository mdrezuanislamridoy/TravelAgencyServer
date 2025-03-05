const { IsUser } = require("../middleware/JWTAuth");
const {
  verifyCode,
  SignUp,
  LogIn,
  myData,
  updateUser,
} = require("../controllers/AuthenticationController");

const authRoute = require("express").Router();

authRoute.post("/verifyCode", verifyCode);
authRoute.post("/signup", SignUp);
authRoute.post("/login", LogIn);
authRoute.get("/me", IsUser, myData);
authRoute.put("/update/:id", IsUser, updateUser);

module.exports = authRoute;
