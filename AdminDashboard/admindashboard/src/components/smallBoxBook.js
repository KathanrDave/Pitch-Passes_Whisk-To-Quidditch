import React, { useEffect, useState } from 'react';
import {createPortal} from 'react-dom';
import Box from "@mui/material/Box";
import styled from "styled-components";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ConfirmationBox from './confirmationBox';
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

  const email='divypatel@gmail.com';
  const [seatsArray, setSeatsArray] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

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

  // console.log(seatsArray);  
  const handleConfirm =async()=>{
    setShowModal(false);
    try{
      const postUrl=`http://localhost:3002/setBookingSeat?matchId=${matchId}&email=${email}`;     
      const Seats={seatsId:seatsArray,}
      const response =await axios.post(postUrl,Seats);
      console.log(response.data);
     }catch(err){
      console.log(err);
     }
     try{
    const putUrl = `http://localhost:3002/updateBookingSeat?matchId=${matchId}`;
    const Seats={seatsId:seatsArray,}
    const newresponse=await axios.put(putUrl,Seats);
    console.log(newresponse.data);
     }catch(err)
     {
      console.log(err);
     }
     console.log("Get :",showModal);
    if(showModal)
    {navigate(`/final-ticket?matchId=${matchId}&email=${email}`);}
  }
  const handleBook = async() => {
    setShowModal(true);
    console.log(showModal);
  };
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
        {showModal && createPortal(<ConfirmationBox onConfirm={handleConfirm}/>,document.getElementById('another-root'))}
      </Box>
    </div>
  );
}
