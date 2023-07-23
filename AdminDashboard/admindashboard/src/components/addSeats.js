import React, { useState } from 'react';
import { TextField, Button, Container,Select, MenuItem } from '@mui/material';
import SeatingMap from './seatRow';
import Typography from '@mui/material/Typography';  
import axios from 'axios';

export default function AddSeats() {
  const [numRows, setNumRows] = useState(0);
  const [numSeatsPerRow, setNumSeatsPerRow] = useState(0);
  const [numBoxes, setNumBoxes] = useState(0);
  const [selectedMatch, setSelectedMatch] = useState('');
  const [matches, setMatches] = useState([]);
  const [unavailableSeats, setUnavailableSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selected, setSelected] = useState(false);
  
  const handleSeatDataChange = (data) => {
    setSelectedSeats(data);
  };

  const handleNumRowsChange = (event) => {
    setNumRows(Number(event.target.value));
  };

  const handleNumSeatsPerRowChange = (event) => {
    setNumSeatsPerRow(Number(event.target.value));
  };

  const handleNumBoxesChange = (event) => {
    setNumBoxes(Number(event.target.value));
  };

  const handleMatchSelectChange = (event) => {
    setSelectedMatch(event.target.value);
  };

  // Custom style for the TextField components to make them one-third of the container width
  const inputStyle = { width: 'calc(33.33% - 10px)' , margin:'10px'}; // You can adjust the 10px to add or reduce spacing between the fields

// to make the seats unavailable 

const makeSelectedSeatsUnavailable = async () => {
  const url = 'http://localhost:3002/admin/addseats/setunavailable';
  setUnavailableSeats([...unavailableSeats, ...selectedSeats]);
  console.log(typeof(selectedSeats));
  selectedSeats.forEach((seatKey) => {
    console.log(seatKey);
    console.log(!selectedSeats.includes(seatKey));
    setSelected(!(selectedSeats.includes(seatKey)));
  })
  const requestData={unavailableSeats: selectedSeats};

  let response;
  try {
    response = await axios.put(url, requestData);
    console.log('API response :', response.data);
  } catch(error) {
    console.log('Error :', error);
  }

  console.log('Unavailable seats:', selectedSeats.join(', '));
  setSelectedSeats([]);
};
  return (
    <Container>
        <div>
        <Select
          value={selectedMatch}
          onChange={handleMatchSelectChange}
          label="Select Match"
          variant="outlined"
          margin="dense"
          style={inputStyle}
        >
          {matches.map((match) => (
            <MenuItem key={match.matchId} value={match.matchId}>
              {match.matchTitle}
            </MenuItem>
          ))}
        </Select>
      </div>
      <div style={{ display: 'flex' }}>
        <TextField
          label="Number of Rows"
          type="number"
          value={numRows}
          onChange={handleNumRowsChange}
          variant="outlined"
          margin="dense"
          style={inputStyle}
        />
        <TextField
          label="Number of Seats in Each Row"
          type="number"
          value={numSeatsPerRow}
          onChange={handleNumSeatsPerRowChange}
          variant="outlined"
          margin="dense"
          style={inputStyle}
        />
        <TextField
          label="Number of Towers"
          type="number"
          value={numBoxes}
          onChange={handleNumBoxesChange}
          variant="outlined"
          margin="dense"
          style={inputStyle}
        />
      </div>
      <Button variant="contained" color="primary">
        Submit
      </Button>
      <SeatingMap
       seatDataCallback={handleSeatDataChange}
      />

<div>
      <Typography variant="h5" gutterBottom>
          Selected Seats:
        </Typography>
        <TextField
          multiline
          rows={4}
          value={selectedSeats.join('\n')}
          InputProps={{ readOnly: true }}
          sx={{
            width: '100%', // Set the width to 100% of the container
            borderRadius: '4px', // Add border radius
            backgroundColor: '#f7f7f7', // Set the background color
            padding: '8px', // Add some padding
            fontSize: '14px', // Set the font size
            border: '1px solid #ccc', // Add a border
            resize: 'none', // Disable textarea resizing
            fontFamily: 'Roboto, sans-serif', // Set the font family
            color: '#333', // Set the text color
            '&:focus': {
              outline: 'none', // Remove the default focus outline
              borderColor: '#4caf50', // Add a custom focus border color
            },
          }}
        />
      </div>
      <Button onClick={makeSelectedSeatsUnavailable} variant="contained" color="secondary">Make Unavailable</Button>
    </Container>
  );
}
