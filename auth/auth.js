require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LocalStrategy = require('passport-local').Strategy;
const IP = process.env.IP

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `http://localhost:3000/auth/google/callback`, // Adjust the callback URL
    },
    (accessToken, refreshToken, profile, done) => {
      // You can save the user profile to your database or perform other actions
      return done(null, profile);
    }
  )
);

// Use LocalStrategy for handling username/password login
passport.use(new LocalStrategy(
  {
    usernameField: 'email', // Assuming your login uses email as the username
    passwordField: 'password',
  },
  async (email, password, done) => {
    try {
      // Find the user in MongoDB by email
      const user = await User.findOne({ email });

      // If the user is not found, return false
      if (!user) {
        return done(null, false, { message: 'Incorrect email or password' });
      }

      // Compare the provided password with the stored hashed password using bcrypt
      const isPasswordValid = await bcrypt.compare(password, user.password);

      // If the password is not valid, return false
      if (!isPasswordValid) {
        return done(null, false, { message: 'Incorrect email or password' });
      }

      // If the username and password are valid, return the user object
      return done(null, user);
    } catch (error) {
      console.error('Error in LocalStrategy:', error);
      return done(error);
    }
  }
));

// Serialize and deserialize user (required for session support)
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    // Find the user by ID in MongoDB
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;
