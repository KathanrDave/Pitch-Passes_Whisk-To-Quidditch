import React from "react";
import styled from "styled-components";

const StyledConfirmationBoxWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StyledConfirmationBox = styled.div`
  background-color: #f5f5f5;
  border: 2px solid #ccc;
  padding: 20px;
  width:200px;
  height:150px;
  border-radius:5px;
  display:flex;
  flex-direction: column;
  text-align: center;
  margin: 10px;
  align-items:center;
  
  font-family: 'Manrope', sans-serif;
  font-family: 'Poppins', sans-serif;
  font-family: 'Roboto', sans-serif;

  > div {
    margin: 10px;
    line-height:1.5;
    font-weight:bold;
  }
  button {
    background-color: #3498db;
    color: white;
    border-radius:5px;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    margin-top:30px;
    font-weight:bold;
  }
`;

function confirmationBox({ onConfirm }) {
  return (
    <StyledConfirmationBoxWrapper>
    <StyledConfirmationBox>
      <div className="confirmationBox">
        <div className="confirmText">Are you sure you want to Confirm Booking ?</div>
        <button onClick={onConfirm}>Confirm</button>
      </div>
    </StyledConfirmationBox>
    </StyledConfirmationBoxWrapper>
    
  );
}

export default confirmationBox;
