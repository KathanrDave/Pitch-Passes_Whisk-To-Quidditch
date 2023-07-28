const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
//Admin schema
const AdminSchema = new mongoose.Schema({
  //email address
  email: {
    type: String,
    unique: true,
    trim: true,
    sparse: true,
    lowercase: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  // Admin's password (optional, used for email and password authentication)
  password: {
    type: String,
    sparse: true,
    trim: true,
  },
  // Admin's name

  // First name of the Admin
  firstName: {
    type: String,
    sparse: true,
  },
  // Last name of the Admin
  lastName: {
    type: String,
    sparse: true,
  },

  // Admin's mobile number
  mobileNumber: {
    type: String,
    sparse: true,
  },
  // Date when the Admin was created
  created: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    default: "sub",
  },
});


AdminSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error(error);
  }
};
// Create the Admin model
const Admin = mongoose.model("Admin", AdminSchema);
module.exports = Admin;
