import * as React from "react";
import { grey } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
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
    confirmpassword: "",
  });
  const handleSignUpClick = () => {
    setShowTextField(true);
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // const googlesignup = (e) => {
  //   e.preventDefault();
  //   fetch("http://localhost:5000/auth/google/signup", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       // Handle the response from the backend
  //       console.log(data);
  //       // if (data.token) {
  //       //   // console.log("navigated to", data.redirectUrl);
  //       //   navigate("/user/completeprofile");
  //       // }
  //     })
  //     .catch((error) => {
  //       // Handle any errors
  //       console.error(error);
  //     });
  // };
  //function to submit the form and create new user
  const handleSubmit = (e) => {
    e.preventDefault();

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
        if (data.token) {
          // console.log("navigated to", data.redirectUrl);
          navigate("/user/completeprofile");
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
        Sign Up Page{" "}
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
            Sign Up
          </Typography>
          <Box
            component="form"
            action="http://localhost:5000/auth/google/signup"
            noValidate
            sx={{ mt: 1 }}
          >
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 3 }}>
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
                    <FormControl
                      variant="outlined"
                      fullWidth
                      required
                      sx={{
                        mb: 1,
                      }}
                    >
                      <InputLabel htmlFor="outlined-adornment-password">
                        Confirm Password
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
                        label="  Confirm Password"
                        value={formData.confirmpassword}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            confirmpassword: e.target.value,
                          })
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
                  <Link href="http://localhost:3000/signin" variant="body2">
                    {"Have an account? Sign In"}
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
