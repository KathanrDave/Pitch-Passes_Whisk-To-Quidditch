const mongoose = require("mongoose");
// Define the login schema
const registerSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        // Use a regular expression to validate the email format
        return /^\S+@\S+\.\S+$/.test(value);
      },
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
});

// Create a Login model from the schema
const Register = mongoose.model("Register", registerSchema);

// Export the Login model
module.exports = Register;
