import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardList from './Cards';
import { Button } from '@mui/material'; // Import the Button component

const ShowTeamPage = () => {

  const [teamData, setTeamData] = useState([]);
  
  const addTeamData = (newTeamData) => {
    setTeamData((prevTeamData) => {
      // Check if the object with the same _id already exists in the state array
      const isDuplicate = prevTeamData.some((item) => item._id === newTeamData._id);
  
      if (!isDuplicate) {
        // Append the new object to the state array if it's not a duplicate
        return [...prevTeamData, newTeamData];
      }
  
      // Return the previous state if it's a duplicate
      return prevTeamData;
    });
  };

 // Get the value of the 'teamName' parameter from the current URL
function getTeamNameFromURL() {
  // Get the URL query parameters from window.location.search
  const params = new URLSearchParams(window.location.search);

  // Extract the value of the 'teamName' parameter
  const teamName = params.get('teamName');

  // Return the team name (decoded to handle any URL-encoded characters)
  return decodeURIComponent(teamName);
}

const teamName = getTeamNameFromURL();
console.log(teamName); // Output: "The Quidditch Wizards"

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/getteam?teamName=${teamName}`);
        const teamData = response.data;
        // console.log('frontend side',teamData);
        //  console.log(teamData[0].name);
        // console.log(teamData.length);
        for (let i = 0; i < teamData.length; i++) {
          addTeamData(teamData[i]);
        }
      } catch (error) {
        console.log('Error fetching team data:', error.response);
      }
    };

    fetchTeamData();
  }, [teamName]);
  

return (
  <div>
    {/* Button with margin */}
   

    <CardList playersData={teamData} />
  </div>
);
};

export default ShowTeamPage;
