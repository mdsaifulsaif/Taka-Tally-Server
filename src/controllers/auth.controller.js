const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

async function registerUser(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "pleas inter your email and password" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User alrady exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      name,
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
      secure: false, // প্রোডাকশনে true করো
      sameSite: "lax",
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

// 🔹 লগইন ফাংশন
async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    // find user in userModel.collection
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Wrong email" });
    }

    // sceck password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Wrong Password " });
    }

    // make token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // set token
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // প্রোডাকশনে true করো
      sameSite: "lax",
    });

    res.json({ message: "Login successfully", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
}

async function cureentUser(req, res) {
  const token = req.cookies.token;

  console.log(token);

  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded, "decoded tokenmmmmmmmmmm");
    const user = await userModel.findById(decoded.id).select(-"password");
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

module.exports = { registerUser, loginUser, loginOut, cureentUser };
