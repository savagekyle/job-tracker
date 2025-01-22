import "./JobBoard.css"
import Nav from "../../components/global/Navigation/Nav"
import JobCard from "../../components/JobCard/JobCard"
import ActiveJob from "../../components/ActiveJob/ActiveJob"

const JobBoard = () => {
  return (
    <div className="job-board">
        <Nav />
        {/* Background design */}
        <div className="bg-blob"></div>
        <div className="bg-blob"></div>
        <div className="bg-cylinder"></div>
        <div className="bg-cylinder"></div>
        <div className="bg-cylinder"></div>
        <div className="bg-cylinder"></div>
        <div className="bg-cylinder"></div>
        {/* End background design */}
        <div className="container">
            <h1>Your Applications</h1>
            <div className="board-wrapper">
                <div className="application-list">
                    <JobCard />
                    <JobCard />
                    <JobCard />
                    <JobCard />
                    <JobCard />
                    <JobCard />
                    <JobCard />
                </div>
                <ActiveJob />
            </div>    
        </div>
    </div>
  )
}

export default JobBoard