import React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { Button, AppBar, Typography, Container} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import './typeWriter.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Roboto } from '@fontsource/roboto';

export default function TeamPage() {

  const theme = createTheme({
    typography: {
      fontFamily: 'Roboto, Arial, sans-serif',
    },
  });
  const [teamIds, setTeamIds] = useState({});


  useEffect(() => {
    const fetchTeamIds = async () => {
      try {
        const response = await axios.get('http://localhost:3002/getTeamNames');
        const teamData = response.data;
        setTeamIds(teamData);
      } catch (error) {
        console.log('Error in retrieving match data', error.response);
      }
    };    

    fetchTeamIds(); // Call the function to fetch team IDs
  }, []); // The empty dependency array ensures that this effect runs only once on component mount
 
const teamIdsArray = Object.keys(teamIds);
  const navigate = useNavigate(); // Access the navigate function
  const handleShowTeam = (index) => {
    const teamName= teamIds[teamIdsArray[index]];
    navigate(`/showteam?teamName=${teamName}`);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div sx={{ backgroundColor: 'RGB(123, 104, 238)' }}>
        <Box
          sx={{
            width: '90%',
            height: '90%',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            border: '1px solid #000',
            borderRadius: '8px',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backdropFilter: 'blur(10px)',
            alignItems: 'center',
          }}
        >

<div className="button-container">
<Button
            // className="fancy-button"
            onClick={() => {
              // Navigate to the "Add Teams" page when the button is clicked
              navigate('/addteams');
            }}
            sx={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              backgroundColor: 'violet',
              color: 'white',
              borderRadius: '8px',
              padding: '10px 20px',
              fontSize: '16px',
              fontWeight: 'bold',
            }}
          >
            Add Teams
          </Button>
    </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box
              sx={{
                margin: '15px',
                display: 'inline-flex',
                backgroundColor: '#1e90ff',
                borderRadius: '8px',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography variant="h5" color="white" fontWeight="bold" sx={{ margin: '10px' }}>
                Quidditch Teams
              </Typography>
            </Box>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Container sx={{ flexGrow: 2, overflow: 'auto', borderColor: 'black' }}>
          {Object.keys(teamIds).map((teamId, index) => (
          <AppBar
            key={index}
            position="static"
            sx={{
              background: 'white',
              border: '1px solid #000',
              borderRadius: '12px',
              height: '80px',
              mt: '10px',
              borderColor: 'black',
              width: '80%', // Set the width to 100% of the available width
            }}
          >
            <Container
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: '80px',
                padding: '0 20px', // Add some padding to the left and right of the container
              }}
            >
              <Typography variant="h6" component="div" sx={{ color: 'black', fontSize: '24px' }}>
              {teamIds[teamId]}
              </Typography>
              <Button
                sx={{
                  color: 'black',
                  borderRadius: '8px',
                  padding: '10px 20px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                }}
                onClick={() => handleShowTeam(index)}
              >
                Show Team
              </Button>
            </Container>
          </AppBar>
              ))}
          </Container>
          </div>
        </Box>
      </div>
    </ThemeProvider>
  );
}
