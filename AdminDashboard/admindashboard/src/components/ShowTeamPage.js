import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ShowTeamPage = () => {
  const [teamData, setTeamData] = useState(null);
  const { teamName } = useParams(); // Access the teamName from the route params using useParams()

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const response = await axios.get(`/getteam?teamName=${teamName}`);
        const teamData = response.data;
        console.log(teamData);
        setTeamData(teamData);
      } catch (error) {
        console.log('Error fetching team data:', error.response);
      }
    };

    fetchTeamData();
  }, [teamName]);

 

  return (
    <div>
      {/* Add JSX code to display the teamData */}
      {teamData && (
        <div>
          <h1>{teamData.name}</h1>
          {/* Display other team data properties */}
        </div>
      )}
    </div>
  );
};

export default ShowTeamPage;
