const express = require("express");
const { ensureAuthenticated } = require('../middleware/authMiddleware');
const Activity = require('../models/activity');
const router = express.Router();

// Create a new activity
router.post('/activities', ensureAuthenticated, async (req, res) => {
  try {
    console.log('Authenticated User:', req.user);

    const { date, activity, time } = req.body || {};

    if (!date || !activity || !time) {
      return res.status(400).json({ error: 'Invalid request payload' });
    }

    // Get the user ID from the authenticated user
    const userId = req.user._id;

    // Create a new activity associated with the user
    const newActivity = new Activity({
      date,
      activity,
      time,
      user: userId
    });

    await newActivity.save();

    res.status(201).json({ message: 'Activity created successfully' });
  } catch (error) {
    console.error('Error creating activity:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

module.exports = router;