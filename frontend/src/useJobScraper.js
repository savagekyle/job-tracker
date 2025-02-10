import { useState } from "react";
import axios from "axios";
import { saveJobData } from "./authService";

const useJobScraper = () => {
    const [url, setUrl] = useState("");
    const [jobData, setJobData] = useState(null);
    const [error, setError] = useState("");

    const handleScrape = async (user, scrapeUrl = url) => {
        try {
            const response = await axios.post("http://127.0.0.1:5000/scrape-job", { url: scrapeUrl });
            setJobData(response.data);
            setError("");

            // Save job data to Firestore under logged-in user
            if (user) {
                const saveResponse = await saveJobData(user, response.data);
                if (saveResponse.error) {
                    console.error("Failed to save job:", saveResponse.error);
                }
            }
        } catch (err) {
            setError("Failed to fetch job details");
            console.error(err);
        }
    };

    return { url, setUrl, jobData, error, handleScrape };
};

export default useJobScraper;
