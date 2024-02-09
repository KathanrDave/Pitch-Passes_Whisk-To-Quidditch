import React from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import teamAImage from "../pages/teamimages/teamA.jpeg";
import teamBImage from "../pages/teamimages/teamB.jpg";
import teamAbanner from "../pages/teamimages/teamAbanner.jpg";
import teamBbanner from "../pages/teamimages/teamBbanner.jpg";
// ... (import statements)

const CardWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  // alignItems: "center",
  // justifyContent: "center",
  width: "400px",
  height: "400px",
  // padding: "10px 5px",
  backgroundColor: "#6e4ce1",
  position: "relative",
  borderRadius: "38px",
  color: "#f6f2e8",
  margin: "0 20px",
  transition: "width 0.3s ease-in-out",
  [theme.breakpoints.down("sm")]: {
    width: "100px",
    height: "300px",
    padding: "30px 20px",
  },
}));

const ImageContainerTop = styled(Box)({
  width: "100%",
  height: "15%",
  top: 0,
  borderRadius: "38px 38px 0px 0px ",
  backgroundColor: "#f0f0f0", // Different shades of gray
  display: "flex",

  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.3)",
  zIndex: 2,
});
const ImageContainerBottom = styled(Box)({
  width: "100%",
  height: "15%",
  borderRadius: "0px 0px 38px 38px  ",
  backgroundColor: "red", // Different shades of gray
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute", // Position it at the bottom
  bottom: 0,
  boxShadow: "0px -5px 15px rgba(0, 0, 0, 0.3)",
  zIndex: 2,
});

const TopLeftCircle = styled(Box)({
  width: "60px",
  height: "60px",
  borderRadius: "50%",
  backgroundColor: "white",
  overflow: "hidden",
  position: "absolute",
  top: "50%",
  left: "10%",
  boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.5)",
  zIndex: 2, // E
});

const BottomRightCircle = styled(Box)({
  width: "60px",
  height: "60px",
  borderRadius: "50%",
  overflow: "hidden",
  backgroundColor: "white",
  position: "absolute",
  bottom: "50%",
  right: "10%",
  boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.7)",
  zIndex: 2, // Elevating effect
});
const MatchDetailsContainer = styled(Box)({
  width: "100%",
  height: "70%",
  backgroundColor: "grey", // Semi-transparent black
  position: "absolute",
  bottom: "15%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1,
});
const TeamOneText = styled(Typography)({
  color: "white",
  position: "absolute",
  top: "10%",
  left: "20%",
  transform: "translateY(50%)",
});

const TeamTwoText = styled(Typography)({
  color: "white",
  position: "absolute",
  bottom: "10%",
  right: "20%",
  transform: "translateY(-50%)",
});

const MatchTimeText = styled(Typography)({
  color: "white",
  fontSize: "18px",
  fontWeight: "bold",
  zIndex: 2,
});

const MatchDateText = styled(Typography)({
  color: "white",
  fontSize: "18px",
  fontWeight: "bold",
  zIndex: 2,
});
const MatchTimeDateContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
});
const VsText = styled(Typography)({
  color: "white",
  fontSize: "24px",
  fontWeight: "bold",
});
const HorizontalScrollerfirst = () => {
  const cardData = [
    {
      id: 1,
      title: "Card 1",
      matchDetails: "Match Details 1",
      teamOne: "Team A",
      teamTwo: "Team B",
      matchTime: "10:00 AM",
      matchDate: "2023-08-10",
    },
    {
      id: 1,
      title: "Card 1",
      matchDetails: "Match Details 1",
      teamOne: "Team A",
      teamTwo: "Team B",
      matchTime: "10:00 AM",
      matchDate: "2023-08-10",
    },
    {
      id: 1,
      title: "Card 1",
      matchDetails: "Match Details 1",
      teamOne: "Team A",
      teamTwo: "Team B",
      matchTime: "10:00 AM",
      matchDate: "2023-08-10",
    },
    {
      id: 1,
      title: "Card 1",
      matchDetails: "Match Details 1",
      teamOne: "Team A",
      teamTwo: "Team B",
      matchTime: "10:00 AM",
      matchDate: "2023-08-10",
    },
    // ... (other card data)
  ];
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        minHeight: "80%",
        backgroundColor: "black", // Different shades of gray
        overflowX: "auto",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        WebkitOverflowScrolling: "touch",
        "&::-webkit-scrollbar": {
          display: "none",
        },
        scrollBehavior: "smooth",
      }}
    >
      <Box sx={{ display: "flex", padding: "20px" }}>
        {cardData.map((card) => (
          <CardWrapper key={card.id}>
            <ImageContainerTop>
              <img
                src={teamAbanner}
                alt="teamAbanner"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "38px 38px 0px 0px ",
                }}
              />

              <TopLeftCircle>
                {/* Place your image here */}
                <img
                  src={teamAImage}
                  alt="Team A"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </TopLeftCircle>
            </ImageContainerTop>
            <ImageContainerBottom>
              <img
                src={teamBbanner}
                alt="teamAbanner"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "0px 0px 38px 38px  ",
                }}
              />
              <BottomRightCircle>
                {/* Place your image here */}
                <img
                  src={teamBImage}
                  alt="Team B"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </BottomRightCircle>
            </ImageContainerBottom>
            <MatchDetailsContainer>
              <TeamOneText>{card.teamOne}</TeamOneText>

              <TeamTwoText>{card.teamTwo}</TeamTwoText>
              <MatchTimeDateContainer>
                <MatchTimeText>{card.matchTime}</MatchTimeText>
                <VsText>VS</VsText>
                <MatchDateText>{card.matchDate}</MatchDateText>
              </MatchTimeDateContainer>
            </MatchDetailsContainer>
          </CardWrapper>
        ))}
      </Box>
    </Box>
  );
};

export default HorizontalScrollerfirst;
