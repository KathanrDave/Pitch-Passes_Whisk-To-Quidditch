import AdminInfo from "./components/adminForm";
import MatchComponent from "./components/matchTab";
import MatchShow from "./components/matchShow";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddEvents from "./components/addEvents";
import MatchDisplay from "./components/matchDisplay";
import BookTickets from "./components/bookTickets";
import Seat from "./components/Seat";
import SeatingMap from "./components/seatRow";
import AddSeats from "./components/addSeats";
import UserSeatBook from "./components/userSeatBook";
function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/" element={<MatchDisplay />} />
          <Route path="/" element={<AddEvents />} />
        <Route path="/book-tickets/64a55f28de73098269e32abd" element={<BookTickets />} />
        <Route path="/admin/addseats" element={<AddSeats/>}/>
        <Route path="/user/booktickets" element={<UserSeatBook/>}/>
      </Routes>
     
    </div>
  );
}

export default App; 
