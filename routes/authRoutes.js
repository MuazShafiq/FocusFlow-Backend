const express = require("express");
const passport = require("../auth/auth");
const { ensureAuthenticated } = require('../middleware/authMiddleware');
const User = require('../models/user');
const Session = require('../models/session');
const bcrypt = require('bcrypt');
const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    // Extract user data from the request body
    const { email, password, firstName, lastName } = req.body || {};

    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ error: 'Invalid request payload' });
    };

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName
    });

    await newUser.save();

    //res.setHeader('Content-Type', 'application/json');
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    // Extract user data from the request body
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Invalid request payload' });
    }

    // Find the user in MongoDB
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Compare the provided password with the stored hashed password using bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Google OAuth 2.0 authentication
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google callback route
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // Successful authentication, redirect to home or user dashboard
    res.redirect("/dashboard");
  }
);

// Logout route
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

// Test route that requires authentication
router.get('/profile', ensureAuthenticated, (req, res) => {
  res.json(req.user); // This will display the authenticated user's information
});

module.exports = router;