const mongoose = require("mongoose");
// Define the login schema
const passwordValidator = require("password-validator");
const registerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
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
    minlength: 8,
    validate: {
      validator: function (value) {
        const schema = new passwordValidator();
        schema
          .is().min(8)
          .is().max(100)
          .has().uppercase()
          .has().lowercase()
          .has().digits()
          .has().symbols()
          .has().not().spaces();

        return schema.validate(value);
      },
      message: 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one symbol'
    }
  },
  confirmPassword: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return value === this.password;
      },
      message: 'Passwords do not match'
    }
  },
  mobileNumber: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return /^\d{10}$/.test(value);
      },
      message: "Please enter a valid 10-digit mobile number",
    },
  },
});

// Create a Login model from the schema
const Register = mongoose.model("Register", registerSchema);

// Export the Login model
module.exports = Register;
