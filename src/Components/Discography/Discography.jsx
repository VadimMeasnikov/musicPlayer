import "./Discography.scss";
import GoBackButton from "../GoBackButton/GoBackButton";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaCirclePlay } from "react-icons/fa6";
import { FaCirclePause } from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";

export default function Discography({ data, albums, close }) {
  const [tracks, setTracks] = useState([]);
  useEffect(() => {
    getAlbums(data);
  }, [data]);
  async function getAlbums(data) {
    const responce = await fetch(
      `https://api.jamendo.com/v3.0/albums/tracks/?client_id=354e8ba5&format=jsonpretty&limit=all&artist_name=${data.name}`
    );
    const albumTracks = await responce.json();
    setTracks(albumTracks.results);
  } 
  return (
    <div className="discography">
      <div className="discography-topPanel">
        <GoBackButton className="GoBackBtn" onClick={close} />
        <h3>{data.name}</h3>
      </div>
      <div className="discography-info">
        <h1>Discography</h1>
        <div className="discography-results">
          {tracks && (
            <div className="discography-item">
              {tracks.reverse().map((item) => (
                <div key={item.id} className="discography-itemContent">
                  <div className="discography-itemInfo">
                    <img src={item.image} alt="image" />
                    <div className="discography-itemTextInfo">
                      <div className="name">
                        <h1>{item.name}</h1>
                        <span>
                          Album • {item.releasedate.slice(0, 4)} •{" "}
                          {item.tracks.length} songs
                        </span>
                      </div>
                      <div className="buttons">
                        <FaCirclePlay className="funcBtn playBtn" />
                        <FaRegHeart className="funcBtn likeBtn" />
                        <BsThreeDots className="funcBtn settingsBtn" />
                      </div>
                    </div>
                  </div>
                  <div className="discographyTrackPositionPanel">
                    <div className="trackIndex">#</div>
                    <div className="trackTitle">Title</div>
                  </div>
                  <ol className="discography-tracks">
                    {item.tracks.sort((a, b) => a.position - b.position).map((track) => (
                      <li key={track.id}>
                        <span className="trackPosition">{track.position}</span>
                        <div>
                          <span>{track.name}</span>
                          <span>{item.artist_name}</span>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
