// Hari Om Tatasat Jai Guru Datta

// imports
const bcrypt = require("bcrypt");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
var jwt = require("jsonwebtoken");
const app = express();
require("dotenv").config();

//middleware functions
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SECRET_KEY,
  })
);
app.use(express.json());
app.use(cookieParser());
// app.use(cors());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    // Start the server after successfully connecting to MongoDB
    const port = process.env.PORT || 3001;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1); // Exit the application if MongoDB connection fails
  });

app.get("/", (req, res) => {
  res.send("This is the PitchPasses");
});

const authRoutes = require("./routes/authroutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/user", userRoutes);
