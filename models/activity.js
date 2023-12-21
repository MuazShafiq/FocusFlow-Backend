const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  time: { type: Date, required: true, unique: true },
  name: { type: String, required: true },
  //duration
  //repeat
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;