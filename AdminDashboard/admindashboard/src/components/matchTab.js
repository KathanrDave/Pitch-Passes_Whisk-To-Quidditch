  import React, { useState, useEffect } from "react";
  import { Box, Button, TextField, FormLabel } from "@mui/material";
  import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
  import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
  import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
  import { DateField, TimeField } from "@mui/x-date-pickers";
  import { useLocation } from "react-router-dom";
  import dayjs from "dayjs";
  import axios from "axios";

  export default function MatchComponent({ showData }) {
    const location = useLocation();
    const [matchData, setMatchData] = useState({
      matchTitle: "",
      venue: "",
      matchDetails: "",
      date: "",
      time: "",
    });
    const id = location.pathname.split("/").pop();

    const handleSubmit=(event) => {
      event.preventDefault();
      console.log(matchData);
      axios.post(`http://localhost:3002/admin/addeventdetails`,matchData)
      .then((response) => {
        console.log("Match data added successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error adding match data:", error);
      });
  };
    
    // Fetch match data when component mounts or showData/location changes
    useEffect(() => {
      if (showData && location.pathname) {
        // Fetch match data from the server
        axios
          .get(`http://localhost:3002/admin/update?matchId=${id}`)
          .then((response) => {
            const data = response.data;
            const initialTime = dayjs(new Date(data.dateTime.time));
            const initialDate = dayjs(new Date(data.dateTime.date));

            // Update state with fetched data
            setMatchData({
              matchTitle: data.matchTitle,
              venue: data.venue,
              matchDetails: data.matchDetails,
              date: initialDate,
              time: initialTime,
            });
          })
          .catch((error) => {
            console.error("Error retrieving match data:", error.response);
          });
      }
    }, [showData, location]);

    // Handle input changes and update state
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setMatchData((prevData) => ({ ...prevData, [name]: value }));
    };
    const handleKeyDown = (event) => {
      const numRows = event.target.value.split("\n").length;
      event.target.rows = numRows > 4 ? numRows : 4;
    };
    // Handle form submission
    const handleSubmitUpdate = (event) => {
      event.preventDefault();

      // Send updated match data to the server
      // console.log(matchData);
      axios.put(`http://localhost:3002/admin/updaterecords?matchId=${id}`,matchData)
        .then((response) => {
          console.log("Match data updated successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error updating match data:", error);
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
              value={matchData.matchTitle}
              onChange={handleInputChange}
              multiline
              maxRows={4}
              name="matchTitle"
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
                <DateField
                  label="Basic date field"
                  value={matchData.date}
                  onChange={(date) =>
                    handleInputChange({ target: { value: date, name: "date" } })
                  }
                />
              </DemoContainer>
            </LocalizationProvider>
          </FormLabel>
          <FormLabel>
            Time:{" "}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateField"]}>
                <TimeField
                  label="Basic time field"
                  value={matchData.time}
                  onChange={(time) =>
                    handleInputChange({
                      target: {
                        value: time,
                        name: "time",
                      },
                    })
                  }
                />
              </DemoContainer>
            </LocalizationProvider>
          </FormLabel>

          <Button variant="contained" type="submit" onClick={showData ? handleSubmitUpdate : handleSubmit}>
           {showData ? "Update Record" : "Submit"}
           </Button>

        </div>
      </Box>
    );
  } 
