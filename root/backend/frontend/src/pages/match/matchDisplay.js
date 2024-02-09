import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";

export default function MatchDisplay() {
  const location = useLocation();
  const navigate = useNavigate();
  const [matchData, setMatchData] = useState([]);
  const [remainingMatchIds, setRemainingMatchIds] = useState([
    "64c39a76e83192d6834abf4a",
    "64c39a85e83192d6834abf4c",
  ]);

  const matchIds = matchData.map((data) => data.matchId); // Array to store matchIds

  useEffect(() => {
    const fetchMatchData = async () => {
      try {
        while (remainingMatchIds.length > 0) {
          const matchId = remainingMatchIds.shift();
          const response = await axios.get(
            `http://localhost:5000/admin/extractdetails?matchId=${matchId}`
          );

          const data = response.data;
          const initialTime = dayjs(new Date(data.dateTime.time));
          const initialDate = dayjs(new Date(data.dateTime.date));

          const matchItem = {
            matchId: matchId,
            matchTitle: data.matchTitle,
            venue: data.venue,
            matchDetails: data.matchDetails,
            date: initialDate,
            time: initialTime,
          };

          setMatchData((prevMatchData) => [...prevMatchData, matchItem]);
        }
      } catch (error) {
        console.error("Error retrieving match data:", error.response);
      }
    };

    if (location.pathname) {
      fetchMatchData();
    }
  }, [location, remainingMatchIds]);

  const handleBookTicket = (index) => {
    const matchId = matchIds[index]; // Access matchId using the index
    navigate(`/book-tickets/${matchId}`);
  };

  return (
    <Container sx={{ flexGrow: 2, overflow: "auto", borderColor: "black" }}>
      {matchData.map((data, index) => (
        <AppBar
          key={index}
          position="static"
          sx={{
            background: "white",
            borderRadius: "12px",
            height: "80px",
            mb: "10px",
            borderColor: "black",
          }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, color: "black", fontSize: "24px" }}
            >
              {data.matchTitle}
            </Typography>
            <Button
              key={`bookTicket-${index}`}
              sx={{
                color: "black",
                borderRadius: "8px",
                padding: "10px 20px",
                fontSize: "16px",
                fontWeight: "bold",
              }}
              onClick={() => handleBookTicket(index)}
            >
              Book Ticket
            </Button>
            <Button
              sx={{
                color: "black",
                borderRadius: "8px",
                padding: "10px 20px",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              Show Details
            </Button>
          </Toolbar>
        </AppBar>
      ))}
    </Container>
  );
}
