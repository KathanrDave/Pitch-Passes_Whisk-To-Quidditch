import React,{useEffect, useState} from "react";
import { styled } from "@mui/system";
import { useLocation} from 'react-router-dom';
import axios from "axios";
const Red = "#e84c3d";
const Grey = "#ecedef";
const Black = "#343434";

const CardWrap = styled("div")({
  width: "27em",
  margin: "3em auto",
  color: "#fff",
  fontFamily: "sans-serif",
  display: "flex",
  justifyContent: "space-between"
});

const Card = styled("div")({
  background: `linear-gradient(to bottom, ${Red} 0%, ${Red} 26%, ${Grey} 26%, ${Grey} 100%)`,
  height: "11em",
  width: "17em",
  borderRadius: "8px",
  padding: "1em",
  position: "relative",
  zIndex: "0"
});

const CardRight = styled("div")({
  width: "6.5em",
  zIndex: "1",
  background: `linear-gradient(to bottom, ${Red} 0%, ${Red} 26%, ${Grey} 26%, ${Grey} 100%)`,
  height: "11em",
  padding: "1em",
  position: "relative",
  overflow: "hidden",
  borderRadius: "8px",
  borderLeft: ".25em dashed white"
});

const H1 = styled("h1")({
  fontSize: "1.1em",
  marginTop: "0",
  "& span": {
    fontWeight: "normal"
  }
});

const Title = styled("div")({
  textTransform: "uppercase",
  fontWeight: "normal",
  margin: "2em 0 0 0",
  "& h2": {
    fontSize: ".9em",
    color: "#525252",
    margin: "0"
  },
  "& span": {
    fontSize: ".7em",
    color: "#a2aeae"
  }
});

const Name = styled("div")({
  margin: ".7em 0 0 0"
});

const Seat = styled("div")({
  margin: ".7em 0 0 0"
});

const Time = styled("div")({
  margin: ".7em 0 0 1em"
});

const Eye = styled("div")({
  position: "relative",
  width: "2em",
  height: "1.5em",
  background: "#fff",
  margin: "0 auto",
  borderRadius: "1em/0.6em",
  zIndex: "1",
  "&::before, &::after": {
    content: '""',
    display: "block",
    position: "absolute",
    borderRadius: "50%"
  },
  "&::before": {
    width: "1em",
    height: "1em",
    background: Red,
    zIndex: "2",
    left: "8px",
    top: "4px"
  },
  "&::after": {
    width: ".5em",
    height: ".5em",
    background: "#fff",
    zIndex: "3",
    left: "12px",
    top: "8px"
  }
});

const Number = styled("div")({
  textAlign: "center",
  textTransform: "uppercase",
  "& h3": {
    color: Red,
    margin: ".9em 0 0 0",
    fontSize: "2.5em"
  },
  "& span": {
    display: "block",
    color: "#a2aeae"
  }
});


const Barcode = styled("div")({
  height: "2em",
  width: "0",
  margin: "1.2em 0 0 .8em",
  boxShadow: `1px 0 0 1px ${Black},
              5px 0 0 1px ${Black},
              10px 0 0 1px ${Black},
              11px 0 0 1px ${Black},
              15px 0 0 1px ${Black},
              18px 0 0 1px ${Black},
              22px 0 0 1px ${Black},
              23px 0 0 1px ${Black},
              26px 0 0 1px ${Black},
              30px 0 0 1px ${Black},
              35px 0 0 1px ${Black},
              37px 0 0 1px ${Black},
              41px 0 0 1px ${Black},
              44px 0 0 1px ${Black},
              47px 0 0 1px ${Black},
              51px 0 0 1px ${Black},
              56px 0 0 1px ${Black},
              59px 0 0 1px ${Black},
              64px 0 0 1px ${Black},
              68px 0 0 1px ${Black},
              72px 0 0 1px ${Black},
              74px 0 0 1px ${Black},
              77px 0 0 1px ${Black},
              81px 0 0 1px ${Black}`
});

const CardComponent = (req,res) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const matchId = queryParams.get('matchId');
  const email = queryParams.get('email');

  // console.log(matchId,rt  email);
  const [matchData,setMatchData] = useState({});
    // console.log(matchId, email);
  const fetchData = async ({matchId, email}) => {
    try {
      console.log('Get',matchId, email);
      const response = await axios.get(`http://localhost:3002/getDetails?matchId=${matchId}&email=${email}`);
      setMatchData(response.data);
      console.log(response.data); 
        } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    console.log('Fetching data');
    if (matchId && email) {
      fetchData({matchId,email});
    }
  }, [matchId,email]);
console.log(matchData);

  // if (Array.isArray(seatsArray)) {
  //   // Array is valid, you can use join safely.
  //   const joinedSeats = seatsArray[0].join(', ');
  //   console.log(joinedSeats);
  // } else {
  //   console.error('seatsArray is not a valid array:', seatsArray);
  // }
  // Check if matchId exists before fetching the data
  const SeatsArray=matchData.seats ? matchData.seats.join(','):''; 
  
  return (
    <CardWrap>
      <Card>
        <H1>
          Quiditch <span>Game</span>
        </H1>
        <Title>
          <h2>{matchData.matchTitle}</h2>
          <span>Sports</span>
        </Title>
        
        <Seat>
          <h2>Seat : {SeatsArray}</h2> 
        </Seat>
        <Time>
          <h2>12:00</h2>
          <span>time</span>
        </Time>
      </Card>
      <CardRight>
        <Eye />
        <Number>
          <h3>156</h3>
          <span>seat</span>
        </Number>
        <Barcode />
      </CardRight>
    </CardWrap>
  );
};

export default CardComponent;