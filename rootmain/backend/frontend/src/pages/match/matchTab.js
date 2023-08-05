import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  FormLabel,
  CssBaseline,
  Typography,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField, TimeField } from "@mui/x-date-pickers";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
import axios from "axios";

import { styled } from "@mui/system";

const FormContainer = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "40%",
  maxWidth: "500px",
  padding: "10px",
  transform: "translate(-50%, -50%)",
  padding: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "rgba(255,255 , 255, 0.5)", // Glassmorphism effect with grey background
  borderRadius: theme.spacing(2),
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 5px 15px rgba(0, 0, 0, 0.2)", // Border shadow to elevate it

  backdropFilter: "blur(10px)",

  [theme.breakpoints.down("sm")]: {
    width: "90%",
    maxWidth: 320,
  },

  // "& input": {
  //   "&::placeholder": {
  //     color: "transparent", // On hover, change the input field text color to transparent
  //   },
  //   "&:hover": {
  //     "&::placeholder": {
  //       color: "darkgrey", // On hover, change the input field text color to dark grey
  //     },
  //   },
  // },
}));
const CustomFormLabel = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  margin: theme.spacing(2),
}));

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

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(matchData);
    axios
      .post(`http://localhost:5000/admin/addeventdetails`, matchData)
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
        .get(`http://localhost:5000/admin/extractdetails?matchId=${id}`)
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
    axios
      .put(`http://localhost:5000/admin/match/updaterecords?matchId=${id}`, matchData)
      .then((response) => {
        console.log("Match data updated successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error updating match data:", error);
      });
  };

  return (
    <FormContainer
      component="form"
      noValidate
      autoComplete="on"
      onSubmit={handleSubmit}
    >
      <CssBaseline />
      <Typography variant="h5" align="center" color={"black"} gutterBottom>
        Add new match
      </Typography>
      <div>
        <CustomFormLabel>
          <TextField
            label="Match Title"
            id="outlined-multiline-flexible"
            value={matchData.matchTitle}
            onChange={handleInputChange}
            multiline
            maxRows={4}
            name="matchTitle"
          />
        </CustomFormLabel>
        <CustomFormLabel>
          <TextField
            id="outlined-multiline-flexible"
            label="Venue"
            value={matchData.venue}
            onChange={handleInputChange}
            multiline
            maxRows={4}
            name="venue"
          />
        </CustomFormLabel>

        <CustomFormLabel>
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
        </CustomFormLabel>
        <CustomFormLabel>
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
        </CustomFormLabel>
        <CustomFormLabel>
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
        </CustomFormLabel>

        <Button
          variant="contained"
          type="submit"
          onClick={showData ? handleSubmitUpdate : handleSubmit}
        >
          {showData ? "Update Record" : "Submit"}
        </Button>
      </div>
      {/* ToastContainer for displaying toasts */}
    </FormContainer>
  );
}
