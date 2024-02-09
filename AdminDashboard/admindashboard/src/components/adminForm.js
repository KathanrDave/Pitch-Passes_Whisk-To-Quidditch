import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";

const App = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    role: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the form data to the backend API
      console.log(formData);
      const response = await axios.post("/register/admin", formData);
      console.log(response.data);

      // Reset the form data
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phoneNumber: "",
        role: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="on"
        onSubmit={handleFormSubmit}
      >
        <TextField
          required
          id="outlined-lastName-required"
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          autoComplete="family-name"
        />
        <TextField
          required
          id="outlined-firstName-required"
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          autoComplete="given-name"
        />
        <TextField
          required
          id="outlined-email-required"
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          autoComplete="email"
        />
        <TextField
          required
          id="outlined-password-input"
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          autoComplete="new-password"
        />
        <TextField
          required
          id="outlined-confirmPassword-input"
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          autoComplete="new-password"
        />
        <TextField
          required
          id="outlined-phoneNumber-required"
          label="Mobile Number"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          autoComplete="tel"
        />
        <TextField
          required
          id="outlined-role-required"
          label="Role"
          name="role"
          value={formData.role}
          onChange={handleInputChange}
        />
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </Box>
    </div>
  );
};

export default App;
