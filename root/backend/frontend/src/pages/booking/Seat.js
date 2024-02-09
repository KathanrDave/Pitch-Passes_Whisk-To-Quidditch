import React, { useState } from 'react';

const Seat = ({ user, seatKey, status, onSelect, checkselect}) => {
  const [selected, setSelected] = useState(checkselect);
  const booked = status === 'booked';

  const handleClick = () => {
    if (user && !booked) {
      console.log("show ", !selected);
      setSelected(!selected);
      // Notify the parent component about seat selection if needed
      onSelect(seatKey);
    }
  };

  const seatStyle = {
    width: '17px',
    height: '17px',
    backgroundColor: booked ? 'lightyellow' : selected ? 'skyblue' : 'lightgray',
    border: '1px solid gray',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: booked ? 'not-allowed' : 'pointer',
    borderRadius: '4px',
  };

  return (
    <div style={seatStyle} onClick={handleClick} disabled={booked}>
      
    </div>
  );
};

export default Seat;
