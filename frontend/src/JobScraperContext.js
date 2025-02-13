import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { saveJobData } from "./authService";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const JobScraperContext = createContext();

export const JobScraperProvider = ({ children }) => {
  const [url, setUrl] = useState("");
  const [jobData, setJobData] = useState(null);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null); // State to hold authenticated user

  // Fetch the user authentication state
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser); // Set user when authenticated
      } else {
        setUser(null); // Clear user when logged out
      }
    });

    // Cleanup on unmount
    return () => unsubscribe();
  }, []);

  const handleScrape = async (scrapeUrl = url) => {
    if (!user || !user.uid) {
      setError("User is not authenticated");
      console.error("❌ No authenticated user found.");
      return;
    }
  
    try {
      const response = await axios.post("http://127.0.0.1:5000/scrape-job", { url: scrapeUrl });
      setJobData(response.data);
      setError("");
  
      // Ensure the jobData doesn't contain circular references
      const sanitizedJobData = JSON.parse(JSON.stringify(response.data));
  
      // Log sanitized job data (no circular references)
      console.log("Scraped Job Data:", sanitizedJobData);
  
      // Save job data to Firestore under the authenticated user
      const saveResponse = await saveJobData(user, sanitizedJobData);
      if (saveResponse.error) {
        console.error("Failed to save job:", saveResponse.error);
      }
    } catch (err) {
      setError("Failed to fetch job details");
      console.error(err);
    }
  };
  

  return (
    <JobScraperContext.Provider value={{ url, setUrl, jobData, error, handleScrape }}>
      {children}
    </JobScraperContext.Provider>
  );
};

export const useJobScraper = () => useContext(JobScraperContext);
