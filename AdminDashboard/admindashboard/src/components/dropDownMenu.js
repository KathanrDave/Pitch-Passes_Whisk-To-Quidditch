import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const DropdownMenu = ({onOptionChange}) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event) => {
    const selectedValue=event.target.value;
    setSelectedOption(selectedValue);
    onOptionChange(selectedValue);
  };

  return (
    <FormControl variant="outlined" style={{margin: '20px' }}>
      <InputLabel id="dropdown-label">Select Player Role</InputLabel>
      <Select
        labelId="dropdown-label"
        value={selectedOption}
        onChange={handleOptionChange}
        label="Select an option"
        style={{ width: 200,}} // Set the width of the dropdown box
      >
        {/* <MenuItem value="role">Role</MenuItem> */}
        <MenuItem value="Captain">Captain</MenuItem>
        <MenuItem value="Seeker">Seeker</MenuItem>
        <MenuItem value="Chasers">Chasers</MenuItem>
        <MenuItem value="Keeper">Keeper</MenuItem>
        <MenuItem value="Beaters">Beaters</MenuItem>
      </Select>
    </FormControl>
  );
};

export default DropdownMenu;
