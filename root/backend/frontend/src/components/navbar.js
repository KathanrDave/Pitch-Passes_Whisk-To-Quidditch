import { styled } from "@mui/system";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";

import logo from "../pages/teamimages/logo.png";
import cuscol from "../assets/colors";

const NavLink = styled("span")({
  margin: "0 10px",
  color: "#FFFFFF",
  cursor: "pointer",
});

const Navbar = () => {
 

  const styles = {
    appBar: {
      position: "fixed",
      height: "10%",
      transition: "height 0.5s",
      display: "flex",
      backgroundColor: "rgb(255,255,255,0.1)",
      backdropFilter: "blur(10px)",
      //   border: "0px solid rgb(255,255,255,0.3)",
      borderBottomWidth: "3px",
      borderTopWidth: "5px",

      borderRadius: "0px 0px 20px 20px",
      //   borderColor: "rgb(255,255,255,0.3)",
      borderTop: "none",
      justifyContent: "center",
      alignItems: "flex-start",
    },

    titleContainer: {
      position: "relative",
      top: "0",
      left: "0",
      transform: "none",
      transition: " font-size 0.5s ease-in-out",
      display: "flex",
      flexDirection: "row",
    },
    title: {
      color: "white",
      textShadow: "2px 2px 4px rgba(0, 0, 0, 2)",
      fontSize: `2rem`,
      transition:
        "padding 0.5s linear , font-size 0.5s ease-in-out , text-shadow 0.5s ease-in-out",
    },
    navLink: {
      margin: "0 10px",
      color: "#A21430",
      cursor: "pointer",
    },
    navComponent: {
      top: "17%",
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
      marginLeft: "20%",
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
      width: "50px",
      height: "50px",
      backgroundColor: "transparent",
      objectFit: "cover",
      filter: "drop-shadow(2px 2px 1px rgba(0, 0, 0))",
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
          {/* <Typography variant="body1" style={styles.loginText}>
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
          </Button> */}
        </Box>
      </Box>
    </AppBar>
  );
};

export default Navbar;
