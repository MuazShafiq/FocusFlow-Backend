const express = require("express");
const { ensureAuthenticated } = require('../middleware/authMiddleware');
const Activity = require('../models/activity');
const Schedule = require('../models/schedule');
const router = express.Router();

// Create a new activity associated with the user
router.post('/activities', async (req, res) => {
  try {
    const { date, activity, time } = req.body || {};

    if (!date || !activity || !time) {
      return res.status(400).json({ error: 'Invalid request payload' });
    }

    // Create a new activity associated with the user
    const newActivity = new Activity({
      date,
      activity,
      time
    });

    await newActivity.save();

    // Return the activities
    const activities = await Activity.find({});

    res.status(201).json({
      events: activities
    });
  } catch (error) {
    console.error('Error creating activity:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

router.post("/schedule", async (req, res) => {
  const schedule = new Schedule(req.body);

  try {
    await schedule.save();
    res.status(201).send(schedule);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;