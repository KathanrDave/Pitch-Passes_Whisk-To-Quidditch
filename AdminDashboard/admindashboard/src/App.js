import AdminInfo from "./components/adminForm";
import MatchComponent from "./components/matchTab";
import MatchShow from "./components/matchShow";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddEvents from "./components/addEvents";
import MatchDisplay from "./components/matchDisplay";
import Seat from "./components/Seat";
import SeatingMap from "./components/seatRow";
import AddSeats from "./components/addSeats";
import UserSeatBook from "./components/userSeatBook";
import { useLocation } from 'react-router-dom';
import CountdownTimer from './components/countDown';
function App() {
  const targetDateTime = new Date('2023-08-04T19:00:00.000Z').getTime();

  return (
    
    <div className="App">
      <Routes>
          <Route path="/" element={<MatchDisplay />} />
          <Route path="/" element={<AddEvents />} />
          {/* <Route path="/matchdisplay" element={<MatchDisplay/>}></Route> */}
          <Route path="/booktickets" element={<UserSeatBook />} />
        <Route path="/admin/addseats" element={<AddSeats/>}/>
        <Route path="/comp" element={<MatchComponent/>}></Route>
        <Route path="/user/matches" element={<CountdownTimer targetDateTime={targetDateTime}/>}></Route>
      </Routes>
     
    </div>
  );
}

export default App; 
