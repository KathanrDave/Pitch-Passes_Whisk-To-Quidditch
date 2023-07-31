import React, { useState } from 'react';
import SeatingMap from "./seatRow";
import BoxBook from "./smallBoxBook";
import { useLocation } from 'react-router-dom';
export default function UserSeatBook() {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const matchId = queryParams.get('matchId');
  const [seatData, setSeatData] = useState({});

  const handleChange = (selectedSeats) => {
    setSeatData(selectedSeats);
  };
  return (
    <div>
     <SeatingMap seatDataCallback={handleChange} matchId={matchId} />
      <BoxBook  selectedSeats={seatData} matchId={matchId} />
    </div>
  );
}
