import './Landing.css';
import DOMPurify from 'dompurify';
import Nav from '../../components/global/Navigation/Nav';
import JobSearch from "../../assets/job-search.png"
import SearchBox from '../../components/Search/SearchBox';
import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import useJobScraper from '../../useJobScraper';


function Landing() {
    const [user, setUser] = useState(null);
    const { url, setUrl, jobData, error, handleScrape } = useJobScraper();
    
      useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser); // Set user on login/logout
        });
    
        return () => unsubscribe(); // Clean up the listener
      }, []);
    

  return (
    <div className="jt">

    <div className="jt-landing">
      <Nav />
      <div className="landing-header container">
        <div>
            <h1 className="heading">Logging your job applications just became simple</h1>
            <p className="sub-heading">Your one stop solution to tracking all of your job applications.</p>
            {!user && (
                          <a className="get-started" href="/register">Get Started</a>
             ) }
            <p className="note"><strong>Note:</strong> Job Tracker is only compatible with LinkedIn jobs at this time.</p>
        </div>
        <div className="header-img">
          <img src={JobSearch} alt="Well dressed man inside of a magnifying glass representing a job search" />
          <div className="cylinder"></div>
          <div className="cylinder"></div>
          <div className="cylinder"></div>
          <div className="cylinder"></div>
          <div className="cylinder"></div>
        </div>
      </div>
      <SearchBox 
          url={url} 
          setUrl={setUrl} 
          handleScrape={() => handleScrape(user)}
          error={error} 
        />
        {jobData && (
                <div>
                    <h2>Job Details</h2>
                    <p><strong>Date Applied:</strong> {jobData.date}</p>
                    <p><strong>Company:</strong> {jobData.company}</p>
                    <p><strong>Job Title:</strong> {jobData["job-title"]}</p>
                    <p><strong>Location:</strong> {jobData.location}</p>
                    <p><strong>Description:</strong></p>
                    {/* Sanitize Raw HTML */}
                    <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(jobData.description) }}></p>
                </div>
            )}
    </div>
    </div>

  );
}

export default Landing;