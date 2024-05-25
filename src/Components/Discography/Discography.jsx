import "./Discography.scss";
import GoBackButton from "../GoBackButton/GoBackButton";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { IoPlay, IoPause } from "react-icons/io5";
import AlbumCard from '../../Components/AlbumCard/AlbumCard';
import { addLikedTrack, removeLikedTracks } from "../../reduxToolkit/slices/favouriteTracks";
import { clearArtistData } from "../../reduxToolkit/slices/artistSlice";

export default function Discography({ data, close }) {
  const [tracks, setTracks] = useState([]);
  const [activeTrack, setActiveTrack] = useState(null);
  const [isPlay, setIsPlay] = useState(false);
  const [URL, setURL] = useState(null);
  const [isAuto, setIsAuto] = useState(false);
  const audioRef = useRef();

  useEffect(() => {
    getAlbums(data);
  }, [data]);

  const dispatch = useDispatch();
  const goBack = () => {
    dispatch(clearArtistData());
  };

  useEffect(() => {
    if (tracks.length > 0) {
      setURL(tracks[0]?.audio);
    }
  }, [tracks]);

  useEffect(() => {
    if (activeTrack) {
      setURL(activeTrack.audio);
      setIsAuto(true);
    }
  }, [activeTrack]);

  async function getAlbums(data) {
    const response = await fetch(
      `https://api.jamendo.com/v3.0/albums/tracks/?client_id=354e8ba5&format=jsonpretty&limit=all&artist_name=${data.name}`
    );
    const albumTracks = await response.json();
    setTracks(albumTracks.results);
  }

  const likedTracksStore = useSelector((state) => state.likes.likedTracks);
  const [likedTracks, setLikedTracks] = useState([]);

  useEffect(() => {
    setLikedTracks(likedTracksStore);
  }, [likedTracksStore]);

  const handleTrackLike = (track) => {
    const isTrackLiked = likedTracksStore.some(
      (likedTrack) => likedTrack.id === track.id
    );
    if (!isTrackLiked) {
      setLikedTracks([...likedTracks, track]);
      dispatch(addLikedTrack(track));
    } else {
      const updatedLikedTracks = likedTracks.filter(
        (likedTrack) => likedTrack.id !== track.id
      );
      setLikedTracks(updatedLikedTracks);
      dispatch(removeLikedTracks(track.id));
    }
  };

  function audioToggle() {
    const audio = audioRef.current;
    if (audio) {
      if (audio.paused) {
        audio.play();
        setIsPlay(true);
      } else {
        audio.pause();
        setIsPlay(false);
      }
    }
  }

  function handleClickActive(track) {
    if (track === activeTrack) {
      setActiveTrack(null);
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setIsPlay(false);
    } else {
      setActiveTrack(track);
      setIsPlay(true);
      if (audioRef.current) {
        audioRef.current.play();
      }
    }
  }

  return (
    <div className="discography">
      <audio
        className="audio_element"
        ref={audioRef}
        src={URL}
        autoPlay={isAuto}
        controls
      ></audio>
      <div className="discography-topPanel">
        <GoBackButton className="GoBackBtn" onClick={close} />
        <h3>{data.name}</h3>
      </div>
      <div className="discography-info">
        <h1>Discography</h1>
        <div className="discography-results">
          {tracks.length > 0 && (
            <div className="discography-item">
              {[...tracks].reverse().map((item) => (
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
                        {activeTrack?.id === item.id && isPlay ? (
                          <IoPause
                            onClick={audioToggle}
                            className="album__btn-pause"
                          />
                        ) : (
                          <IoPlay
                            onClick={() => handleClickActive(item)}
                            className="album__btn-play"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <ol className="discography-tracks">
                    {item.tracks
                      .slice()
                      .sort((a, b) => a.position - b.position)
                      .map((track) => (
                        <AlbumCard
                          key={track.id}
                          img={item.image}
                          info={track}
                          isActive={track === activeTrack}
                          handleClickActive={() => handleClickActive(track)}
                        />
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
