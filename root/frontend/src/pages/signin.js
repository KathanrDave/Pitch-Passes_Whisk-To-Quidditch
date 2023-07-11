import * as React from "react";

import { useNavigate } from "react-router-dom";

import { grey } from "@mui/material/colors";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Typography,
  Box,
  Button,
  CssBaseline,
  TextField,
  FormControl,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Container,
  IconButton,
  OutlinedInput,
  InputLabel,
  InputAdornment,
} from "@mui/material";

export default function Signup() {
  const navigate = useNavigate();
  const [showTextField, setShowTextField] = React.useState(false);
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });
  const handleSignUpClick = () => {
    setShowTextField(true);
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Make a POST request to the backend with the form data
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

        // Redirect to the user profile page upon successful signin
        if (data.success) {
          // console.log("navigated to", data.redirectUrl);
          navigate(data.redirectUrl);
        }
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
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
              variant="contained"
              sx={{ mt: 3, mb: 3 }}
              // onClick={googleAuth}
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
                      sx={{
                        mb: 2,
                      }}
                    />
                    <FormControl
                      variant="outlined"
                      fullWidth
                      required
                      sx={{
                        mb: 1,
                      }}
                    >
                      <InputLabel htmlFor="outlined-adornment-password">
                        Password
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? "text" : "password"}
                        endAdornment={
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
                        }
                        label="Password"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                      />
                    </FormControl>
                    <FormControlLabel
                      control={<Checkbox value="remember" color="primary" />}
                      label="Remember me"
                    />
                    <Grid container justifyContent={"center"}>
                      <Grid item>
                        <Button type="submit">Continue</Button>
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
                  <Link href="http://localhost:3000/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </div>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
