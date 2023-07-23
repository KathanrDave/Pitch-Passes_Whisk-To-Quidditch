import {useState} from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Container } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FacebookSharpIcon from "@mui/icons-material/FacebookSharp";
import GoogleIcon from "@mui/icons-material/Google";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { makeStyles } from "@mui/styles";
// TODO remove, this demo shouldn't need to reset the theme.
import {
  amber,
  blue,
  blueGrey,
  brown,
  common,
  cyan,
  deepOrange,
  deepPurple,
  green,
  grey,
  indigo,
  lightBlue,
  lightGreen,
  lime,
  orange,
  pink,
  purple,
  red,
  teal,
  yellow,
} from "@mui/material/colors";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
    position: "relative",
    overflow: "hidden",
    width: "768px",
    maxWidth: "100%",
    minHeight: "480px",
  },
  formContainer: {
    position: "absolute",
    top: 0,
    height: "100%",
    transition: "all 0.6s ease-in-out",
  },
  signUpContainer: {
    left: 0,
    width: "50%",
    opacity: 0,
    zIndex: 1,
  },
  signInContainer: {
    left: 0,
    width: "50%",
    zIndex: 2,
  },
  overlayContainer: {
    position: "absolute",
    top: 0,
    left: "50%",
    width: "50%",
    height: "100%",
    overflow: "hidden",
    transition: "transform 0.6s ease-in-out",
    zIndex: 100,
  },
  overlay: {
    background: "linear-gradient(to right, #FF4B2B, #FF416C)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "0 0",
    color: "#FFFFFF",
    position: "relative",
    left: "-100%",
    height: "100%",
    width: "200%",
    transform: "translateX(0)",
    transition: "transform 0.6s ease-in-out",
  },
  overlayPanel: {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    padding: "0 40px",
    textAlign: "center",
    top: 0,
    height: "100%",
    width: "50%",
    transform: "translateX(0)",
    transition: "transform 0.6s ease-in-out",
  },
  overlayLeft: {
    transform: "translateX(-20%)",
  },
  overlayRight: {
    right: 0,
    transform: "translateX(0)",
  },
  socialContainer: {
    margin: "20px 0",
  },
  social: {
    border: "1px solid #DDDDDD",
    borderRadius: "50%",
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 5px",
    height: "40px",
    width: "40px",
  },
}));

export default  function SignIn() {
  const [isSignInActive, setIsSignInActive] = React.useState(false);
  const classes = useStyles();
  

  const handleSignUpClick = () => {
    setIsSignInActive(false);
  };

  const handleSignInClick = () => {
    setIsSignInActive(true);
  };

  return (
    <div>
      <Container className={classes.container}>
        <Grid container>
          <Grid
            item
            xs={6}
            className={`${classes.formContainer} ${classes.signUpContainer}`}
            style={isSignInActive ? { opacity: 1 } : null}
          >
            {/* Sign Up Form */}
            <Paper>
              <form>
                <Typography variant="h4">Create Account</Typography>
                <div className={classes.socialContainer}>
                  <Button className={classes.social}>
                    <FacebookSharpIcon />
                  </Button>
                  <Button className={classes.social}>
                    <GoogleIcon />
                  </Button>
                  <Button className={classes.social}>
                    <LinkedInIcon />
                  </Button>
                </div>
                <Typography>or use your email for registration</Typography>
                <TextField type="text" label="Name" fullWidth />
                <TextField type="email" label="Email" fullWidth />
                <TextField type="password" label="Password" fullWidth />
                <Button variant="contained" color="primary" fullWidth>
                  Sign Up
                </Button>
              </form>
            </Paper>
          </Grid>
          <Grid
            item
            xs={6}
            className={`${classes.formContainer} ${classes.signInContainer}`}
            style={isSignInActive ? null : { opacity: 1, zIndex: 2 }}
          >
            {/* Sign In Form */}
            <Paper>
              <form>
                <Typography variant="h4">Sign in</Typography>
                <div className={classes.socialContainer}>
                  <Button className={classes.social}>
                    <FacebookSharpIcon />
                  </Button>
                  <Button className={classes.social}>
                    <GoogleIcon />
                  </Button>
                  <Button className={classes.social}>
                    <LinkedInIcon />
                  </Button>
                </div>
                <Typography>or use your account</Typography>
                <TextField type="email" label="Email" fullWidth />
                <TextField type="password" label="Password" fullWidth />
                <Typography>
                  <a href="#">Forgot your password?</a>
                </Typography>
                <Button variant="contained" color="primary" fullWidth>
                  Sign In
                </Button>
              </form>
            </Paper>
          </Grid>
          <Grid
            item
            xs={12}
            className={classes.overlayContainer}
            style={isSignInActive ? null : { transform: "translateX(-100%)" }}
          >
            {/* Overlay */}
            <div className={classes.overlay}>
              <div className={`${classes.overlayPanel} ${classes.overlayLeft}`}>
                <Typography variant="h4">Welcome Back!</Typography>
                <Typography>
                  To keep connected with us, please login with your personal
                  info
                </Typography>
                <Button className={classes.ghost} onClick={handleSignInClick()}>
                  Sign In
                </Button>
              </div>
              <div
                className={`${classes.overlayPanel} ${classes.overlayRight}`}
              >
                <Typography variant="h4">Hello, Friend!</Typography>
                <Typography>
                  Enter your personal details and start the journey with us
                </Typography>
                <Button className={classes.ghost} onClick={handleSignUpClick()}>
                  Sign Up
                </Button>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}