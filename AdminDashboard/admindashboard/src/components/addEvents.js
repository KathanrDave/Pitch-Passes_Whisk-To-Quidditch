import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function AddEvents() {
  const navigate = useNavigate();
  const [buttonVisible, setButtonVisible] = useState(true);

  const handleAddEventsClick = () => {
    navigate('/admin/addeventdetails');
    setButtonVisible(false);
  };

  return (
    <Box>
      {buttonVisible && (
        <Button variant="contained" type="submit" onClick={handleAddEventsClick}>
          Add Events
        </Button>
      )}
    </Box>
  );
}
