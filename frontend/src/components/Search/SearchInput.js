import { useJobScraper } from "../../JobScraperContext";
import SearchIcon from '@mui/icons-material/Search';
import "./SearchBox.css"

const SearchInput = (props) => {
    const { url, setUrl, handleScrape } = useJobScraper();

    const scrapeJob = () => {
        try {
            handleScrape();
            props.refreshJobs();
        } catch {
            console.log("Failed to find job");
        }
    }

    return (
        <div className="search-bar-container">
        <input
            type="text"
            required
            placeholder="Enter the URL ..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && scrapeJob()}
        />
        <SearchIcon onClick={scrapeJob} fontSize="medium" className="search-icon" />
        </div>
  )
}

export default SearchInput