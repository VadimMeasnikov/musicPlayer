import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import like from "../../img/like_album.png";
import vector from "../../img/album_vector.png";
import { IoPlay, IoPause } from "react-icons/io5";
import GoBackButton from "../../Components/GoBackButton/GoBackButton";
import { FcLike } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTrackToHistory } from "../../reduxToolkit/slices/historySlice";
import {addLikedTrack,removeLikedTracks} from "../../reduxToolkit/slices/favouriteTracks";
import { clearAlbum } from "../../reduxToolkit/slices/albumSlice";
import GetCurrentColor from "../../GetCurrentColor";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import sad from "../../img/sad.png";
import defaultAlbum from "../../img/defaultAlbum.jpg";
import AlbumCard from "../../Components/AlbumCard/AlbumCard";

import "./album.scss";
import { setAudio } from "../../reduxToolkit/slices/appAudio";

export default function Album() {
  const { albumId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isPlay, setIsPlay] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [albumImage, setAlbumImage] = useState(defaultAlbum);
  const [likedTracks, setLikedTracks] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [averageColor, setAverageColor] = useState("");
  const [dataResult, setDataResult] = useState([]);
  const [URL, setURL] = useState(null);
  const [search, setSearch] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);
  const [activeTrack, setActiveTrack] = useState(null);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isAuto, setIsAuto] = useState(false);
  const likedTracksStore = useSelector((state) => state.likes.likedTracks);
  const data = useSelector((state) => state.album.albumData);
  const isCustomPlaylist = useSelector((state) => state.album.isCustomPlaylist);

  const dispatch = useDispatch();
  const audioRef = useRef();

  const [albumName, setAlbumName] = useState("");
  const [artist, setArtist] = useState("");
  const [albumLength, setAlbumLength] = useState("");
  const [albumRelease, setAlbumRelease] = useState("");

  const audioSettings = useSelector(state => state.audio)

  function handleLikeAlbum() {
    setIsLiked(false);
  }

  function handleDislikeAlbum() {
    setIsLiked(true);
  }

  useEffect(() => {
    if (activeTrack !== null) {
      dispatch(addTrackToHistory(activeTrack));
    }
  }, [activeTrack]);

  function audioToggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play();
      setIsPlay(true);
    } else {
      audio.pause();
      setIsPlay(false);
    }
  }

  const goBack = () => {
    setTimeout(() => {
      dispatch(clearAlbum());
    }, 500);
  };

  useEffect(() => {
    if (isCustomPlaylist && data) {
      setAlbumImage(data.tracks[0]?.image || defaultAlbum);
      setTracks(data.tracks);
      setDataResult(data.tracks);
      setURL(data.tracks[0]?.audio);
      setAlbumLength(data.tracks.length);
      setIsLoading(false);
    } else if (data) {
      fetchAlbumTracks(data);
      setAlbumImage(data.image || defaultAlbum);
      setAlbumRelease(data.releasedate.slice(0, 4));
      setAlbumLength(tracks.length);
      setArtist(data.artist_name);
    }
    setAlbumName(data.name);
  }, [data, isCustomPlaylist]);

  async function fetchAlbumTracks(data) {
    const response = await fetch(
      `https://api.jamendo.com/v3.0/tracks/?client_id=354e8ba5&format=jsonpretty&limit=all&artist_name=${data.artist_name}&album_name=${data.name}`
    );
    const tracksData = await response.json();
    setDataResult(tracksData.results);
    setTracks(tracksData.results);
    setURL(tracksData.results[0].audio);
    setIsLoading(false);
    return tracksData.results;
  }

  useEffect(() => {
    if (isPlay) {
      setIsAuto(true);
      if (tracks.length !== 0) {
        const currentTrack = tracks[trackIndex];
        const timeout = setTimeout(() => {
          const nextIndex = (trackIndex + 1) % tracks.length;
          setTrackIndex(nextIndex);
        }, currentTrack.duration * 1000);

        return () => clearTimeout(timeout);
      }
    }
  }, [trackIndex, tracks, isPlay]);

  useEffect(() => {
    if (activeTrack) {
      setURL(activeTrack.audio);
      setIsAuto(true);
    }
  }, [activeTrack]);

  useEffect(() => {
    if (tracks.length !== 0 && isPlay) {
      const currentTrack = tracks[trackIndex];
      setActiveTrack(currentTrack);
      setURL(currentTrack.audio);
    }
  }, [trackIndex, tracks, isPlay]);

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

  const handleColorGeneration = (color) => {
    setAverageColor(color);
  };

  const bg = `linear-gradient(to bottom, ${averageColor}, rgb(0, 0, 0))`;
  const brighterColor = `brightness(120%)`;
  const bgInp = `linear-gradient(to bottom, ${brighterColor}, ${averageColor}, rgb(0, 0, 0))`;

  function getDataInAlbum(e, array) {
    e.preventDefault();
    if (search) {
      setActiveTrack(false);
      setIsEmpty(false);
      const filtered = array.filter((item) => {
        return item.name.toLowerCase().includes(search.toLowerCase());
      });
      setTracks(filtered);
      if (filtered.length === 0) {
        setIsEmpty(true);
      }
    } else if (search.length === 0) {
      setTracks(array);
    }
  }

  function handleClickActive(info) {
    if (info === activeTrack) {
        dispatch(setAudio({
            audio: info.audio,
            isPlay: false
          }))
      setActiveTrack(false);
      if (audioRef.current) audioRef.current.pause();
    } else {
      dispatch(setAudio({
        audio: info.audio,
        isPlay: true
      }))
      setActiveTrack(info);
      if (audioRef.current) audioRef.current.play();
    }
  }

  return isLoading ? (
    <div className="spinner-container">
      <CgSpinnerTwoAlt className="spinner" />
    </div>
  ) : (
    <div className="album">
      <div className="album_container">
        <GetCurrentColor
          imageUrl={albumImage}
          onColorGenerated={handleColorGeneration}
        />
        <audio
          className="audio_element"
          ref={audioRef}
          src={URL}
          autoPlay={isAuto}
          muted='true'
          controls
        ></audio>
        <div className="album_color__top" style={{ background: bg }}>
          <div className="album_arrow">
            <GoBackButton />
            <h1 className="album_title">{albumName}</h1>
          </div>
          <div className="album_search_content">
            <form
              onChange={(e) => getDataInAlbum(e, dataResult)}
              className="search_in_plsylist__form"
            >
              <div style={{ background: bgInp }} className="search_box">
                <label>
                  <IoSearch />
                </label>
                <input
                  onChange={(e) => setSearch(e.target.value)}
                  className="search_content"
                  type="text"
                  placeholder={`Find in ${
                    isCustomPlaylist ? "playlist" : "album"
                  }`}
                />
              </div>
            </form>
          </div>
          <div className="album_content">
            <div className="album_logo">
              <img src={albumImage} alt="" />
            </div>
            <div className="text_box_content">
              <div className="main_buttons_info">
                <div className="content__1__info">
                  <div className="main_album__info">
                    <div className="content_text">
                      <p className="info_1">
                        {albumName} {artist && `by ${artist}`}
                      </p>
                      <p className="album__info">
                        Album • {albumRelease ? `${albumRelease} • ` : ""}
                        {albumLength} tracks
                      </p>
                    </div>
                  </div>
                </div>
                <div className="content_2__buttons">
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
              </div>
            </div>
          </div>
        </div>
        {isLoading ? (
          <CgSpinnerTwoAlt className="spinner" />
        ) : isEmpty ? (
          <div className="sad_box">
            <div className="sad_box_container">
              <p>
                Unfortunately, nothing was found. Please check the name of the
                song you are looking for.
              </p>
              <img className="sad_img" src={sad} alt="" />
            </div>
          </div>
        ) : (
          <div className="album_tracks_box">
            <ol className="album-tracks">
              {tracks
                .slice()
                .sort((a, b) => a.position - b.position)
                .map((item, index) => (
                  <AlbumCard
                    key={item.id}
                    info={item}
                    isActive={item === activeTrack}
                    handleClickActive={handleClickActive}
                  />
                ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}
