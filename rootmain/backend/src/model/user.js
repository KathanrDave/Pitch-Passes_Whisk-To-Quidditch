const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
//user schema
const UserSchema = new mongoose.Schema({
  //email address
  email: {
    type: String,
    required: true, // Required field, must be present in the document
    unique: true, // Each email must be unique
    trim: true, // Remove leading and trailing whitespaces from the email
    lowercase: true, // Convert the email to lowercase before saving
  },
  // Google OAuth identifier for users who sign in/up with Google
  googleId: {
    type: String,
  },
  // User's password (optional, used for email and password authentication)
  password: {
    type: String,
    sparse: true, // Allow multiple null values for password (used for Google OAuth users)
  },
  // User's name
  name: {
    // First name of the user
    firstName: {
      type: String,
      sparse: true,
    },
    // Last name of the user
    lastName: {
      type: String,
      sparse: true,
    },
  },
  // User's mobile number
  mobileNumber: {
    type: String,
    sparse: true,
  },
  // Role in the world of Quidditch
  quidditchRole: {
    type: String,
    sparse: true,
  },
  // Team affiliation in the world of Quidditch
  quidditchTeam: {
    type: String,
    sparse: true,
  },
  // Date when the user was created
  created: {
    type: Date,
    default: Date.now,
  },
  // Buffer to store the photo data
  photoData: {
    type: Buffer,
    contentType: String, // Store the content type of the image (e.g., image/jpeg, image/png)
  },
  // Token ( JWT, OAuth token)
  token: {},
});

// Define the isValidPassword method to compare passwords
UserSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

// Create the User model
const User = mongoose.model("User", UserSchema);
module.exports = User;
