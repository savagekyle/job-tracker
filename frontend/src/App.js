import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import JobBoard from './scenes/JobBoard/JobBoard';
import Landing from './scenes/Landing/Landing';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/my-jobs" element={<JobBoard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
