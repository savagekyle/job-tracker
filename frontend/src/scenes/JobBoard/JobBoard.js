import "./JobBoard.css"
import Nav from "../../components/global/Navigation/Nav"
import JobCard from "../../components/JobCard/JobCard"
import ActiveJob from "../../components/ActiveJob/ActiveJob"
import { getUserJobs } from "../../authService"
import { useState, useEffect } from "react"

const JobBoard = () => {

    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedJob, setSelectedJob] = useState(null);
    
    useEffect(() => {
      const fetchJobs = async () => {
        try {
          const jobData = await getUserJobs();
          setJobs(jobData);
          setSelectedJob(jobData[0]);
          console.log(jobData[0]);
        } catch (error) {
          console.error("Failed to fetch jobs:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchJobs();
    }, []);

    const handleJobClick = (job) => {
      setSelectedJob(job);
    };

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
            {
              loading && <p>Loading jobs...</p>      
            }
            <div className="board-wrapper">
                <div className="application-list">
                {jobs.length > 0 ? (
                  jobs.map((job) => (
                    <JobCard 
                      key={job.id}
                      date={job.date}
                      title={job.jobTitle} 
                      company={job.company}
                      location={job.location}
                      pay={job.pay}
                      onClick={() => handleJobClick(job)}
                      active=""
                    />
                  ))
                ) : (
                  !loading && <p>No job applications found.</p>
                )}        
                </div>
                {selectedJob && <ActiveJob job={selectedJob} />} 
            </div>    
        </div>
    </div>
  )
}

export default JobBoard