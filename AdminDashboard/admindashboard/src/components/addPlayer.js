import React, { useState } from "react";
import DropdownMenu from "./dropDownMenu";
import { TextField, Button, Typography } from "@mui/material";

export default function AddPlayer({ playerNumber,onSubmitClicked,submitted}) {
    console.log(submitted);
  const containerStyle = {
    border: "1px solid #ccc",
    padding: "15px",
    borderRadius: "5px",
    width: "90%", // Adjust the width as per your requirement
    margin: "auto", // Center the container horizontally
    gap: "20px",
  };

  const buttonStyle = {
    width: "150px",
    padding: "16px",
    margin: "20px", // Adjust the width as per your requirement
  };

  const typoStyle = {
    padding: "5px",
  };

  const [selectedImage, setSelectedImage] = useState(null);
  const [convertedImageData, setConvertedImageData] = useState(null);
  const [playerName, setPlayerName] = useState(null);
  const [matchPlayed, setMatchPlayed] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null);
  const handleOptionSelected = (selectedValue) => {
    setSelectedValue(selectedValue);
  };
  const handleSubmit=()=>{
    const formData={
        role:selectedValue,
        name:playerName,
        matches:matchPlayed,
        image:convertedImageData,
    }
    onSubmitClicked(formData);

  }
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(file);
      setConvertedImageData(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={containerStyle}>
      <Typography variant="h5" gutterBottom style={typoStyle}>
        Player {playerNumber}
      </Typography>
      {submitted ? (
        <Typography variant="h6">Submitted</Typography>
      ) : (
        <React.Fragment>
          <DropdownMenu onOptionChange={handleOptionSelected} />
          <TextField
            label="Player Name"
            variant="outlined"
            style={{ margin: '15px', width: '300px' }}
            onChange={(event) => setPlayerName(event.target.value)}
          />
          <TextField
            label="Matches Played"
            variant="outlined"
            style={{ margin: '20px', width: '300px' }}
            onChange={(event) => setMatchPlayed(event.target.value)}
          />
          <input type="file" onChange={handleImageChange} accept="image/*" />
          <Button variant="contained" color="primary" style={buttonStyle} onClick={handleSubmit}>
            Submit
          </Button>
        </React.Fragment>
      )}
    </div>
  );
}
