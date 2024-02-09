import React from "react";
import {
  Box,
  Button,
  TextField,
  FormLabel,
  CssBaseline,
  Typography,
} from "@mui/material";

import teamAImage from "../teamimages/teamA.jpeg";
import teamBImage from "../teamimages/teamB.jpg";
import teamAbanner from "../teamimages/teamAbanner.jpg";
import teamBbanner from "../teamimages/teamBbanner.jpg";

const MatchSee = () => {
  return (
    <Box>
      <CssBaseline />
      {/* Bottom Container */}
      <Box sx={{ width: "100%", height: "75px", bgcolor: "black" }}></Box>
      <Box
        sx={{
          width: "100%",
          height: "150px",
          bgcolor: "grey",
          overflow: "hidden",
        }}
      >
        <img
          src={teamAbanner}
          alt="teamAbanner"
          style={{ width: "50%", height: "150px", objectFit: "cover" }}
        />
        <img
          src={teamBbanner}
          alt="teamAbanner"
          style={{ width: "50%", height: "150px", objectFit: "cover" }}
        />
      </Box>

      <Box
        sx={{
          position: "absolute",
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          bgcolor: "grey",
          top: "25%",
          left: "15%", // Centering horizontally
          overflow: "hidden",
        }}
      >
        <img
          src={teamAImage}
          alt="Team A"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Box>
      <Box
        sx={{
          position: "absolute",
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          bgcolor: "grey",
          top: "25%",
          left: "80%",
          overflow: "hidden", // Centering horizontally
        }}
      >
        <img
          src={teamBImage}
          alt="Team B"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Box>

      <Box
        sx={{
          width: "400px",
          height: "500px",
          bgcolor: "grey",
          position: "absolute",
          top: "40%",
          left: "18%",
        }}
      ></Box>
      <Box
        sx={{
          width: "400px",
          height: "500px",
          bgcolor: "grey",
          position: "absolute",
          top: "40%",
          left: "64%",
        }}
      ></Box>
    </Box>
  );
};

export default MatchSee;
