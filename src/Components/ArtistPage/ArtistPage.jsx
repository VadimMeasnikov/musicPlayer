import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { addTrackToHistory } from "../../reduxToolkit/slices/historySlice";
import {
  addLikedTrack,
  removeLikedTracks,
} from "../../reduxToolkit/slices/favouriteTracks";
import { setArtists, removeArtists } from "../../reduxToolkit/slices/userArtistsSlice";
import { IoPlay, IoPause } from "react-icons/io5";
import GoBackButton from "../../Components/GoBackButton/GoBackButton";
import { clearArtistData } from "../../reduxToolkit/slices/artistSlice";
import "./ArtistPage.scss";
import PlayButton from "../../img/PlayButton.png";
import { useSearchQuery } from "../../reduxToolkit/queryApi/searchJamendo";
import goToPlayer from "../../img/goToPlayer.png";
import Discography from "../Discography/Discography";
import { IoIosMore } from "react-icons/io";
import AlbumCard from "../../Components/AlbumCard/AlbumCard";

export default function ArtistPage() {
  const [showAlbums, setShowAlbums] = useState(false);
  const [activeTrack, setActiveTrack] = useState(null);
  const [isPlay, setIsPlay] = useState(false);
  const [URL, setURL] = useState(null);
  const [isAuto, setIsAuto] = useState(false);
  const audioRef = useRef();
  const dispatch = useDispatch();

  const closeDiscography = () => {
    setShowAlbums(false);
  };

  const artistData = useSelector((state) => state.artist.artistData);
  const { data, error } = useSearchQuery({
    path: "artists/albums/",
    name: artistData?.name,
  });

  const [artistAlbums, setArtistAlbums] = useState([]);
  useEffect(() => {
    if (data && data.results) {
      setArtistAlbums(data.results[0]?.albums || []);
    } else {
      setArtistAlbums([]);
    }
  }, [data]);

  const [formattedDate, setFormattedDate] = useState();
  const [tracks, setTracks] = useState();
  useEffect(() => {
    if (tracks) {
      setURL(tracks[0]?.audio);
    }
  }, [tracks]);

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
    if (artistData && formattedDate) {
      getCurrentArtistTracks(formattedDate, artistData);
    }
  }, [formattedDate, artistData]);

  async function getCurrentArtistTracks(formattedDate, artistData) {
    const response = await fetch(
      `https://api.jamendo.com/v3.0/artists/tracks/?client_id=354e8ba5&format=jsonpretty&order=popularity_total&name=${artistData.name}&album_datebetween=1980-01-01_${formattedDate}`
    );
    const currentArtistTracks = await response.json();
    const formattedCurrentArtistTracks = currentArtistTracks.results[0]?.tracks || [];
    formattedCurrentArtistTracks.splice(10);
    setTracks(formattedCurrentArtistTracks);
  }

  const goBack = () => {
    dispatch(clearArtistData());
  };

  const selectedArtists = useSelector((state) => state.userArtists.userAppArtists);
  const [isFollowed, setIsFollowed] = useState(false);
  const [selectedArr, setSelectedArr] = useState([]);

  useEffect(() => {
    const isArtistFollowed = selectedArtists.some(
      (selectedArtist) => selectedArtist.id === artistData?.id
    );
    setIsFollowed(isArtistFollowed);
  }, [artistData, selectedArtists]);

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
      setLikedTracks(track);
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
    if (audio.paused) {
      dispatch(addTrackToHistory(activeTrack));
      audio.play();
      setIsPlay(true);
    } else {
      audio.pause();
      setIsPlay(false);
    }
  }

  function handleClickActive(info) {
    if (info === activeTrack) {
      setActiveTrack(null);
      audioRef.current.pause();
    } else {
      setActiveTrack(info);
      audioRef.current.play();
    }
  }

  if (!artistData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="artistPage">
      <audio
        className="audio_element"
        ref={audioRef}
        src={URL}
        autoPlay={isAuto}
        controls
      ></audio>
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
            {isPlay ? (
              <IoPause
                onClick={() => audioToggle()}
                className="album__btn-pause"
              />
            ) : (
              <IoPlay
                onClick={() => audioToggle()}
                className="album__btn-play"
              />
            )}
          </div>
          <div className="artistPage-topTracks">
            <h1>Popular tracks</h1>
            {tracks && (
              <ol className="album-tracks">
                {tracks
                  .slice(0, itemsToShow)
                  .sort((a, b) => a.position - b.position)
                  .map((item) => (
                    <AlbumCard
                      key={item.id}
                      info={item}
                      isActive={item === activeTrack}
                      handleClickActive={handleClickActive}
                    />
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
      {showAlbums && <Discography data={artistData} close={closeDiscography} />}
    </div>
  );
}
