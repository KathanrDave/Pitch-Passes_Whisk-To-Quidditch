import React from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import Seat from "./Seat";
import { useState, useEffect } from "react";
const SeatingMap = ({ seatDataCallback, matchId }) => {
  const numRows = 4;
  const numCols = 4;
  const numMatrices = 8;
  const matricesPerSide = 4;
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedSeatKey, setSelectedSeatKey] = useState(null);
  const [selected, setSelected] = useState(false);
  const matrixContainerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: "10px 10px",
  };
  const rowStyle = {
    display: "flex",
  };
  const matrixBoxStyle = {
    width: "20px",
    height: "20px",
    backgroundColor: "lightgray",
    border: "1px solid gray",
    margin: "0 1px 1px 0",
  };

const generateSeatKey = (matrixIndex, rowIndex, colIndex) => {
  const towerChar = String.fromCharCode(matrixIndex + 65); 
  const seatCounter=(rowIndex)*numCols+colIndex+1;
  const seatKey = `${towerChar}${seatCounter}`;
  return seatKey;
};
  // State variables to store the list of booked and unavailable seats
  const [bookedSeats, setBookedSeats] = useState([]);
  const [unavailableSeats, setUnavailableSeats] = useState([]);
useEffect(() => {
  // Function to fetch data from the backend and update state with booked and unavailable seats
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3002/users/seatList?matchId=${matchId}`);
      const { booked, unavailable } = response.data;
      
      setBookedSeats(booked);
      setUnavailableSeats(unavailable);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  fetchData();
}, [matchId]); // <-- Add matchId to the dependency array

  const handleSeatSelection = (seatKey) => {
    setSelectedSeatKey(seatKey);
    if (selectedSeats.includes(seatKey)) {
      setSelectedSeats(selectedSeats.filter((key) => key !== seatKey));
    } else {
      setSelectedSeats([...selectedSeats, seatKey]);
    }
  };

  // used for sending the match id to small box book
  useEffect(() => {
    console.log("Selected seats:", selectedSeats.join(", "));
    seatDataCallback({ selectedSeats });
  }, [selectedSeats]);

  // function to make the seat according to particular id
  const generateSeatStatus = async (seatKey) => {
    const isBooked = bookedSeats.includes(seatKey);
    const isUnavailable=unavailableSeats.includes(seatKey);
    return  isUnavailable ? 'unavailable' :  (isBooked ?  'booked' : 'available' );
  };

  return (
    <div style={matrixContainerStyle}>
      <div style={rowStyle}>
        {Array.from({ length: matricesPerSide }).map((_, matrixIndex) => (
          <div key={matrixIndex} style={matrixContainerStyle}>
            <div
              style={{
                marginBottom: "10px",
                fontWeight: "bold",
                font: "Poppins",
              }}
            >
              Tower : {String.fromCharCode(matrixIndex + 1 + 64)}
            </div>
            {Array.from({ length: numRows }).map((_, rowIndex) => (
              <div key={rowIndex} style={rowStyle}>
                {Array.from({ length: numCols }).map(
                  (_, colIndex) => (
                    (
                      <Seat
                        user={true}
                        key={generateSeatKey(matrixIndex, rowIndex, colIndex)}
                        seatKey={generateSeatKey(
                          matrixIndex,
                          rowIndex,
                          colIndex
                        )}
                        statusPromise={generateSeatStatus(generateSeatKey(matrixIndex,
                          rowIndex,
                          colIndex))}
                        style={matrixBoxStyle}
                        onSelect={handleSeatSelection}
                        checkselect={selected}
                      />
                    )
                  )
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div style={rowStyle}>
        {Array.from({ length: matricesPerSide }).map((_, matrixIndex) => (
          <div key={matrixIndex + matricesPerSide} style={matrixContainerStyle}>
            <div
              style={{
                marginBottom: "10px",
                fontWeight: "bold",
                font: "Poppins",
              }}
            >
              Tower : {String.fromCharCode(matrixIndex + 5 + 64)}
            </div>
            {Array.from({ length: numRows }).map((_, rowIndex) => (
              <div key={rowIndex} style={rowStyle}>
                {Array.from({ length: numCols }).map(
                  (_, colIndex) => (
                    (
                      <Seat 
                        user={true}
                        key={generateSeatKey(
                          matrixIndex + matricesPerSide,
                          rowIndex,
                          colIndex
                        )}
                        seatKey={generateSeatKey(
                          matrixIndex + matricesPerSide,
                          rowIndex,
                          colIndex
                        )}
                        statusPromise={generateSeatStatus(generateSeatKey(
                          matrixIndex + matricesPerSide,
                          rowIndex,
                          colIndex
                        ))}
                        style={matrixBoxStyle}
                        onSelect={handleSeatSelection}
                        checkselect={selected}
                      />
                    )
                  )
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeatingMap;
