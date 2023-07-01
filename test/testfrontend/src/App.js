import * as React from "react";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import { grey, red } from "@mui/material/colors";
import { Button, Grid, Theme } from "@mui/material";

export default function SlideFromContainer() {
  const [isSignInActive, setIsSignInActive] = React.useState(false);
  const containerRef = React.useRef(null);

  const handleSignUpClick = () => {
    setIsSignInActive(false);
  };

  const handleSignInClick = () => {
    setIsSignInActive(true);
  };

  return (
    <Box>
      <Box
        sx={{
          bgcolor: grey[50],
          borderRadius: 5,
          boxShadow: 10,

          mx: "auto",
          mt: "2.5%",
          mb: "2.5%",

          height: 600,
          width: "60%",

          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            height: "100%",
            width: "50%",
            zIndex: "1502",
          }}
        >
          <Grid
            sx={{
              position: "absolute",
              height: "100%",
              display: "flex",
              width: "100%",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              bgcolor: grey[200],
            }}
          >
            Sign In
          </Grid>
        </Box>
        <Box
          sx={{
            position: "absolute",
            height: "100%",
            width: "50%",
            zIndex: "1503",
          }}
        >
          <Grid
            sx={{
              position: "absolute",
              height: "100%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              bgcolor: grey[500],
              opacity: 0,
            }}
          >
            Sign Up
          </Grid>
        </Box>
        <Box
          sx={{
            bgcolor: red[300],
            position: "relative",
            width: "200%",
            overflow: "hidden",
            height: "100%",
            left: "-100%",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              top: 0,
              height: "100%",
              width: "50%",
            }}
          >
            <Button>Sign In Button</Button>
          </Box>
          <Box
            sx={{
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              top: 0,
              height: "100%",
              width: "50%",
              right: 0,
            }}
          >
            <Button onClick={handleSignUpClick}>Sign Up Button</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
