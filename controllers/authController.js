const { Request, Response } = require("express");
const mongoose = require("mongoose");

// MongoDB connection setup
mongoose.connect("mongodb://localhost:27017/focusflow", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define user schema
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

const UserModel = mongoose.model("User", userSchema);

exports.registerUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Create a new user in MongoDB
    await UserModel.create({ username, password });
    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .json({ error: "Username already exists or invalid input" });
  }
};

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user in MongoDB
    const user = await UserModel.findOne({ username, password });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
