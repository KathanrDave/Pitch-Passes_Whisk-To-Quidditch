import React, { useState } from "react";
import { Box, Link, TextField, Button } from "@mui/material";
import cuscol from "../../assets/colors";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import axios from "axios";

const App = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    mobileNumber: "",
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
      const response = await axios.post(
        "http://localhost:5000/auth/register/admin",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);

      // Reset the form data
      setFormData({
        email: "",
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        mobileNumber: "",
        role: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Button>
        <Link href="/admin">
          <ChevronLeftIcon
            sx={{
              cursor: "pointer",
              color: "black",
              marginRight: "5%",
              backgroundColor: cuscol.gray400,
              "&:hover": {
                backgroundColor: cuscol.gray200,
              },
            }}
          />
        </Link>
      </Button>
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
          id="outlined-firstName-required"
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          autoComplete="given-name"
        />
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
          id="outlined-password-input"
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          autoComplete="username"
        />

        <TextField
          required
          id="outlined-phoneNumber-required"
          label="Mobile Number"
          name="mobileNumber"
          value={formData.mobileNumber}
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
