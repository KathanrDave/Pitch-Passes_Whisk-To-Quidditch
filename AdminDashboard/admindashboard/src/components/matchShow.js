import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import UpdateIcon from './updateIcon';
import { useNavigate } from 'react-router-dom';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  alignItems: 'flex-start',
  paddingTop: theme.spacing(1), 
  paddingBottom: theme.spacing(2),
  '@media all': {
    minHeight: 70,
  },
}));

const WhiteAppBar = styled(AppBar)(() => ({
  backgroundColor: 'white',
}));

export default function MatchShow() {
  const [updateClicked, setUpdateClicked] = useState(false);
  const navigate = useNavigate();

  const handleUpdateClick = () => {
    setUpdateClicked(true);
  };

  // Memoize the matchTab object to avoid unnecessary re-creation
 const matchTab = React.useMemo(() => {
    return {
      id: "64a55f28de73098269e32abd",
      // other properties...
    };
  }, []);

  useEffect(() => {
    // Trigger navigation when updateClicked state changes
    if (updateClicked) {
      navigate(`/update/${matchTab.id}`, { state: { update: true } });
    }
  }, [updateClicked, matchTab.id, navigate]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <WhiteAppBar position="static" sx={{ mr: 2 }}>
        <StyledToolbar>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ flexGrow: 1, alignSelf: 'flex-end', color: 'black' }}
          >
            MUI
          </Typography>
          <IconButton
            color="inherit"
            aria-label="update"
            onClick={handleUpdateClick}
          >
            <UpdateIcon />
          </IconButton>
        </StyledToolbar>
      </WhiteAppBar>
    </Box>
  );
}
