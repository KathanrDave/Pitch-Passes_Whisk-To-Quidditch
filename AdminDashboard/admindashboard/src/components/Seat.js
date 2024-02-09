import React, { useState,useEffect } from 'react';

const Seat = ({ user, seatKey, statusPromise, onSelect, checkselect}) => {
  // console.log(statusPromise);
  const [selected, setSelected] = useState(checkselect);
  const [status, setStatus] = useState('available'); // Initialize status as 'loading'    
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const resolvedStatus = await statusPromise;
        setStatus(resolvedStatus);
      } catch (error) {
        console.error('Error fetching status:', error);
        setStatus('error'); // Set a fallback status in case of an error
      }
    };
    fetchStatus();
  }, [statusPromise]);

  // console.log(status);
  const handleClick = () => {
    if (user && !(status==='booked') && !(status==='unavailable')) {
      console.log("show ", !selected);
      setSelected(!selected);
      // Notify the parent component about seat selection if needed
      onSelect(seatKey);
    }
  };

  const seatStyle = {
    width: '25px',
    height: '25px',
    backgroundColor: status === 'booked' ? 'lightyellow' : selected ? 'skyblue' : status === 'unavailable' ? 'darkgray' : 'lightgray',
    border: '1px solid gray',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: status === 'booked' || status === 'unavailable' ? 'not-allowed' : 'pointer',
    borderRadius: '4px',
    fontWeight: 'bold',
    fontSize: '14px',
    margin: '2px',
    fontFamily: 'Poppins',
  };
  
  return (
    <div style={seatStyle} onClick={handleClick} disabled={status === 'booked' || status === 'unavailable'}>{seatKey}</div>
  );
};

export default Seat;
