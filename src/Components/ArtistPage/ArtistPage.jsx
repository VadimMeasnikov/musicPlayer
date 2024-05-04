import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setArtists } from "../../reduxToolkit/slices/userArtistsSlice";
import { removeArtists } from "../../reduxToolkit/slices/userArtistsSlice";
import GoBackButton from "../GoBackButton/GoBackButton";
import { clearArtistData } from "../../reduxToolkit/slices/artistSlice";
import "./ArtistPage.scss";
import PlayButton from "../../img/PlayButton.png";
import { useSearchQuery } from "../../reduxToolkit/queryApi/searchJamendo";
import Discography from "../Discography/Discography";

export default function ArtistPage() {
  const [showAlbums, setShowAlbums] = useState(false);
  const closeDiscography = () => {
    setShowAlbums(false);
  };
  const artistData = useSelector((state) => state.artist.artistData);
  const { data, error } = useSearchQuery({
    path: "artists/albums/",
    name: artistData.name,
  });
  const [artistAlbums, setArtistAlbums] = useState([]);
  useEffect(() => {
    if (data && data.results) {
      setArtistAlbums(data.results[0].albums);
    } else {
      setArtistAlbums([]);
    }
  }, [data]);
  const [formattedDate, setFormattedDate] = useState();
  const [tracks, setTracks] = useState();
  const [itemsToShow, setItemsToShow] = useState(5);
  const showMore = () => {
    setItemsToShow(10);
  };
  const showLess = () => {
    setItemsToShow(5);
  };
  useEffect(() => {
    const updateFormattedDate = () => {
      setFormattedDate(new Date().toISOString().slice(0, 10));
    };
    updateFormattedDate();
    const intervalId = setInterval(updateFormattedDate, 24 * 60 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    getCurrentArtistTracks(formattedDate, artistData);
  }, [formattedDate, artistData]);
  async function getCurrentArtistTracks(formattedDate, artistData) {
    const responce = await fetch(
      `https://api.jamendo.com/v3.0/artists/tracks/?client_id=354e8ba5&format=jsonpretty&order=popularity_total&name=${artistData.name}&album_datebetween=1980-01-01_${formattedDate}`
    );
    const currentArtistTracks = await responce.json();
    const formattedCurrentArtistTracks = currentArtistTracks.results[0].tracks;
    formattedCurrentArtistTracks.splice(10);
    setTracks(formattedCurrentArtistTracks);
  }
  const dispatch = useDispatch();
  const goBack = () => {
    dispatch(clearArtistData());
  };
  const selectedArtists = useSelector(
    (state) => state.userArtists.userAppArtists
  );
  const [isFollowed, setIsFollowed] = useState(false);
  const [selectedArr, setSelectedArr] = useState([]);

  useEffect(() => {
    const isArtistFollowed = selectedArtists.some(
      (selectedArtist) => selectedArtist.id === artistData.id
    );
    setIsFollowed(isArtistFollowed);
  }, [artistData, selectedArr]);
  function handleUserFollowing() {
    if (isFollowed) {
      const updatedSelectedArr = selectedArtists.filter(
        (selectedArtist) => selectedArtist.id !== artistData.id
      );
      setSelectedArr(updatedSelectedArr);
      dispatch(removeArtists(artistData.id));
    } else {
      setSelectedArr([...selectedArr, artistData]);
      dispatch(setArtists(artistData));
    }
  }
  return (
    <div className="artistPage">
      <div className="artistPage-topPanel">
        <GoBackButton className="GoBackBtn" onClick={goBack} />
        <h3>{artistData.name}</h3>
      </div>
      <div className="artistPage-content">
        <img className="artistPage-image" src={artistData.image} alt="image" />
        <div className="artistPage-info">
          <div className="artistPage-buttons">
            {isFollowed ? (
              <button
                onClick={handleUserFollowing}
                className="followArtistBtn--active"
              >
                Following
              </button>
            ) : (
              <button onClick={handleUserFollowing} className="followArtistBtn">
                Follow
              </button>
            )}
            <img className="playBtn" src={PlayButton} alt="Play" />
          </div>
          <div className="artistPage-topTracks">
            <h1>Popular tracks</h1>
            {tracks && (
              <ol className="tracks">
                {tracks.slice(0, itemsToShow).map((item) => (
                  <li key={item.id}>
                    <img src={item.image} alt="Img" />
                    <span>{item.name}</span>
                  </li>
                ))}
              </ol>
            )}
            {itemsToShow < 10 ? (
              <button onClick={showMore}>See more</button>
            ) : (
              <button onClick={showLess}>Show less</button>
            )}
          </div>
          <div className="artistPage-discography">
            <div className="artistPage-discographyPanel">
              <h1>Discography</h1>
              <button
                onClick={() => {
                  setShowAlbums(true);
                }}
              >
                See more
              </button>
            </div>
            {artistAlbums && (
              <ol className="albums">
                {artistAlbums.slice(0, 3).map((item) => (
                  <li key={item.id}>
                    <img src={item.image} alt="Img" />
                    <span>{item.name}</span>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>
      </div>
      {showAlbums && (
        <Discography
          data={artistData}
          albums={artistAlbums}
          close={closeDiscography}
        />
      )}
    </div>
  );
}
