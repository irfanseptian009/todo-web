const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// User Registration
exports.registerUser = async (req, res) => {
  const { name, user_id, password } = req.body;

  if (!name || !user_id || !password) {
    return res.status(400).json({ message: "Please provide all fields" });
  }

  const userExists = await User.findOne({ user_id });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = await User.create({ name, user_id, password });
  res.status(201).json({
    _id: user._id,
    name: user.name,
    user_id: user.user_id,
    token: generateToken(user._id),
  });
};

// User Login
exports.loginUser = async (req, res) => {
  const { user_id, password } = req.body;
  const user = await User.findOne({ user_id });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      user_id: user.user_id,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};
