import React, { useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";

const HorizontalScrollerfirst = () => {
  const horizontalRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (horizontalRef.current) {
        const scrollPosition =
          window.pageYOffset || document.documentElement.scrollTop;
        const cardWidth = 540;
        const cardMargin = 20;
        const numberOfCards = 5;
        const totalScrollWidth = (cardWidth + cardMargin) * numberOfCards; // Adjusted for 4 cards

        // Calculate the current scroll percentage
        const scrollPercentage =
          (scrollPosition /
            (document.documentElement.scrollHeight - window.innerHeight)) *
          100;

        // Calculate the translateX value to move the cards horizontally
        const translateX =
          (scrollPercentage / 100) *
          (totalScrollWidth - window.innerWidth + cardWidth) *
          3;

        // Restrict the translateX value within the range of the cards
        const minTranslateX = 0;
        const maxTranslateX = (cardWidth + cardMargin) * (numberOfCards + 1);
        const clampedTranslateX = Math.min(
          Math.max(translateX, minTranslateX),
          maxTranslateX
        );

        horizontalRef.current.style.transform = `translateX(-${clampedTranslateX}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Box
      id="horizontal-scroll"
      sx={{
        backgroundColor: "#04091E",
        height: "120vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        position: "relative", // Added position relative
      }}
    >
      <Box
        ref={horizontalRef}
        sx={{
          display: "flex",
          transition: "transform 0.3s ease-in-out",
          scrollBehavior: "smooth",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          position: "absolute", // Added position absolute
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            padding: "0 15px",
            height: "300px",
            marginLeft: "20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "540px",
              height: "540px",
              padding: "50px 40px",
              backgroundColor: "#6e4ce1",
              borderRadius: "38px",
              color: "#f6f2e8",
              marginLeft: "20px",
            }}
          >
            <Typography variant="h2">Card 1</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "540px",
              height: "540px",
              padding: "50px 40px",
              backgroundColor: "#6e4ce1",
              borderRadius: "38px",
              color: "#f6f2e8",
              marginLeft: "20px",
            }}
          >
            <Typography variant="h2">Card 2</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "540px",
              height: "540px",
              padding: "50px 40px",
              backgroundColor: "#6e4ce1",
              borderRadius: "38px",
              color: "#f6f2e8",
              marginLeft: "20px",
            }}
          >
            <Typography variant="h2">Card 3</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "540px",
              height: "540px",
              padding: "50px 40px",
              backgroundColor: "#6e4ce1",
              borderRadius: "38px",
              color: "#f6f2e8",
              marginLeft: "20px",
            }}
          >
            <Typography variant="h2">Card 4</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "540px",
              height: "540px",
              padding: "50px 40px",
              backgroundColor: "#6e4ce1",
              borderRadius: "38px",
              color: "#f6f2e8",
              marginLeft: "20px",
            }}
          >
            <Typography variant="h2">Card 5</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HorizontalScrollerfirst;
