import * as React from "react";
import { useNavigate } from "react-router-dom";
import { grey } from "@mui/material/colors";
import { useCookies } from "react-cookie"; 
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Typography,
  Box,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Container,
  IconButton,
  InputAdornment,
} from "@mui/material";
import cuscol from "../../assets/colors";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

export default function Signup() {
  // const navigate = useNavigate();
  const navigate = useNavigate();
  const [showTextField, setShowTextField] = React.useState(false);

  const [formData, setFormData] = React.useState({
    username: "",
    password: "",
  });
  const handleSignUpClick = () => {
    setShowTextField(true);
  };

  const [showPassword, setShowPassword] = React.useState(false);
  const [emailError, setEmailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [isFormValid, setIsFormValid] = React.useState(false);
  const [cookies, setCookie] = useCookies(["jwtToken"]); 
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const validateForm = () => {
    let valid = true;
    setEmailError("");
    setPasswordError("");

    // Validate username format using a regular expression
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!formData.username || !emailRegex.test(formData.username)) {
    //   setEmailError(
    //     formData.username
    //       ? "Invalid username address"
    //       : "All fields are mandatory"
    //   );
    //   valid = false;
    // }

    // Validate password complexity using a regular expression
    // At least one uppercase, one lowercase, one number, one special character, and at least 8 characters long.

    if (!formData.password) {
      setPasswordError(
        formData.password ? "Invalid password." : "All fields are mandatory"
      );
      valid = false;
    }

    setIsFormValid(valid);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted!");
      // Make a POST request to the backend with the form data using Axios
      fetch("http://localhost:5000/auth/signin/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle the response from the backend
          console.log(data);

          if (data.error) {
            // Handle the error messages from the backend
            if (data.error === "User not found") {
              setEmailError("User not found");
            } else if (data.error === "Invalid password") {
              setPasswordError("Invalid password");
            }
          } else {
            setCookie("jwtToken", data.token, {
              path: "/",
              maxAge: 2 * 60 * 60,
              sameSite: "lax",
              secure: false,
            });
            // Redirect to the user profile page upon successful signin
            navigate("/admin");
          }
        })
        .catch((error) => {
          // Handle any errors
          console.error(error);
        });
    }
  };

  return (
    <div>
      {/* <Typography align="center" variant="h4">
        Sign In Page{" "}
      </Typography> */}
      <Button>
        <Link href="/">
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
      <Container component="main">
        <CssBaseline />
        <Box
          sx={{
            mt: 15,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: grey[50],
            borderRadius: 5,
            boxShadow: 5,
            px: 10,

            width: "50%",
            height: 500,
            mx: "auto",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <Typography component="h1" variant="h3" mb={"2"}>
            Sign In
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Box>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                error={Boolean(emailError)} // Set error prop to display error styles
                helperText={emailError} // Display error message below the field
                sx={{
                  mb: 2,
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                error={Boolean(passwordError)}
                helperText={passwordError}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Grid container justifyContent={"center"}>
                <Grid item>
                  <Button
                    type="submit"
                    onClick={handleSubmit}
                    variant={isFormValid ? "contained" : "outlined"}
                    sx={{
                      background: isFormValid ? "blue" : "red",
                      color: isFormValid ? "" : "white",
                    }}
                  >
                    Continue
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
