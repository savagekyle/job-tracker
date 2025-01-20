import './Landing.css';
import Nav from '../../components/global/Navigation/Nav';
import JobSearch from "../../assets/job-search.png"

function Landing() {
  return (
    <div className="jt-landing">
      <Nav />
      <div className="landing-header container">
        <div>
            <h1 className="heading">Logging your job applications just became simple</h1>
            <p className="sub-heading">Your one stop solution to tracking all of your job applications.</p>
            <a className="get-started" href="/register">Get Started</a>
            <p className="note"><strong>Note:</strong> Job Tracker is only compatible with LinkedIn jobs at this time.</p>
        </div>
        <img src={JobSearch} alt="Well dressed man inside of a magnifying glass representing a job search" />
      </div>
    </div>
  );
}

export default Landing;