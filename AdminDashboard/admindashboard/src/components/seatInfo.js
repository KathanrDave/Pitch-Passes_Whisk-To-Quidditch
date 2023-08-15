import React from 'react'
import Seat from './Seat'
const boxStyle={
height:'200px',
width:'200px',
display:'flex',
flexDirection:'column',
backgroundColor:'lightgray',
justifyContent: 'center',
borderRadius:'8px',
margin: '300px 0 0 60px',
flexwrap:'wrap',
position: 'absolute',
};


function SeatInfo() {
  return (
    <div>
      <div style={boxStyle}>    
      <div>
      <Seat><p style={{color:'black'}}>hello</p></Seat>
      </div>
      <div>
      <Seat style={{ backgroundColor: 'red' }}></Seat>
      </div>
      <div>
      <Seat style={{ backgroundColor: 'red' }}></Seat>
      </div>
      </div>
    </div>
  )
}

export default SeatInfo
