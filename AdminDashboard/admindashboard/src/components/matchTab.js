import React, { useState , useEffect} from "react";
import Box from "@mui/material/Box";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { FormLabel } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import { TimeField } from '@mui/x-date-pickers/TimeField';


export default function MatchComponent() {
    const [matchData, setMatchData] = useState({
        title: '',
        venue: '',
        matchDetails: '',
        date: '',
        time: '',
      });

      // increases the row space of the particular text area

      const handleKeyDown = (event) => {
        const numRows = event.target.value.split('\n').length;
        event.target.rows = numRows > 4 ? numRows : 4;
      };


      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setMatchData((prevData) => ({ ...prevData, [name]: value }));
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();
        // Perform additional validation if required
    
        // Send matchData to the backend
        axios.post('http://localhost:3002/admin/addeventdetails',matchData)
          .then((response) => {
            console.log('Match data submitted successfully:', response.data);
            // Handle success response if needed
          })    
          .catch((error) => {
            console.error('Error submitting match data:', error);
            // Handle error if needed
          });
      };
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="on"
      onSubmit={handleSubmit}
    >
      <div>
        <FormLabel>
          Match Title :{" "}
          <TextField
            id="outlined-multiline-flexible"
            label="Title"
            value={matchData.title}
            onChange={handleInputChange}
            multiline
            maxRows={4}
            name="title"
          />
        </FormLabel>
        <FormLabel>
          Venue :{" "}
          <TextField
            id="outlined-multiline-flexible"
            label="Venue"
            value={matchData.venue}
            onChange={handleInputChange}
            multiline
            maxRows={4}
            name="venue"
          />
        </FormLabel>

        <FormLabel>
          Match Details :{" "}
          <TextField
            id="outlined-multiline-flexible"
            label="Match Details"
            multiline
            maxRows={4}
            value={matchData.matchDetails}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            name="matchDetails"
          />
        </FormLabel>
        <FormLabel>
          Date :{" "}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateField"]}>
              <DateField label="Basic date field" value={matchData.date}
            onChange={(date) => handleInputChange({ target: { value: date, name: 'date' } })} />
            </DemoContainer>
          </LocalizationProvider>   
          </FormLabel>
<FormLabel>
  Time:{" "}
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DemoContainer components={["DateField"]}>
      <TimeField
        label="Basic time field"
        value={matchData.dateTime && matchData.dateTime.time}
        onChange={(time) =>
          handleInputChange({
            target: {
              value: time,
              name: 'dateTime',
              subName: 'time'
            }
          })
        }
      />
    </DemoContainer>
  </LocalizationProvider>
</FormLabel>


      <Button variant="contained" type="submit">
        Submit
      </Button>
      </div>
    </Box>  
  );
}
