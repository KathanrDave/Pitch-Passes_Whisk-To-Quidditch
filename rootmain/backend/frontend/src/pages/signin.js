import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie"; 
import { grey } from "@mui/material/colors";
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

export default function Signup() {
  // const navigate = useNavigate();
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["jwtToken"]); // Use the useCookies hook to get and set the "jwtToken" cookie
  const [showTextField, setShowTextField] = React.useState(false);

  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });
  const handleSignUpClick = () => {
    setShowTextField(true);
  };

  const [showPassword, setShowPassword] = React.useState(false);
  const [emailError, setEmailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [isFormValid, setIsFormValid] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const validateForm = () => {
    let valid = true;
    setEmailError("");
    setPasswordError("");

    // Validate email format using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      setEmailError(
        formData.email ? "Invalid email address" : "All fields are mandatory"
      );
      valid = false;
    }

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
      fetch("http://localhost:5000/auth/signin", {
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
            // Redirect to the user profile page upon successful signin
            setCookie("jwtToken", data.token, {
              path: "/",
              maxAge: 2 * 60 * 60,
              sameSite: "lax",
              secure: false,
            });
            
            navigate("/user");
          }
        })
        .catch((error) => {
          // Handle any errors
          console.error(error);
        });
    }
  };
  const handleGoogleSignUp = (e) => {
    e.preventDefault();
    console.log("handleGoogleSignUp function called");
    try {
      // Redirect the user to the Google OAuth2.0 authorization endpoint
      const googleAuthUrl = "http://localhost:5000/auth/google";
      window.open(googleAuthUrl, "_self");
    } catch (error) {
      // Handle error (if needed)
      console.error(error);
    }
  };

  return (
    <div>
      {/* <Typography align="center" variant="h4">
        Sign In Page{" "}
      </Typography> */}
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
            <Button
              fullWidth
              type="submit"
              // href="http://localhost:5000/auth/google"
              variant="contained"
              sx={{ mt: 3, mb: 3 }}
              onClick={handleGoogleSignUp}
            >
              Sign in with Google
            </Button>
            <div>
              {!showTextField && (
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleSignUpClick}
                  sx={{
                    px: 10,
                  }}
                >
                  Sign In with Email
                </Button>
              )}

              {showTextField && (
                <div>
                  <Box>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email"
                      name="email"
                      autoComplete="email"
                      autoFocus
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
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
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
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
                </div>
              )}
              <Grid
                container
                justifyContent={"center"}
                mt={3}
                position={"Relative"}
              >
                <Grid item>
                  <Link href="/auth/signup" underline="none" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
                <Grid item>
                  <br></br>
                  <Typography>
                    Are you admin?{" "}
                    <Link
                      href="/auth/signin/admin"
                      underline="none"
                      variant="body2"
                    >
                      {"Go here"}
                    </Link>{" "}
                  </Typography>
                </Grid>
              </Grid>
            </div>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
