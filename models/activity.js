const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  date: { type: Date, required: true },
  activity: { type: String, required: true },
  time: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;