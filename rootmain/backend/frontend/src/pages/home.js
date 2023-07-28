import React, { useEffect, useState } from "react";
import { styled } from "@mui/system";
import MovingIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Link,
} from "@mui/material";

import HorizontalScrollerfirst from "../components/HorizontalScrollerfirst";
// import HorizontalScrollersecond from "../components/HorizontalScrollersecond";

const Content = styled("div")({
  margin: "0 auto",
  color: "#FFFFFF",
  textAlign: "center",
});
const PageWrapper = styled("div")({
  margin: "0",
  padding: "0",
  height: "300vh", // Updated height to accommodate 4 sections of 100vh each
  display: "flex",
  flexDirection: "column",
});
const MainContent = styled("div")({
  height: "100vh", // Each section will have a height of 100vh
  display: "flex",
  zIndex: "1000",
  flexDirection: "column",
  justifyContent: "center",
});
const NavLink = styled("span")({
  margin: "0 10px",
  color: "#FFFFFF",
  cursor: "pointer",
});

const Home = () => {
  const [isExtended, setIsExtended] = useState(true);
  const [fontSize, setFontSize] = useState(8);
  const [isScrolled, setIsScrolled] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;

      if (scrollTop > 0 && !isScrolled) {
        setIsScrolled(true);
      } else if (scrollTop === 0 && isScrolled) {
        setIsScrolled(false);
      }
      setIsExtended(window.pageYOffset === 0);
      setFontSize(window.pageYOffset === 0 ? 8 : 2);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isScrolled]);

  const styles = {
    appBar: {
      position: "fixed",
      height: isExtended ? "40%" : "10%",
      transition: "height 0.5s",
      display: "flex",
      backgroundColor: isScrolled ? "rgba(0, 0, 0, 1)" : "transparent",
      // backdropFilter:"blur(10px)",
      border: "0px solid rgb(244,244,247)",
      borderBottomWidth: "3px",
      borderTopWidth: "5px",
      // borderLeftWidth: "1px",
      // borderRightWidth: "1px",
      borderRadius: isExtended ? "0px" : "0px 0px 20px 20px",
      justifyContent: isExtended ? "flex-end" : "flex-start",
      alignItems: isExtended ? "center" : "flex-start",
    },
    titleContainer: {
      position: "relative",
      top: isExtended ? "0" : "0",
      left: isExtended ? "0" : "0",
      transform: isExtended ? "translateY(0)" : "none",
      transition: " font-size 0.5s ease-in-out",
      display: "flex",
      flexDirection: "row",
    },
    title: {
      fontSize: `${fontSize}rem`,
      transition: "padding 0.5s linear , font-size 0.5s ease-in-out ",
      padding: isExtended ? "0px 50px" : "0px 5px",
    },
    navLink: {
      margin: "0 10px",
      color: "#000000",
      cursor: "pointer",
    },
    navComponent: {
      top: "1.8%",
      display: "flex",
      flexDirection: "row",
      position: "fixed",
      width: "100%",
    },
    navContainer: {
      backgroundColor: "#F4F4F7",
      borderRadius: "5px",
      padding: "10px 30px 10px",
      display: "flex",

      justifyContent: "flex-start",
      marginLeft: isExtended ? "5%" : "17%",
      transition: "margin-left 0.5s linear",
      marginRight: "50%",
      position: "absolute",
    },

    loginText: {
      color: "#FFFFFF",
      fontWeight: "bold",
      position: "absolute",
      marginLeft: "85%",
      padding: "10px",
    },
    getStartedButton: {
      borderRadius: "5px",
      textTransform: "none",
      backgroundColor: "#4caf50",
      color: "#FFFFFF",
      padding: "10px",
      position: "absolute",
      marginLeft: "90%",
    },
  };

  return (
    <PageWrapper>
      <CssBaseline />
      <AppBar style={styles.appBar}>
        <Toolbar>
          <div style={styles.titleContainer}>
            <Typography style={styles.title}>Pitch </Typography>
            <Typography style={styles.title}>Passes</Typography>
          </div>
        </Toolbar>
        <Box sx={styles.navComponent}>
          <Box sx={styles.navContainer}>
            <NavLink style={styles.navLink}>Link 1</NavLink>
            <NavLink style={styles.navLink}>Link 2</NavLink>
            <NavLink style={styles.navLink}>Link 3</NavLink>
            <NavLink style={styles.navLink}>Link 4</NavLink>
            <NavLink style={styles.navLink}>Link 5</NavLink>
          </Box>

          <Box>
            <Typography variant="body1" style={styles.loginText}>
              <Link href="/auth/signin" color="#FFFFFF" underline="none">
                Login
              </Link>
            </Typography>
            <Button
              variant="contained"
              sx={styles.getStartedButton}
              disableElevation
            >
              <Link href="/auth/signup" color="#FFFFFF" underline="none">
                Get Started
              </Link>

              <MovingIcon sx={{ mx: 1 }} />
            </Button>
          </Box>
        </Box>
      </AppBar>
      <MainContent style={{ backgroundColor: "#000000" }}>
        <Content>This is the first page</Content>
      </MainContent>

      <HorizontalScrollerfirst></HorizontalScrollerfirst>

      {/* <HorizontalScrollersecond /> */}

      <MainContent style={{ backgroundColor: "#000000" }}>
        <Content>This is the footer page</Content>
      </MainContent>
    </PageWrapper>
  );
};

export default Home;
