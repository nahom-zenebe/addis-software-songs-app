const User = require("../models/usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Helper function to create JWT
const createToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// 📌 Signup
exports.signup = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // 1️⃣ Check all fields
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // 2️⃣ Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ error: "Email already registered" });

    // 3️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4️⃣ Create user
    const user = await User.create({ name, email, password: hashedPassword, phone });

    // 5️⃣ Create token
    const token = createToken(user._id);

    // 6️⃣ Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });

    res.status(201).json({ message: "Signup successful", user: { id: user._id, name: user.name, email: user.email } });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📌 Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Check fields
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    // 2️⃣ Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    // 3️⃣ Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    // 4️⃣ Create token
    const token = createToken(user._id);

    // 5️⃣ Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000
    });

    res.json({ message: "Login successful", user: { id: user._id, name: user.name, email: user.email } });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📌 Logout
exports.logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict"
  });
  res.json({ message: "Logout successful" });
};
