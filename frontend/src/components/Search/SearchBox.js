import "./SearchBox.css";

const SearchBox = () => {
  return (
    <div className="searchbox">
        <h2>Let's get started</h2>
        <p>Enter the URL to the listing and we'll handle the rest</p>
        <input type="text" placeholder="Enter the URL ..." />
    </div>
  )
}

export default SearchBox