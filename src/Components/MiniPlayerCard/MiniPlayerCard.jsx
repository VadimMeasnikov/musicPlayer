import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import defaultImg from "../../img/default.png";
import { useDispatch, useSelector } from "react-redux";
import { addArtistData } from "../../reduxToolkit/slices/artistSlice";
import { addAlbum } from "../../reduxToolkit/slices/albumSlice";
import { addTrackToHistory } from "../../reduxToolkit/slices/historySlice";
import "./mini_palyer_card.scss";

export default function MiniPlayerCard({ info }) {
  const [src, setSrc] = useState(info.image || defaultImg);
  const albumData = useSelector(state => state.album.albumData);
  const dispatch = useDispatch();
  const [linkTo, setLinkTo] = useState("");

  useEffect(() => {
    if (!info.image) {
      setSrc(defaultImg);
    }
  }, [info.image]);

  useEffect(() => {
    if (info) {
      if (info.image && info.image.includes("artist")) {
        setLinkTo("/artist");
      } else if (info.zip) {
        setLinkTo(`/album/${info.id}`);
      }
       else {
        setLinkTo(`/player/${info.id}`);
      }
    }
  }, [info]);

  const correctLastTrack = (track) => {
    localStorage.setItem('track', JSON.stringify(track));
  };

  const handleClick = (info) => {
    correctLastTrack(info);

    if (info.image && info.image.includes("artist")) {
      dispatch(addArtistData(info));
    } else if (info.zip) {
      dispatch(addAlbum({ albumData: info }));
    } else {
      dispatch(addTrackToHistory(info));
    }
  };

  return (
    <Link to={linkTo} onClick={() => handleClick(info)}>
      <div className="mini_player_card">
        <img src={src} className="mini_player_card__image" alt="album" />
        <div className="mini_player_card__text">
          <div className="mini_player_card__title">{info.name}</div>
          <div className="mini_player_card__artist">{info.artist_name}</div>
        </div>
      </div>
    </Link>
  );
}
