import React, { useEffect, useState } from 'react';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import styled from "styled-components";
import axios from 'axios';
export default function BoxBook(seatData) {
  const Total = 100;
  const Tickets = 100;
  const { selectedSeats } = seatData;
  const [seatsArray, setSeatsArray] = useState(Object.keys(selectedSeats));
  const [totalPrice, setTotalPrice] = useState(0);
  const matchId='64a55f28de73098269e32abd';
  // calculate the total seat price 
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    seatsArray.forEach((seatKey) => {
      const seatID=selectedSeats[seatKey];
      const url=`http://localhost:3002/admin/addseats/checkSeatsPrice?matchId=${matchId}&seatKey=${seatID}`;
      axios.get(url).then((response) => {

      })
      const seatPrice = selectedSeats[seatKey];
      totalPrice += seatPrice;
    });
    return totalPrice;
  };
// changes is called when the user changes the seat
  useEffect(() => {
    const newTotalPrice = calculateTotalPrice();
    setTotalPrice(newTotalPrice);
  }, [seatsArray, selectedSeats]);
 

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

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          height: 200,
          width: 200,
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#f0f0f0",
          padding: "10px",
          border: "1px solid #ccc",
          fontFamily: "Roboto, sans-serif", // Use the Roboto font here
          borderRadius: "5px",
          fontWeight: "bold",
          position: "absolute",
          bottom: "50px",
          right: "50px",
        }}
      >
        <div
          sx={{
            padding: "10px",
            backgroundColor: "#66c2ff",
            color: "#fff",
            borderRadius: "3px",
          }}
        >
          No of Tickets: {Tickets}
        </div>
        <div
          sx={{
            padding: "10px",
            backgroundColor: "#66c2ff",
            color: "#fff",
            borderRadius: "3px",
          }}
        >
          Total: {Total}
        </div>
        <div
      sx={{
        padding: "10px",
        backgroundColor: "#66c2ff",
        color: "#fff",
        borderRadius: "3px",
      }}
    >
      Seats:
      {seatsArray.map((seat, index) => (
        <span key={index}>{selectedSeats[seat]},</span>
      ))}
    </div>
        
        <StyledButton>BOOK NOW</StyledButton>
      </Box>
    </div>
  );
}
