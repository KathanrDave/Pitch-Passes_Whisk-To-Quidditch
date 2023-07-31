import React from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";

const CardWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "400px",
  height: "400px",
  padding: "50px 20px", // Decreased the horizontal padding to adjust for the card width
  backgroundColor: "#6e4ce1",
  borderRadius: "38px",
  color: "#f6f2e8",
  margin: "0 20px", // Added left margin to center the first card
  transition: "width 0.3s ease-in-out", // Added the transition property for smooth width changes
  [theme.breakpoints.down("sm")]: {
    width: "100px",
    height: "300px",
    padding: "30px 20px",
  },
}));

const HorizontalScrollerfirst = () => {
  const cardData = [
    { id: 1, title: "Card 1" },
    { id: 2, title: "Card 2" },
    { id: 3, title: "Card 3" },
    { id: 4, title: "Card 4" },
    { id: 5, title: "Card 5" },
    // Updated card titles to show the correct number

    // Add more cards if needed
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        minHeight: "100vh", // Set the minimum height of the container to 100% of the viewport height
        backgroundColor: "black", // Optional background color for the page
        overflowX: "auto", // Allow horizontal scrolling
        scrollbarWidth: "none", // Hide scrollbar for modern browsers
        msOverflowStyle: "none", // Hide scrollbar for old Edge
        WebkitOverflowScrolling: "touch", // Improve touch scrolling experience on mobile
        "&::-webkit-scrollbar": {
          display: "none", // Hide scrollbar for Safari and Chrome
        },
        scrollBehavior: "smooth",
      }}
    >
      <Box
        sx={{
          display: "flex",
          padding: "20px",
        }}
      >
        {cardData.map((card) => (
          <CardWrapper key={card.id}>
            <Typography variant="h2">{card.title}</Typography>
          </CardWrapper>
        ))}
      </Box>
    </Box>
  );
};

export default HorizontalScrollerfirst;
