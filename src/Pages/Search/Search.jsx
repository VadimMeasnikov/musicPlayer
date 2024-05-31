import React, { useState, useEffect } from "react";
import Navigation from "../../Components/Navigation/Navigation";
import MiniPlayerCard from "../../Components/MiniPlayerCard/MiniPlayerCard";
import Tab from "../../Components/Tab/Tab";
import { useSearchQuery } from "../../reduxToolkit/queryApi/searchJamendo";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import tabsData from "../../tabs.json";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import LastTrack from '../../Components/LastTrack/LastTrack'
import "./search.scss";

export default function Search() {
  const [isLastTrack, setIsLastTrack] = useState(true)
  const [tabs, setTabs] = useState(tabsData);
  const [searchTitle, setSearchTitle] = useState(true);
  const [activeTab, setActiveTab] = useState(tabs[0].path);
  const [searchValue, setSearchValue] = useState("");
  const [searchTracks, setSearchTracks] = useState([]);
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [itemsToShow, setItemsToShow] = useState(100);

  const auth = getAuth();
  const user = useSelector(state => state.user);
  const navigate = useNavigate();

  const showMore = () => {
    setItemsToShow(200);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (userSt) => {
      if (user.email == null) {
        navigate('/');
      }
    });
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchValue(searchValue);
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [searchValue]);

  const { data, error, isFetching } = useSearchQuery({ path: activeTab, name: debouncedSearchValue });

  useEffect(() => {
    if (isFetching) {
      setLoading(true);
    } else if (data && data.results) {
      setSearchTracks(data.results);
      setLoading(false);
      setItemsToShow(100);
    } else {
      setSearchTracks([]);
      setLoading(false);
    }
  }, [data, isFetching]);

  const handleTabClick = (path) => {
    setActiveTab(path);
    setLoading(true);
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
              onFocus={() => setSearchTitle(false)}
              onBlur={() => {
                if (!searchValue) {
                  setSearchTitle(true);
                }
              }}
            />
          </div>
        </div>
        <div className="searchCategories">
          {tabs.map((item, index) => (
            <Tab info={item} key={index} onClick={() => handleTabClick(item.path)} />
          ))}
        </div>
        <div className="search-page__results">
          {loading ? (
            <div className="spinnerBox">
              <CgSpinnerTwoAlt color="white" className="spinner" display="block" />
            </div>
          ) : (
            <>
              {error && <p>Error: {error.message}</p>}
              {searchTracks && searchTracks.length > 0 ? (
                searchTracks.filter(item => item.image !== "").slice(0, itemsToShow).map((item, index) => (
                  <MiniPlayerCard
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
        {itemsToShow === 100 && <button onClick={showMore} className="seeMoreBtn">See more</button>}
      </div>
      {isLastTrack && <LastTrack/>}
      <Navigation />
    </div>
  );
}
