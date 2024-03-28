// Importing Mongoose package
const mongoose = require("mongoose");

/* // Importing the User model from the user.js file
const User = require("./user"); */

// Defining the schema for Activity collection
const scheduleSchema = new mongoose.Schema({
  /* user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }, */
  day: {
    type: String,
    required: true, // Making the 'date' field mandatory
  },
  time: {
    type: String,
    required: true, // Making the 'activity' field mandatory
  },
  activity: {
    type: String,
    required: true, // Making the 'time' field mandatory
  },
});

// Creating the Activity model
const Schedule = mongoose.model("Schedule", scheduleSchema);

// Exporting the Activity model
module.exports = Schedule;