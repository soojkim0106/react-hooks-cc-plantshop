import React from "react";

function Search({ search, onSearchPlant }) {
  return (
    <div className="searchbar">
      <label htmlFor="search">Search Plants:</label>
      <input
        type="text"
        id="search"
        //! Need to make it so that the value is what is being searched on the bar
        value={search}
        placeholder="Type a name to search..."
        //! OnChange to track what is being written on the search bar
        onChange={(e) => onSearchPlant(e)}
      />
    </div>
  );
}

export default Search;
