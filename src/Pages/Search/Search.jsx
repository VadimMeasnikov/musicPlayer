import "./search.scss";
import Navigation from "../../Components/Navigation/Navigation";
import SearchInput from "../../Components/SearchInput/SearchInput";
import SearchCard from "../../Components/SearchCard/SearchCard";

export default function Search() {
  return (
    <div className="wrapper">
      <div className="search-page">
        <div className="search-page__box">
          <h1 className="search-page__title">Search</h1>
          <SearchInput placeholder={"Artists, songs or podcasts"}/>
        </div>
        <div className="search-page__results">
          <div className="search-page__results-block">
            <div className="search-page__results-block__title">Your top genres</div>
            <div className="search-page__container">
              <SearchCard/>
              <SearchCard/>
            </div>
          </div>
          <div className="search-page__results-block">
            <div className="search-page__results-block__title">Popular podcast categories</div>
            <div className="search-page__container">
              <SearchCard/>
              <SearchCard/>
            </div>
          </div>
          <div className="search-page__results-block">
            <div className="search-page__results-block__title">Browse all</div>
            <div className="search-page__container">
              <SearchCard/>
              <SearchCard/>
              <SearchCard/>
              <SearchCard/>
              <SearchCard/>
              <SearchCard/>
              <SearchCard/>
              <SearchCard/>
            </div>
          </div>
        </div>
      </div>
      <Navigation />
    </div>
  );
}
