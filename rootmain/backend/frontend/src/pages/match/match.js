import React from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import { styled } from "@mui/system";
// Import team images
import teamAImage from "../teamimages/teamA.jpeg";
import teamBImage from "../teamimages/teamB.jpg";
import teamAbanner from "../teamimages/teamAbanner.jpg";
import teamBbanner from "../teamimages/teamBbanner.jpg";

// Styled components for match cards
const MatchCardContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  height: "100px",
  width: "90%",
  padding: theme.spacing(2),
  //   marginBottom: theme.spacing(4),/
  marginBottom: "30px",
  position: "relative",
  borderRadius: "0px 20px 20px 0px",
  overflow: "hidden",
  boxShadow: "1px 4px 6px rgba(0, 0, 0, 0.4)",
  background:
    "linear-gradient(100deg, rgba(255, 255, 255, 0.6) 10%, rgba(255, 0, 0, 0.6) 40%, rgba(0, 255, 0, 0.6) 60%, rgba(255, 255, 255, 0.6) 90%)",
}));

const TeamProfileCircle = styled("div")({
  width: 60,
  height: 60,
  borderRadius: "50%",
  overflow: "hidden",
  marginLeft: "15px",
  marginRight: "15px",
});



const FirstContainer = styled("div")({
  position: "absolute",
  top: 0,
  bottom: 0,
  left: 0,
  width: "80%",
  display: "flex",
});

const LeftContainer = styled("div")({
  width: "20%",
  //   backgroundColor: "#ffff99", // Light yellow
  display: "flex",
  borderRight: ".25em solid white",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "row",
  zIndex: 0,
});

const MiddleContainer = styled("div")({
  width: "80%",
  //   backgroundColor: "#ccffcc", // Light green
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 0,
});
const SubLeftContainer = styled("div")({
  width: "50%",
  backgroundColor: "#ffff11", // Light yellow
  display: "flex",
  height: "100%",
  alignItems: "center",
  justifyContent: "flex-start",
  flexDirection: "row",
  zIndex: 1,
  position: "relative", // Add position relative to the container
  opacity: 0.8, // Set the transparency of the image to 80%
});

const SubRightContainer = styled("div")({
  width: "50%",
  backgroundColor: "#ffff15", // Light yellow
  display: "flex",
  height: "100%",
  alignItems: "center",
  justifyContent: "flex-end",
  flexDirection: "row",
  zIndex: 1,
  position: "relative", // Add position relative to the container
  opacity: 0.8, // Set the transparency of the image to 80%
});

const SecondContainer = styled("div")({
  position: "absolute",
  top: 0,
  bottom: 0,
  right: 0,
  width: "20%",
  // backgroundColor: "red",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "row", // Add flexDirection column to align date at top-right corner
});

const DateContainer = styled("div")({
  position: "absolute",
  top: "0px",
  right: "0px",
  backgroundColor: "blue",
  padding: "5px",
  borderRadius: "0px",
});

const MatchPage = () => {
  // Sample data for 10 match cards
  const matchData = [
    {
      title: "Team A vs Team B",
      teamA: "Team A",
      teamB: "Team B",
      teamAImage: teamAImage,
      teamBImage: teamBImage,
      teamAbanner: teamAbanner,
      teamBbanner: teamBbanner,
    },
    {
      title: "Team C vs Team D",
      teamA: "Team C",
      teamB: "Team D",
      teamAImage: teamAImage,
      teamBImage: teamBImage,
      teamAbanner: teamAbanner,
      teamBbanner: teamBbanner,
    },
    {
      title: "Team E vs Team F",
      teamA: "Team E",
      teamB: "Team F",
      teamAImage: teamAImage,
      teamBImage: teamBImage,
      teamAbanner: teamAbanner,
      teamBbanner: teamBbanner,
    },

    {
      title: "Team G vs Team H",
      teamA: "Team G",
      teamB: "Team H",
      teamAImage: teamAImage,
      teamBImage: teamBImage,
      teamAbanner: teamAbanner,
      teamBbanner: teamBbanner,
    },
    {
      title: "Team I vs Team J",
      teamA: "Team I",
      teamB: "Team J",
      teamAImage: teamAImage,
      teamBImage: teamBImage,
      teamAbanner: teamAbanner,
      teamBbanner: teamBbanner,
    },
    // Add more match data as needed
  ];

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      {matchData.map((match, index) => (
        <MatchCardContainer key={index}>
          <FirstContainer>
            <LeftContainer>
              <TeamProfileCircle>
                <img
                  src={match.teamAImage}
                  alt="Team A"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </TeamProfileCircle>
              <Typography>vs</Typography>
              <TeamProfileCircle>
                <img
                  src={match.teamBImage}
                  alt="Team B"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </TeamProfileCircle>
            </LeftContainer>
            <MiddleContainer>
              <Typography
                sx={{
                  color: "#FFFFFF",
                  position: "absolute",
                  top: "90%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  fontSize: "36px",
                  fontWeight: "bold",
                  zIndex: 2,
                  textShadow: "1px 1px 2px rgba(0, 0, 0, 0.8)",
                }}
              >
                {match.teamA}
              </Typography>
              <SubLeftContainer>
                <img
                  src={match.teamAbanner}
                  alt="teamAbanner"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </SubLeftContainer>
              {/* <Box flexGrow={1} textAlign="center">
                {match.teamA}
              </Box> */}
              {/* <Typography sx={{
                color: "#FFFFFF",
                fontSize: "24px",
              }}>vs</Typography> */}
              {/* <Box flexGrow={1} textAlign="center">
                {match.teamB}
              </Box> */}
              <Typography
                sx={{
                  color: "#FFFFFF",
                  position: "absolute",
                  top: "90%",
                  left: "75%",
                  transform: "translate(-50%, -50%)",
                  fontSize: "36px",
                  fontWeight: "bold",
                  zIndex: 2,
                  textShadow: "1px 1px 2px rgba(0, 0, 0, 0.8)",
                }}
              >
                {match.teamB}
              </Typography>
              <SubRightContainer>
                <img
                  src={match.teamBbanner}
                  alt="teamBbanner"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </SubRightContainer>
            </MiddleContainer>
          </FirstContainer>
          <SecondContainer>
            <DateContainer>July 28, 2023</DateContainer>
            <Button
              sx={{
                marginRight: "5px",
              }}
              variant="contained"
              color="primary"
              size="small"
            >
              Show Details
            </Button>
            <Button
              sx={{
                marginLeft: "5px",
              }}
              variant="contained"
              color="primary"
              size="small"
            >
              Book
            </Button>
          </SecondContainer>
        </MatchCardContainer>
      ))}
    </Box>
  );
};

export default MatchPage;
