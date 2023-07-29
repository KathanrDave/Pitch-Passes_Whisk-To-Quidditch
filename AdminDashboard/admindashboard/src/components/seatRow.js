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
    margin: "0 1px 1px 0", // Add equal margin of 1px after each seat
  };

const seatKeys=[];
const generateSeatKey = (matrixIndex, rowIndex, colIndex) => {
  const towerChar = String.fromCharCode(matrixIndex + 65); 
  const seatCounter=(rowIndex)*numCols+colIndex+1;
  const seatKey = `${towerChar}${seatCounter}`;
  
  // Check if the seatKey is not present in the seatKeys array
  if (!seatKeys.includes(seatKey)) {
    // Add the new seatKey to the seatKeys array
    seatKeys.push(seatKey);
  }

  return seatKey;
};


  const handleSeatSelection = (seatKey) => {
    setSelectedSeatKey(seatKey);
    // Check if the seatKey is already in the selectedSeats list
    if (selectedSeats.includes(seatKey)) {
      // Remove the seatKey from the list if it's already selected
      setSelectedSeats(selectedSeats.filter((key) => key !== seatKey));
    } else {
      // Add the seatKey to the list if it's not already selected
      setSelectedSeats([...selectedSeats, seatKey]);
    }
  };

  // used for sending the match id to small box book
  useEffect(() => {
    console.log("Selected seats:", selectedSeats.join(", "));
    // Send both selectedSeats and matchId as an object
    seatDataCallback({ selectedSeats });
  }, [selectedSeats]);

  // function to make the seat according to particular id

  const makeSeats = async (seatKey, matchId) => {
    const createSeat = async (seatKey) => {
      const url = `http://localhost:3002/admin/addseats/checkseats?matchId=${matchId}&seatKey=${seatKey}`;
      try {
        const response = await axios.get(url);
        if (!response.data) {
          console.log(`Creating seat ${seatKey}`);
          const seatUrl = "http://localhost:3002/admin/addseats/createseats";
          const seatData = {
            seatNumber: seatKey,
            seatAvailability: "available",
            seatPrice: "100", // Replace with the desired seat price
            seatType: "standard", // Replace with the desired seat type
            matchId: matchId,
          };
          const createResponse = await axios.post(seatUrl, seatData);
          console.log(createResponse.data);
          return createResponse.data; // Return the created seat data

        } else {
          console.log(`Seat ${seatKey} already exists`);
          return null; // Return null if seat already exists
          
        }
      } catch (error) {
        console.log(`Error processing seat ${seatKey}:`, error);
        return null; // Return null in case of error
      }
    };
  };




  // const generateSeatStatus = async (matrixIndex, rowIndex, colIndex) => {
  //   let response;
  //   try {
  //     // Make an API call to fetch the list of booked seats from the backend
  //     response = await fetch('/api/booked-seats'); // Replace '/api/booked-seats' with the appropriate API endpoint
  //     if (!response.ok) {
  //       throw new Error('Failed to fetch booked seats');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching booked seats:', error);
  //     // Handle error or fallback to a default value if necessary
  //     return 'unavailable';
  //   }

  //   const bookedSeats = await response.json();

  //   // Check if the seat is booked based on the fetched data
  //   const seatKey = generateSeatKey(matrixIndex, rowIndex, colIndex);
  //   const isBooked = bookedSeats.includes(seatKey);

  //   return isBooked ? 'booked' : 'available';
  // };

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
                    makeSeats(
                      generateSeatKey(matrixIndex, rowIndex, colIndex),
                      matchId
                    ),
                    (
                      <Seat
                        user={true}
                        key={generateSeatKey(matrixIndex, rowIndex, colIndex)}
                        seatKey={generateSeatKey(
                          matrixIndex,
                          rowIndex,
                          colIndex
                        )}
                        status={"available"}
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
                    makeSeats(
                      generateSeatKey(
                        matrixIndex + matricesPerSide,
                        rowIndex,
                        colIndex
                      ),
                      matchId
                    ),
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
                        status={"available"}
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
