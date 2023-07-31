import React, { useEffect, useState } from "react";
import { styled } from "@mui/system";
import MovingIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import { AppBar, Toolbar, Typography, Button, Box, Link } from "@mui/material";

import logo from "../pages/teamimages/logo.png";
import cuscol from "../assets/colors";

const NavLink = styled("span")({
  margin: "0 10px",
  color: "#FFFFFF",
  cursor: "pointer",
});

const Navbar = () => {
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
      backgroundColor: isScrolled ? "transparent" : "rgb(255,255,255,0.01)",
      backdropFilter: isScrolled ? "blur(10px)" : "blur(0px)",
      border: isExtended ? "none" : "0px solid rgb(255,255,255,1)",
      borderBottomWidth: isExtended ? "none" : "3px",
      borderTopWidth: "5px",
      borderRadius: isExtended ? "0px" : "0px 0px 20px 20px",
      borderColor: "white",
      borderTop: "none",
      justifyContent: isExtended ? "flex-end" : "flex-start",
      alignItems: isExtended ? "center" : "flex-start",
    },

    titleContainer: {
      position: "relative",
      top: isExtended ? "20px" : "0",
      left: isExtended ? "50px" : "0",
      transform: isExtended ? "translateY(0)" : "none",
      transition: " font-size 0.5s ease-in-out",
      display: "flex",
      flexDirection: "row",
    },
    title: {
      // padding: isExtended ? "0px px" : "0px 5px",
      color: isExtended ? "black" : "white",
      textShadow: isExtended
        ? "8px 4px 5px rgba(255, 255, 255, 2)"
        : "2px 2px 4px rgba(0, 0, 0, 2)",
      fontSize: `${fontSize}rem`,
      transition:
        "padding 0.5s linear , font-size 0.5s ease-in-out , text-shadow 0.5s ease-in-out",
    },
    navLink: {
      margin: "0 10px",
      color: "#A21430",
      cursor: "pointer",
    },
    navComponent: {
      top: isExtended ? "1.8%" : "17%",
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
      marginLeft: isExtended ? "5%" : "18%",
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
      textShadow: "2px 2px 5px rgba(0, 0, 0, 2)",
      transition: "backgroundColor 0.3s ease",
      "&:hover": {
        backgroundColor: "grey",
      },
    },
    getStartedButton: {
      borderRadius: "5px",
      textTransform: "none",
      backgroundColor: cuscol.enchantedTeal,
      color: "white",
      padding: "10px",
      position: "absolute",
      marginLeft: "90%",
    },
    pitchimage: {
      width: isExtended ? "200px" : "50px",
      height: isExtended ? "200px" : "50px",
      backgroundColor: "transparent",
      objectFit: "cover",
      // filter:drop-shadow("10px 10px 10px red")
      filter: isExtended
        ? "drop-shadow(7px 10px 1px rgba(0, 0, 0))"
        : "drop-shadow(2px 2px 1px rgba(0, 0, 0))",
    },
  };

  return (
    <AppBar style={styles.appBar}>
      <Toolbar>
        <div style={styles.titleContainer}>
          <Typography style={styles.title}>Pitch </Typography>
          <img src={logo} style={styles.pitchimage} alt="Pitch Image" />
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
            // disableElevation
          >
            <Link href="/auth/signup" color="#FFFFFF" underline="none">
              Get Started
            </Link>

            <MovingIcon sx={{ mx: 1 }} />
          </Button>
        </Box>
      </Box>
    </AppBar>
  );
};

export default Navbar;
