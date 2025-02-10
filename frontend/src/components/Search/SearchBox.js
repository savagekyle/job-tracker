import "./SearchBox.css";
import SearchIcon from '@mui/icons-material/Search';

const SearchBox = (props) => {

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      props.handleScrape();
    }
  };

  return (
    <div className="searchbox">
        <h2>Let's get started</h2>
        <p>Enter the URL to the listing and we'll handle the rest</p>
        <div className="search-bar-container">
          <input
            type="text"
            placeholder="Enter the URL ..." 
            value={props.url} 
            onChange={(e) => props.setUrl(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <SearchIcon onClick={props.handleScrape} fontSize="medium" className="search-icon" />
        </div>
        {props.error && <p className="error-message">{props.error}</p>}
    </div>
  )
}

export default SearchBox