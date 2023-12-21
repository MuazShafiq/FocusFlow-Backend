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
    const { username, password, displayName } = req.body || {};

    if (!username || !password || !displayName) {
      return res.status(400).json({ error: 'Invalid request payload' });
    };

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      displayName,
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
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