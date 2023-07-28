//Imports
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const session = require("express-session");
var jwt = require("jsonwebtoken");
require("dotenv").config();

const passportSetup = require("./middleware/passportsetup");

// from the files
const User = require("./model/user");
const app = express();
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SECRET_KEY,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
passportSetup(passport);
app.use(passport.initialize());
app.use(passport.session());

//
const authRoutes = require("./routes/authroutes");
const userroutes = require("./routes/routes");

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

// middleware

// create home route
// app.post("/", (req, res) => {});
app.use("/auth", authRoutes);
app.use("/user", userroutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});
