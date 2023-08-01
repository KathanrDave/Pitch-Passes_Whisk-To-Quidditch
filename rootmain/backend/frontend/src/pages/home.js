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
import homapageimg from "./teamimages/homepageimg.png";
import snitch from "./teamimages/snitch.jpeg";
// import logo from "./teamimages/logo.png";
import Navbar from "../components/navbarHome";
// import Navbar from "../components/navbar";
// import cuscol from "../assets/colors";

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
  flexDirection: "rowe",
  justifyContent: "center",
});

const LoaderContainer = styled("div")({
  width: "100%",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#0D0D0D",
  zIndex: 0,
});

const GoldenSnitch = styled("div")({
  width: "500px",
  height: "500px",
  backgroundImage: `url(${snitch})`, // Replace with the actual image URL
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  position: "relative",
  zIndex: 1,
  animation: `$spin 2s linear infinite`, // Use the animation defined below
  "@keyframes spin": {
    "0%": {
      transform: "rotate(0deg)",
    },
    "100%": {
      transform: "rotate(360deg)",
    },
  },
});

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    // Simulate loading of the image and other data
    setTimeout(() => {
      setIsLoaded(true);
    }, 0);
  }, []);

  return (
    <PageWrapper>
      <CssBaseline />

      <Navbar />
      <MainContent>
        {isLoaded ? (
          <>
            <img
              src={homapageimg}
              alt="Landing page image"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: "1",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "50%",
                textAlign: "center",
                animation: "fadeIn 1s ease-in 1s forwards",
              }}
            >
              {/* <h1>Welcome to Our Landing Page</h1> */}
              {/* <p>This is the first page. Discover the magic of our website!</p> */}
            </div>
          </>
        ) : (
          <LoaderContainer>
            <GoldenSnitch />
          </LoaderContainer>
        )}
      </MainContent>
      <MainContent>
        <HorizontalScrollerfirst />
        {/* <HorizontalScrollersecond /> */}
      </MainContent>
      <MainContent style={{ backgroundColor: "#000000" }}>
        <Content>This is the footer page</Content>
      </MainContent>
    </PageWrapper>
  );
};

export default Home;
