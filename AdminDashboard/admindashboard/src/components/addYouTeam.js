import React, { useState } from 'react';
import AddPlayer from './addPlayer';
import axios from "axios";
export default function AddYourTeam() {
  const numberOfPlayers = 7; // Change this number to the desired count
  const [submitted, setSubmitted] = useState(false);

  const containerStyle = {
    border: '1px solid #ccc',
    padding: '15px',
    borderRadius: '5px',
    width: '90%', // Adjust the width as per your requirement
    margin: 'auto',
    gap: '20px',
    display: 'flex', // Use flexbox to center the content vertically
    flexDirection: 'column', // Arrange items in a column
    alignItems: 'center', // Center items horizontally
  };

  // State for team name
  const [teamName, setTeamName] = useState('');

  // Function to handle team name change
  const handleTeamNameChange = (event) => {
    setTeamName(event.target.value);
  };
  const handleGetTeamData=(formData)=>{
    const data={
    team:teamName,
    role:formData.role,
    name:formData.playerName,
    matches:formData.matchPlayed,
    image:formData.convertedImageData,
    }
    axios
    .post("http://localhost:3002/adduserteams", data)
    .then((response) => {
      console.log(response.data);
      setSubmitted(true);
    })
    .catch((error) => { 
      console.error("Error submitting form:", error);
    });
};
  return (
    <div >
      {/* Text field for team name */}
      <input
        style={containerStyle}
        type="text"
        value={teamName}
        onChange={handleTeamNameChange}
        placeholder="Enter your team name"
      />
      {Array.from({ length: numberOfPlayers }, (_, index) => (
        <AddPlayer key={index} playerNumber={index + 1} style={{ gap: '20px' }} onSubmitClicked={handleGetTeamData}  submitted={submitted}/>
      ))}
    </div>
  );
}
