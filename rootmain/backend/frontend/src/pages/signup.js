import * as React from "react";
import { grey } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

export default function Signup() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["jwtToken"]); // Use the useCookies hook to get and set the "jwtToken" cookie

  const [showTextField, setShowTextField] = React.useState(false);
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = React.useState(false);

  // State variables for validation status and error messages
  const [emailError, setEmailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [isFormValid, setIsFormValid] = React.useState(false);
  const [showUserExistsDialog, setShowUserExistsDialog] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleUserExistsDialogClose = () => {
    setShowUserExistsDialog(false);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const handleSignUpClick = () => {
    setShowTextField(true);
  };

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
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>?/~`]).{8,}$/;
    if (!formData.password || !passwordRegex.test(formData.password)) {
      setPasswordError(
        formData.password ? "Invalid password." : "All fields are mandatory"
      );
      valid = false;
      setOpen(!passwordRegex.test(formData.password));
    }

    setIsFormValid(valid);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted!");
      // Make a POST request to the backend with the form data
      fetch("http://localhost:5000/auth/signup", {
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
          if (data.error && data.error === "User Already Exists") {
            // Show the "User Already Exists" pop-up dialog
            setShowUserExistsDialog(true);
          } else if (data.token) {
            // Save the JWT token in cookies and navigate to the user page
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
            Sign Up
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <Button
              type="submit"
              fullWidth
              // href="http://localhost:5000/auth/google"
              onClick={handleGoogleSignUp}
              variant="contained"
              sx={{ mt: 3, mb: 3 }}
            >
              Sign up with Google
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
                  Sign Up with Email
                </Button>
              )}

              {showTextField && (
                <div>
                  <Box component="form" noValidate sx={{ mt: 1 }}>
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
                          sx={{ background: isFormValid ? "blue" : "red" }}
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
                  <Link href="/auth/signin" underline="none" variant="body2">
                    {"Have an account? Sign In"}
                  </Link>
                </Grid>
              </Grid>
            </div>
          </Box>
        </Box>
      </Container>
      <Dialog
        open={open}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Password Requirements"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Password should be at least 8 characters long and include at least
            one uppercase, one lowercase, one number, and one special character.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={showUserExistsDialog}
        onClose={handleUserExistsDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"User Already Exists"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            A user already exists with this email! Please use another email or
            sign in.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUserExistsDialogClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
