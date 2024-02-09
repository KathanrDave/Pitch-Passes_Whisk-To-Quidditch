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
import TeamPage from "./components/teamPage";
import ShowTeamPage from "./components/ShowTeamPage";
import AddYouTeam  from "./components/addYouTeam";
import CardComponent from "./components/tickets";
import ConfirmationBox from "./components/confirmationBox";
import ErrorBoundary from "./components/errorBoundary";
function App() {
  const targetDateTime = new Date('2023-08-04T19:00:00.000Z').getTime();
  return (
    <div className="App">
              <Routes>
          <Route
            path="/"
            element={ // Wrap each route with ErrorBoundary
              <ErrorBoundary >
                <MatchDisplay />
              </ErrorBoundary>
            }
          />
          <Route
            path="/events"
            element={ // Wrap each route with ErrorBoundary
              <ErrorBoundary>
                <AddEvents />
              </ErrorBoundary>
            }
          />
          <Route
            path="/booktickets"
            element={ // Wrap each route with ErrorBoundary
              <ErrorBoundary>
                <UserSeatBook />
              </ErrorBoundary>
            }
          />
          <Route
            path="/admin/addseats"
            element={ // Wrap each route with ErrorBoundary
              <ErrorBoundary>
                <AddSeats />
              </ErrorBoundary>
            }
          />
          <Route
            path="/comp"
            element={ // Wrap each route with ErrorBoundary
              <ErrorBoundary>
                <MatchComponent />
              </ErrorBoundary>
            }
          />
          <Route
            path="/user/matches"
            element={ // Wrap each route with ErrorBoundary
              <ErrorBoundary>
                <CountdownTimer targetDateTime={targetDateTime} />
              </ErrorBoundary>
            }
          />
          <Route
            path="/users"
            element={ // Wrap each route with ErrorBoundary
              <ErrorBoundary>
                <TeamPage />
              </ErrorBoundary>
            }
          />
          <Route
            path="/showteam"
            element={ // Wrap each route with ErrorBoundary
              <ErrorBoundary>
                <ShowTeamPage />
              </ErrorBoundary>
            }
          />
          <Route
            path="/addyourteam"
            element={ // Wrap each route with ErrorBoundary
              <ErrorBoundary>
                <AddYouTeam />
              </ErrorBoundary>
            }
          />
          <Route
            path="/final-ticket/"
            element={ // Wrap each route with ErrorBoundary
              <ErrorBoundary>
                <CardComponent />
              </ErrorBoundary>
            }
          />
          <Route
            path="/confirmBox"
            element={ // Wrap each route with ErrorBoundary
              <ErrorBoundary>
                <ConfirmationBox />
              </ErrorBoundary>
            }
          />
        </Routes>
      
    </div>
  );
}

export default App;



