import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import GoBackButton from "../../Components/GoBackButton/GoBackButton";
import PlayButton from "../../img/PlayButton.png";
import "./CurrentArtist.scss";

export default function CurrentArtist({
  artistModalData,
  closeCurrentArtistModal,
}) {
  const [formattedDate, setFormattedDate] = useState();
  const [tracks, setTracks] = useState();

  useEffect(() => {
    const updateFormattedDate = () => {
      setFormattedDate(new Date().toISOString().slice(0, 10));
    };
    updateFormattedDate();
    const intervalId = setInterval(updateFormattedDate, 24 * 60 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    getCurrentArtistTracks(formattedDate, artistModalData);
  }, [formattedDate, artistModalData]);
  async function getCurrentArtistTracks(formattedDate, artistModalData) {
    const responce = await fetch(
      `https://api.jamendo.com/v3.0/artists/tracks/?client_id=354e8ba5&format=jsonpretty&order=popularity_total&name=${artistModalData.name}&album_datebetween=1980-01-01_${formattedDate}`
    );
    const currentArtistTracks = await responce.json();
    const formattedCurrentArtistTracks = currentArtistTracks.results[0].tracks;
    formattedCurrentArtistTracks.splice(10);
    setTracks(formattedCurrentArtistTracks);
  }
  const selectedArtists = useSelector(
    (state) => state.userArtists.userAppArtists
  );
  const isFollowed = selectedArtists.includes(artistModalData);
  
  return (
    <div className="currentArtistModal">
      <div className="currentArtist">
        <div className="currentArtistTopPanel">
          <GoBackButton
            className="GoBackBtn"
            onClick={closeCurrentArtistModal}
          />
          <h3>{artistModalData.name}</h3>
        </div>
        <div className="currentArtistImageBox">
          <img src={artistModalData.image} alt="Img" />
        </div>
        <div className="currentArtistInfoBox">
          <div className="currentArtistButtons">
          {isFollowed ? (
              <button className="followArtistBtn">Following</button>
            ) : (
              <button className="followArtistBtn">Follow</button>
            )}
            <img className="playBtn" src={PlayButton} alt="Play" />
          </div>
          <div className="currentArtistTopTracks">
            <h1>Popular tracks</h1>
            {tracks && (
              <ol className="tracks">
                {tracks.map((item) => (
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
    </div>
  );
}
