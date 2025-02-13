import "./SearchBox.css";
import { useJobScraper } from "../../JobScraperContext";
import SearchInput from "./SearchInput";

const SearchBox = () => {
  const { error } = useJobScraper();

  return (
    <div className="searchbox">
      <h2>Let's get started</h2>
      <p>Enter the URL to the listing and we'll handle the rest</p>
      <SearchInput />
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default SearchBox;