const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

async function registerUser(req, res) {
  try {
    const { name, email, phoneNumber, password } = req.body;
    console.log("user phone number", phoneNumber);

    if (!name || !phoneNumber || !password) {
      return res
        .status(400)
        .json({ message: "pleas inter your email and password" });
    }

    // 2. Phone number length & digits check
    const phoneRegex = /^[0-9]{11}$/;
    if (!phoneRegex.test(phoneNumber)) {
      return res.status(400).json({
        message: "Phone number must be exactly 11 digits and numeric only",
      });
    }

    const existingUser = await userModel.findOne({ phoneNumber });
    if (existingUser) {
      return res.status(400).json({ message: "User alrady exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      name,
      phoneNumber,
      email,
      password: hashedPassword,
    });

    // make token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // set token
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    return res.status(201).json({
      message: "User created successfully",
      newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
}

async function loginUser(req, res) {
  try {
    const { phoneNumber, password } = req.body;

    const user = await userModel.findOne({ phoneNumber });
    if (!user) {
      return res.status(400).json({ message: "Invalid User" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Wrong Password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.json({
      message: "Login successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
}

async function currentUser1(req, res) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ user });
  } catch (error) {
    return error.status(401).json({ message: "Invalid token" });
  }
}

function loginOut(req, res) {
  res.clearCookie("token");
  res.status(200).json({
    message: "User logged out successfully",
  });
}

module.exports = {
  registerUser,
  loginUser,
  loginOut,
  currentUser1,
};
