import React from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';
import Seat from './Seat';
import  { useState,useEffect } from 'react';
import TextField from '@mui/material/TextField'; // Import the TextField component
const SeatingMap = ({seatDataCallback}) => {
  const numRows = 4; // Number of rows in each matrix
  const numCols = 4; // Number of columns in each matrix
  const numMatrices = 8; // Total number of matrices
  const matricesPerSide = 4; // Number of matrices on each side (upper and lower)
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedSeatKey, setSelectedSeatKey] = useState(null);
  // const [seatStatuses, setSeatStatuses] = useState({});
  const [selected, setSelected] = useState(false);
  const matrixContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center', // Center align the content horizontally
    alignItems: 'center',
    margin: '10px 10px', // Add space on both sides of the matrix
  };

  const rowStyle = {
    display: 'flex',
  };

  const matrixBoxStyle = {
    width: '20px',
  height: '20px',
  backgroundColor: 'lightgray',
  border: '1px solid gray',
  margin: '0 1px 1px 0', // Add equal margin of 1px after each seat
  };

  const generateSeatKey = (matrixIndex, rowIndex, colIndex) => {
    // console.log(`${matrixIndex}-${rowIndex}-${colIndex}`);
    return `${matrixIndex}-${rowIndex}-${colIndex}`;
  };


  const handleSeatSelection = (seatKey) => {
    console.log(seatKey);
    setSelectedSeatKey(seatKey);
    console.log(typeof(seatKey));
    // Check if the seatKey is already in the selectedSeats list
    if (selectedSeats.includes(seatKey)) {
      // Remove the seatKey from the list if it's already selected
      setSelectedSeats(selectedSeats.filter((key) => key !== seatKey));
    } else {
      // Add the seatKey to the list if it's not already selected
      setSelectedSeats([...selectedSeats, seatKey]);
    }
  };
  useEffect(() => {
    console.log(selectedSeats.length)
    console.log('Selected seats:', selectedSeats.join(', '));
    seatDataCallback(selectedSeats);
  }, [selectedSeats]);
  
  const seatPrice=100;
  const seatType='Silver';
const matchId='64a55f28de73098269e32abd';
// const Id=matchId;

// function to make the seat according to particular id


const makeSeats = async (seatKey, matchId) => {
  const url = `http://localhost:3002/admin/addseats/checkseats?matchId=${matchId}&seatKey=${seatKey}`;

  let response;
  try {
    response = await axios.get(url);
    console.log(response.data);
  } catch (error) {
    console.log('Error:', error);
    // alert('Error checking seat. Please try again later.');
    return;
  }

  if (!response.data) {
    console.log('Creating seat');
    const seatUrl = `http://localhost:3002/admin/addseats/createseats`;
    const seatData = {
      seatNumber: seatKey,
      seatAvailability: 'available',
      seatPrice: '100', // Replace with the desired seat price
      seatType: 'standard', // Replace with the desired seat type
      matchId: matchId,
    };

    try {
      const createResponse = await axios.post(seatUrl, seatData);
      console.log(createResponse.data);
    } catch (error) {
      console.log('Error creating seat:', error);
    }
  } else {
    // console.log('Seat already exists');
  }
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
             <div style={{ marginBottom: '10px', fontWeight: 'bold' ,font:'Poppins'}}>Tower : {String.fromCharCode(matrixIndex + 1+ 64) }</div>
            {Array.from({ length: numRows }).map((_, rowIndex) => (
              <div key={rowIndex} style={rowStyle}>
                {Array.from({ length: numCols }).map((_, colIndex) => (
                makeSeats(generateSeatKey(matrixIndex, rowIndex, colIndex),matchId),
                  <Seat
    user={true}
    key={generateSeatKey(matrixIndex, rowIndex, colIndex)}
    seatKey={generateSeatKey(matrixIndex, rowIndex, colIndex)}
    status={'available'}
    style={matrixBoxStyle}
    onSelect={handleSeatSelection}
    checkselect={selected}
/>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div style={rowStyle}>
        {Array.from({ length: matricesPerSide }).map((_, matrixIndex) => (
          <div key={matrixIndex + matricesPerSide} style={matrixContainerStyle}>
                         <div style={{ marginBottom: '10px', fontWeight: 'bold' ,font:'Poppins'}}>Tower : {String.fromCharCode(matrixIndex + 5+ 64) }</div>
            {Array.from({ length: numRows }).map((_, rowIndex) => (
              <div key={rowIndex} style={rowStyle}>
                {Array.from({ length: numCols }).map((_, colIndex) => (
                  makeSeats(generateSeatKey(matrixIndex + matricesPerSide, rowIndex, colIndex),matchId),
                  <Seat
                  user={true}
                  key={generateSeatKey(matrixIndex + matricesPerSide, rowIndex, colIndex)}
                  seatKey={generateSeatKey(matrixIndex + matricesPerSide, rowIndex, colIndex)}
                  status={'available'}
                  style={matrixBoxStyle}
                  onSelect={handleSeatSelection}
                  checkselect={selected}
              />              
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
   
    </div>
  );
};

export default SeatingMap;
