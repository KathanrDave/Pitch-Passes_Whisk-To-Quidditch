import React, { useEffect, useState } from 'react';
import Box from "@mui/material/Box";
import styled from "styled-components";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StyledButton = styled.button`
  background-color: #3f51b5;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: #303f9f;
  }
  &:active {
    background-color: #283593;
  }
`;

export default function BoxBook({ selectedSeats, matchId }) {
  const email='divypatel0403@gmail.com';
  const [seatsArray, setSeatsArray] = useState([]);
  const navigate = useNavigate();
  console.log(matchId); 

  useEffect(() => {
    if (typeof selectedSeats === 'object' && selectedSeats !== null) {
      setSeatsArray(Object.values(selectedSeats));
    } else {
      setSeatsArray([]);
    }
  }, [selectedSeats]);

  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    setTotalPrice(calculateTotalPrice());
  }, [seatsArray, selectedSeats]);

  const seatsArrayLength = seatsArray[0] ? seatsArray[0].length : 0;

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    totalPrice=seatsArrayLength*100;
    return totalPrice;
  };
  console.log(seatsArray);
  const handleBook = (matchId,email,seatsArray) => {
    // now sending the backend request for the sending data to the backend server for final registering the user 
    // const response =await axios.put(`http://localhost:3002/setBookingSeat`)

    navigate(`/final-ticket?matchId=${matchId}&email=${email}`);
  };
  
  // const boxSize = 200 + seatsArray.length * 20;

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          height: '300px',
          width: "300px",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap", // Add this to enable wrapping
          backgroundColor: "#f0f0f0",
          padding: "10px",
          border: "1px solid #ccc",
          fontFamily: "Roboto, sans-serif",
          borderRadius: "5px",
          fontWeight: "bold",
          position: "absolute",
          bottom: "30px",
          right: "30px",
        }}
      >
        <div
          sx={{
            padding: "10px",
            backgroundColor: "#66c2ff",
            color: "#fff",
            borderRadius: "3px",
            marginBottom: "10px",
          }}
        >
          No of Tickets: {seatsArrayLength}
        </div>
        <div
          sx={{
            padding: "10px",
            backgroundColor: "#66c2ff",
            color: "#fff",
            borderRadius: "3px",  
            marginBottom: "10px",
          }}
        >
          Total: {totalPrice}
        </div>
        <div
          sx={{
            padding: "10px",
            backgroundColor: "#66c2ff",
            color: "#fff",
            borderRadius: "3px",
            marginBottom: "10px",
          }}
        >
          Seats: {seatsArray.join(", ")}
        </div>
        <StyledButton  onClick={handleBook}>BOOK NOW</StyledButton>
      </Box>
    </div>
  );
}
