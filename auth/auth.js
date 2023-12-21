require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://192.168.9.40:3000/auth/google/callback", // Adjust the callback URL
    },
    (accessToken, refreshToken, profile, done) => {
      // You can save the user profile to your database or perform other actions
      return done(null, profile);
    }
  )
);

// Serialize and deserialize user (required for session support)
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

module.exports = passport;
