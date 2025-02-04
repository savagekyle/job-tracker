import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import JobBoard from './scenes/JobBoard/JobBoard';
import Landing from './scenes/Landing/Landing';
import HowTo from './scenes/HowTo/HowTo';
import OurGoal from './scenes/OurGoal/OurGoal';
import Login from './scenes/Users/Login/Login';
import Register from './scenes/Users/Register/Register';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/my-jobs" element={<JobBoard />} />
          <Route exact path="/how-to" element={<HowTo />} />
          <Route exact path="/our-goal" element={<OurGoal />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
