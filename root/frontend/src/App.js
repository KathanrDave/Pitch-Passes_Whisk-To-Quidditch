import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/signup";
import Signin from "./pages/signin";
import Home from "./pages/home";
import User from "./pages/user";
import Homepage from "./pages/homepage"
import Completeprofile from "./pages/completeprofile";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/signin" element={<Signin />} />
        <Route path="/user/completeprofile" element={<Completeprofile />} />
        <Route path="/user/profile" element={<User />} />
        <Route path="/user/home" element={<User />} />
        <Route path="/homepage" element={<Homepage />} />
      </Routes>
    </Router>
  );
}

export default App;
