import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { clearHistory } from "../../reduxToolkit/slices/historySlice";
import GoBackButton from "../../Components/GoBackButton/GoBackButton";
import AlbumCard from "../../Components/AlbumCard/AlbumCard";
import ProfileCard from "../../Components/ProfileCard/ProfileCard";
import "./History.scss";


export default function History() {
  const data = useSelector((state) => state.history.historyArray);
  const [tracks, setTracks] = useState(data);
  const [isPlay, setIsPlay] = useState(false);
  const [activeTrack, setActiveTrack] = useState(null);
  const [trackIndex, setTrackIndex] = useState(0);
  const [URL, setURL] = useState(null);
  const [isAuto, setIsAuto] = useState(false);
  const dispatch = useDispatch();
  const audioRef = useRef();

  useEffect(() => {
    if (activeTrack) {
      setURL(activeTrack.audio);
      setIsAuto(true);
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

  function handleClickActive(info) {
    if (info === activeTrack) {
      dispatch(setAudio({
        audio: info.audio,
        isPlay: false
      }))
      setActiveTrack(false);
    } else {
      dispatch(setAudio({
        audio: info.audio,
        isPlay: true
      }))
      setActiveTrack(info);
    }
  }

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

  return (
    <div className="history">
      <div className="history__topPanel">
        <Link to="/profile">
          <GoBackButton />
        </Link>
        <h3 className="history__title">Recently played</h3>
      </div>
      <div className="history__tracks">
        {tracks
          .filter((track) => track !== null)
          .reduce((uniqueTracks, track) => {
            if (
              !uniqueTracks.some((uniqueTrack) => uniqueTrack.id === track.id)
            ) {
              uniqueTracks.push(track);
            }
            return uniqueTracks;
          }, [])
          .reverse()
          .map((item, index) => (
            <ProfileCard
              key={item.id}
              data={item}
              dataAlbum='null'
              isActive={item===activeTrack}
              handleClickActive={handleClickActive}
            />
          ))}
      </div>
    </div>
  );
}
