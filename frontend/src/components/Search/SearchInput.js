import React from 'react'
import { useJobScraper } from "../../JobScraperContext";
import SearchIcon from '@mui/icons-material/Search';
import "./SearchBox.css"

const SearchInput = () => {
    const { url, setUrl, handleScrape } = useJobScraper();
    return (
        <div className="search-bar-container">
        <input
            type="text"
            placeholder="Enter the URL ..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleScrape()}
        />
        <SearchIcon onClick={handleScrape} fontSize="medium" className="search-icon" />
        </div>
  )
}

export default SearchInput