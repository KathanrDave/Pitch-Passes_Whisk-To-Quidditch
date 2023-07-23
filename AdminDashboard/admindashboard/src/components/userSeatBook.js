
import React, { useState } from 'react';
import SeatingMap from "./seatRow";
import BoxBook from "./smallBoxBook";
export default function UserSeatBook() {
  const [seatData, setSeatData] = useState({});
  const handleChange=(selectedSeats)=>{
    console.log('User');
    console.log(selectedSeats);
    setSeatData(selectedSeats);
  }
  return (
    <div>
      <SeatingMap  seatDataCallback={handleChange}/>
      <BoxBook selectedSeats={seatData}/>
    </div>
  );
}
