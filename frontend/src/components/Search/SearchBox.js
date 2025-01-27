import "./SearchBox.css";

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
        <input
          type="text"
          placeholder="Enter the URL ..." 
          value={props.url} 
          onChange={(e) => props.setUrl(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={props.handleScrape}>Add Job</button>
        {props.error && <p className="error-message">{props.error}</p>}
    </div>
  )
}

export default SearchBox