import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/system";

// Styled components for match cards
const MatchCardContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  height: "100px",
  width: "100%",
  padding: theme.spacing(2),
  //   marginBottom: theme.spacing(4),/
  marginBottom: "30px",
  position: "relative",
  borderRadius: "20px 20px 20px 20px",
  overflow: "hidden",
  boxShadow: "1px 4px 6px rgba(0, 0, 0, 0.4)",
  background:
    "linear-gradient(100deg, rgba(255, 255, 255, 0.6) 10%, rgba(255, 0, 0, 0.6) 40%, rgba(0, 255, 0, 0.6) 60%, rgba(255, 255, 255, 0.6) 90%)",
}));

const TeamProfileCircle = styled("div")({
  width: 50,
  height: 50,
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
const MatchCardVersionOne = ({
  title,
  teamA,
  teamB,
  teamAImage,
  teamBImage,
  teamAbanner,
  teamBbanner,
}) => {
  return (
    <MatchCardContainer>
      <FirstContainer>
        <LeftContainer>
          <TeamProfileCircle>
            <img
              src={teamAImage}
              alt={teamA}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </TeamProfileCircle>
          <Typography>vs</Typography>
          <TeamProfileCircle>
            <img
              src={teamBImage}
              alt={teamB}
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
            {teamA}
          </Typography>
          <SubLeftContainer>
            <img
              src={teamAbanner}
              alt={`${teamA} banner`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </SubLeftContainer>
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
            {teamB}
          </Typography>
          <SubRightContainer>
            <img
              src={teamBbanner}
              alt={`${teamB} banner`}
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
  );
};

export default MatchCardVersionOne;
