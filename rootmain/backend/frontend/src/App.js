import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/auth/signup";
import Signin from "./pages/auth/signin";
import User from "./pages/user";
import Home from "./pages/home";
import Adminsignin from "./pages/auth/adminsignin";
import Adminregister from "./pages/match/adminForm";
import Admin from "./pages/admin";
import Match from "./pages/match/match";
import Matchsee from "./pages/match/matchsee";
import Matchtab from "./pages/match/matchTab";
import Matchshow from "./pages/match/matchShow";
import MatchDisplay from "./pages/match/matchDisplay";

// import Seat from "./pages/booking/Seat";
// import Seatrow from "./pages/booking/seatRow";
// import smallBoxBook from "./pages/booking/smallBoxBook";
import UserSeatBook from "./pages/booking/userSeatBook";
//admin
import AddSeats from "./pages/booking/addSeats";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/signin" element={<Signin />} />
        <Route path="/auth/register/admin" element={<Adminregister />} />
        <Route path="/auth/signin/admin" element={<Adminsignin />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/matchtab" element={<Matchtab />} />
        <Route path="/admin/matchtshow" element={<Matchshow />} />
        <Route path="/admin/matchdisplay" element={<MatchDisplay />} />
        <Route path="/user/userSeatBook" element={<UserSeatBook />} />
        <Route path="/admin/addseats" element={<AddSeats />} />

        <Route path="/admin/match" element={<Match />} />
        <Route path="/admin/matchsee" element={<Matchsee />} />
        <Route path="/user" element={<User />} />

        {/* <Route path="/auth/google/callback" element={<User />} /> */}
        {/* <Route path="/user/completeprofile" element={<Completeprofile />} /> */}
        {/* <Route path="/user/profile" element={<User />} /> */}
        {/* <Route path="/homepage" element={<Homepage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
