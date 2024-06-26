// Importing Mongoose package
const mongoose = require("mongoose");

/* // Importing the User model from the user.js file
const User = require("./user"); */

// Defining the schema for Activity collection
const activitySchema = new mongoose.Schema({
  /* user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }, */
  date: {
    type: Date,
    required: true, // Making the 'date' field mandatory
  },
  activity: {
    type: String,
    required: true, // Making the 'activity' field mandatory
  },
  time: {
    type: String,
    required: true, // Making the 'time' field mandatory
  },
});

// Creating the Activity model
const Activity = mongoose.model("Activity", activitySchema);

// Exporting the Activity model
module.exports = Activity;
