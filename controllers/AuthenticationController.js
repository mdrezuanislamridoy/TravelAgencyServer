const bcrypt = require("bcrypt");
const User = require("../models/UserModel");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

exports.verifyCode = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  console.log(email);

  const isUser = await User.findOne({ email });
  if (isUser) {
    return res.status(400).send({ message: "User already exists" });
  }

  const verificationCode = Math.floor(
    100000 + Math.random() * 900000
  ).toString();

  const token = jwt.sign({ verificationCode, email }, "my-secret-key", {
    expiresIn: "15m",
  });

  const mailOptions = {
    from: "RR Travel Agency",
    to: email,
    subject: `Your verification code ${verificationCode}`,
    text: `Use the code to verify your email: ${verificationCode}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res
        .status(500)
        .json({ message: "Failed to send verification email" });
    }
    res.status(200).json({
      message: "Verification email sent. Please check your inbox.",
      token,
    });
  });
};

exports.SignUp = async (req, res) => {
  try {
    console.log("Received Data:", req.body);

    const { name, email, password, enteredCode, token, role } = req.body;

    if (!token) {
      return res.status(400).send({ message: "No token provided" });
    }

    jwt.verify(token, "my-secret-key", async (err, decoded) => {
      if (err) {
        return res.status(400).send({ message: "Invalid or expired token" });
      }

      const { verificationCode, email: tokenEmail } = decoded;

      if (email !== tokenEmail) {
        return res.status(400).send({ message: "Email does not match" });
      }
      if (enteredCode !== verificationCode) {
        return res.status(400).send({ message: "Email verification failed" });
      }

      if (!name || !email || !password || !role) {
        return res.status(400).send({ message: "All fields are required" });
      }

      const isUser = await User.findOne({ email });
      if (isUser) {
        return res.status(400).send({ message: "User already exists" });
      }

      console.log("✅ Creating new user...");
      const hashedPass = await bcrypt.hash(password, 10);
      const newUser = new User({
        name,
        email,
        password: hashedPass,
        role,
      });

      const authToken = await jwt.sign(
        { id: newUser._id, email, role },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );

      await newUser.save();
      console.log("✅ User registered successfully.");

      res.status(201).send({ message: "User registered successfully" });
    });
  } catch (error) {
    res.status(500).send({ message: "Server error" });
  }
};

exports.LogIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({ message: "All fields are required" });
    }

    const user = await User.findOne({ email }).select("-password");

    if (!user) {
      return res.status(400).send({ message: "User doesn't exists" });
    }

    const token = await jwt.sign(
      { id: user._id, email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(201).json({ user, message: "Login successful", token });
    console.log(user);
  } catch (error) {
    res.status(500).send({ message: "Server error" });
  }
};

exports.myData = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(400).send({ message: "No token provided" });
    }
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(400).send({ message: "Invalid or expired token" });
      }
      const user = await User.findById(decoded.id).select("-password");
      if (!user) {
        return res.status(400).send({ message: "User doesn't exists" });
      }
      res.status(200).send({ user });
    });
  } catch (error) {
    return res.status(500).send({ message: "Server error" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User doesn't exist" });
    }
    if (user.email !== email) {
      const isEmailTaken = await User.findOne({ email });
      if (isEmailTaken) {
        return res.status(400).json({ message: "Email is already taken" });
      }
    }

    if (password) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Password is incorrect" });
      }
      user.password = await bcrypt.hash(password, 10);
    }

    user.name = name;
    user.email = email;

    const updatedUser = await user.save();

    res.status(200).json({ updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
