const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
});

// Compare the provided password with the stored hashed password
/* userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
      return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
      throw error;
  }
}; */

const User = mongoose.model('User', userSchema);

module.exports = User;