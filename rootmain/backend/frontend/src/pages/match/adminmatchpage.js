import React from "react";
import { Button } from "@mui/material";


// import Match from "./match";
// import Matchsee from "./matchsee";
// import Matchtab from "./matchTab";
// import Matchshow from "./matchShow";
// import MatchDisplay from "./matchDisplay";

const Adminmatchpage = () => {
  return (
    <div>
      <Button href="/admin/matchtab">Matchtab</Button>
      <Button href="/admin/matchtshow">Matchshow</Button>
      <Button href="/admin/matchdisplay">MatchDisplay</Button>
      <Button href="/admin/match">Match</Button>
      <Button href="/admin/matchsee">Matchsee</Button>
    </div>
  );
};

export default Adminmatchpage;
