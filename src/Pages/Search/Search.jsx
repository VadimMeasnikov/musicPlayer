import { useState, useEffect } from "react";
import Navigation from "../../Components/Navigation/Navigation";
import SearchCard from "../../Components/SearchCard/SearchCard";
import { useSearchQuery } from "../../reduxToolkit/queryApi/searchJamendo";
import "./search.scss";

export default function Search() {
  const [searchTitle, isSearchTitle] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const { data, error, isLoading } = useSearchQuery(searchValue);
  const [searchTracks, setSearchTracks] = useState([]);
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchValue(searchValue);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchValue]);

  useEffect(() => {
    if (data && data.results) {
      setSearchTracks(data.results);
      console.log(data);
    } else {
      setSearchTracks([]);
    }
  }, [data]);

  return (
    <div className="wrapper">
      <div className="search-page">
        <div className="search-page__box">
          {searchTitle && <h1 className="search-page__title">Search</h1>}
          <div className="searchInput">
            <span></span>
            <input
              placeholder="What do you want to listen to?"
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onFocus={() => isSearchTitle(false)}
              onBlur={() => {
                if (!searchValue) {
                  isSearchTitle(true);
                }
              }}
            />
          </div>
        </div>
        <div className="search-page__results">
          {isLoading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}
          {searchTracks && searchTracks.length > 0 ? (
            searchTracks.map((item, index) => (
              <SearchCard key={index} info={item} />
            ))
          ) : (
            <p className="noResults">No results found</p>
          )}
        </div>
      </div>
      <Navigation />
    </div>
  );
}
