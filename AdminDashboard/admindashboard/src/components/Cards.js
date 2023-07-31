import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import './CardList.css'; // Import the CSS file

const CardList = ({ playersData }) => {
  return (
    <div className="card-container">
      {playersData.map((player, index) => (
        <Card key={index} className="custom-card" sx={{ maxWidth: 300, margin: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
          <CardMedia
            component="img"
            height="100"
            image={player.image.url}
            alt={`${player.name} - ${player.team}`}
          />
          <CardContent>
            <Typography variant="h5" component="h2" style={{ fontFamily: 'Your-Font-Family', fontWeight: 'bold' }}>
              {player.name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" style={{ fontFamily: 'Your-Font-Family', fontStyle: 'italic' }}>
              {player.role}
            </Typography>
            <Typography variant="subtitle1" style={{ fontFamily: 'Your-Font-Family' }}>
              {player.team}
            </Typography>
            <Typography variant="subtitle1" style={{ fontFamily: 'Your-Font-Family' }}>
              Matches: {player.matches}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default CardList;
