import AdminInfo from "./components/adminForm";
import MatchComponent from "./components/matchTab";
import MatchShow from "./components/matchShow";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddEvents from "./components/addEvents"
function App() {
  return (
    <div className="App">
        <AddEvents/>
      <Routes>
        {/* <Route path="/" element={<MatchShow />} />
        <Route path="/update/64a55f28de73098269e32abd" element={<MatchComponent showData={true} />} /> */}
        <Route path="/admin/addeventdetails" element={<MatchComponent showData={false} />}/>
      </Routes>
   
      {/* <AdminInfo/> */}
     {/* <MatchComponent/> */}
    
    </div>
  );
}

export default App;
