require("dotenv").config();
const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const connectDB = require("./config/database");
const session = require("express-session");
const passport = require("./auth/auth");
const authRoutes = require("./routes/authRoutes");
const dataRoutes = require("./routes/dataRoutes");
const { ensureAuthenticated } = require("./middleware/authMiddleware");
const cors = require('cors')
const IP = process.env.IP;
const PORT = process.env.PORT;

connectDB();

app.use(
  cors({
    origin: 'http://10.1.147.172:19000', // Your frontend development environment
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable sessions
app.use(
  session({
    secret: process.env.GOOGLE_CLIENT_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);

app.use("/data", dataRoutes)

app.get("/", (req, res) => {
  res.send("Hello, FocusFlow Backend!");
});

app.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.send("Welcome to the dashboard!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://${IP}:${PORT}`);
});
