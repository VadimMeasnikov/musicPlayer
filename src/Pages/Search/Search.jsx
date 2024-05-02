import React, { useState, useEffect } from "react";
import Navigation from "../../Components/Navigation/Navigation";
import SearchCard from "../../Components/SearchCard/SearchCard";
import Tab from "../../Components/Tab/Tab";
import { useSearchQuery } from "../../reduxToolkit/queryApi/searchJamendo";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import tabsData from "../../tabs.json";
import "./search.scss";

export default function Search() {
  // данные для табов(tabs.json)
  const [tabs, setTabs] = useState(tabsData);
  // заголовок
  const [searchTitle, isSearchTitle] = useState(true);
  // активный таб
  const [activeTab, setActiveTab] = useState(tabs[0].path);
  // содержимое инпута
  const [searchValue, setSearchValue] = useState("");
  // результат поиска
  const [searchTracks, setSearchTracks] = useState([]);
  // обновленный результат поиска
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // логика обновления содержимого в инпуте
    const timeoutId = setTimeout(() => {
      setDebouncedSearchValue(searchValue);
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [searchValue]);

  //мидлвейр поиска
  const { data, error } = useSearchQuery({ path: activeTab, name: debouncedSearchValue });


  useEffect(() => {
    // проверка, есть ли ответ из api
    if (data && data.results) {
      setSearchTracks(data.results);
      console.log(data);
      setLoading(false);
    } else {
      setSearchTracks([]);
    }
  }, [data]);

  // логика обновления активного таба
  // для запроса в api
  const handleTabClick = (path) => {
    setActiveTab(path);
  };

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
        <div className="searchCategories">
          {tabs.map((item, index) => (
            <Tab info={item} key={index} onClick={handleTabClick} />
          ))}
        </div>
        <div className="search-page__results">
          {loading ? (
            <div className="spinnerBox">
              <CgSpinnerTwoAlt
                color="white"
                className="spinner"
                display="block"
              />
            </div>
          ) : (
            <>
              {error && <p>Error: {error.message}</p>}
              {searchTracks && searchTracks.length > 0 ? (
                searchTracks.map((item, index) => (
                  <SearchCard
                    key={index}
                    info={item}
                    onClick={console}
                  />
                ))
              ) : (
                <p className="noResults">No results found</p>
              )}
            </>
          )}
        </div>
      </div>
      <Navigation />
    </div>
  );
}
