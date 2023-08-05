import React, { useState, useEffect } from "react";
import {
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container,
  CssBaseline,
  Box,
  Link,
} from "@mui/material";
import cuscol from "../assets/colors";
// import { styled } from "@mui/system";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import MatchCardVersionOne from "../components/MatchCardVersionOne";
import teamAImage from "../pages/teamimages/teamA.jpeg";
import checkAuth from "../components/checkAuth";
import logout from "../components/dologout";
import teamBImage from "../pages/teamimages/teamB.jpg";
import teamAbanner from "../pages/teamimages/teamAbanner.jpg";
import teamBbanner from "../pages/teamimages/teamBbanner.jpg";
// import { Link } from "react-router-dom";

const AdminProfilePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [adminData, setAdminData] = useState(null);
  const { dialogBox } = checkAuth();
  const { handleLogout } = logout();

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        // Fetch admin data from the backend
        const response = await fetch("http://localhost:5000/admin", {
          credentials: "include", // Include cookies in the request
        });

        if (response.ok) {
          const data = await response.json();
          setAdminData(data.admin); // Set the admin data in the state
        } else {
          // Handle the case when the admin is not authenticated or an error occurs
          console.error("User is not authenticated or an error occurred.");
          setAdminData(null); // Set admin data to null to indicate unauthenticated state
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setAdminData(null); // Set user data to null to indicate error state
      }
    };

    fetchAdminData();
  }, []);

  // If userData is not loaded yet, show a loading message or spinner
  if (!adminData) {
    return <p>{dialogBox}</p>;
  }

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const matchData = {
    title: "Team A vs Team B",
    teamA: "Team A",
    teamB: "Team B",
    teamAImage: teamAImage,
    teamBImage: teamBImage,
    teamAbanner: teamAbanner,
    teamBbanner: teamBbanner,
  };
  const sidebarLinks = [
    { label: "Match", icon: <SportsSoccerIcon />, href: "/admin/matchpage" },
    { label: "Team", icon: <GroupIcon />, href: "/admin/team" },
    { label: "User", icon: <PersonIcon />, href: "/admin/user" },
    { label: "Admin", icon: <SupervisorAccountIcon />, href: "/admin/admin" },
  ];

  const contentWrapperStyle = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    marginLeft: isSidebarOpen ? "150px" : "0",
    transition: "margin 0.2s ease-out",
  };

  const containerWrapperStyle = {
    flexGrow: 1,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    height: "calc(100% - 64px)", // Adjust the height to fit the available space
  };

  const containerStyle = {
    height: "500px",
    marginBottom: "30px",
    mt: "1rem",
    p: "1rem",

    marginBottom: "1rem",
    overflowY: "auto",
  };

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        {/* Sidebar */}
        <Drawer
          variant="persistent"
          anchor="left"
          open={isSidebarOpen}
          sx={{
            "& .MuiDrawer-paper": {
              borderWidth: 0,
            },
          }}
        >
          {/* Container at the top of the sidebar */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              height: "64px",
              backgroundColor: "black",
            }}
          >
            {/* Move MenuIcon to the top end of the sidebar */}
            <ChevronLeftIcon
              sx={{
                cursor: "pointer",
                color: "white",
                marginRight: "5%",
                "&:hover": {
                  backgroundColor: cuscol.mysticGray,
                },
              }}
              onClick={handleSidebarToggle}
            />
          </Box>

          {/* Sidebar content */}
          <List>
            {sidebarLinks.map((link, index) => (
              <ListItem button component="a" href={link.href} key={index}>
                <ListItemIcon>{link.icon}</ListItemIcon>
                <ListItemText primary={link.label} />
              </ListItem>
            ))}
            <button onClick={handleLogout}>Logout</button>
            <button>
              <Link href="auth/register/admin"> Register new admin</Link>
            </button>
          </List>
        </Drawer>

        {/* Page Wrapper */}
        <Box component="main" sx={contentWrapperStyle}>
          {/* Navbar */}
          <AppBar
            position="static"
            sx={{ position: "relative", backgroundColor: "black" }}
          >
            <Toolbar>
              {/* Move MenuIcon to the flex-start of the AppBar */}
              {!isSidebarOpen && (
                <ChevronRightIcon
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: cuscol.mysticGray,
                    },
                  }}
                  onClick={handleSidebarToggle}
                />
              )}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexGrow: 1,
                  justifyContent: "flex-start",
                }}
              >
                <Typography variant="h6" component="div" sx={{ ml: 2 }}>
                  Admin Profile Page
                </Typography>
              </Box>

              <Typography variant="h6" component="div">
                Welcome {adminData.username}
              </Typography>
            </Toolbar>
          </AppBar>

          {/* Match, Team and User Container  */}
          <Box sx={containerWrapperStyle}>
            {/* Match Container */}
            <Container sx={containerStyle} style={{ backgroundColor: "blue" }}>
              {[...Array(20)].map((_, index) => (
                <div
                  key={index}
                  style={{
                    width: "100%",
                    height: "50px",
                    backgroundColor: "black",
                    marginBottom: "5px",
                  }}
                />
              ))}
            </Container>
            {/* Team Container */}
            <Container sx={containerStyle} style={{ backgroundColor: "green" }}>
              {[...Array(20)].map((_, index) => (
                <div
                  key={index}
                  style={{
                    width: "100%",
                    height: "50px",
                    backgroundColor: "red",
                    marginBottom: "5px",
                  }}
                />
              ))}
            </Container>
            {/* User Container */}
            <Container
              sx={containerStyle}
              style={{ backgroundColor: "orange" }}
            >
              {" "}
              <MatchCardVersionOne {...matchData} />
              <MatchCardVersionOne {...matchData} />
            </Container>
            {/* Add more containers here as needed */}
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default AdminProfilePage;
