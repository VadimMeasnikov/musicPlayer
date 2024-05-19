import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import defaultImg from "../../img/default.png";
import { useDispatch, useSelector } from "react-redux";
import { addArtistData } from "../../reduxToolkit/slices/artistSlice";
import { addAlbum } from "../../reduxToolkit/slices/albumSlice";

import "./mini_palyer_card.scss";

export default function MiniPlayerCard({ info }) {
  const [src, setSrc] = useState(info.image);

  const albumData = useSelector(state => state.album.albumData)

  useEffect(() => {
    if (info && !info.image) {
      setSrc(defaultImg);
    }
  }, [info]);


  const dispatch = useDispatch();
  const [linkTo, setLinkTo] = useState("");
  useEffect(() => {
    if (info) {
      if (info.image && info.image.includes("artist")) {
        setLinkTo("/artist");
      } else if (info.zip && albumData == null) {
        setLinkTo(`/album/${info.id}`);
      } else {
        setLinkTo(`/player/${info.id}`);
      }
    }
  }, [info]);

  const handleClick = () => {
    if (info && info.image && info.image.includes("artist")) {
      dispatch(addArtistData(info));
    } else if (info && info.zip) {
      console.log(info, info.zip);
      dispatch(addAlbum({
        albumData: info
      }));
    }
  };

  return (
    <Link to={linkTo} onClick={handleClick}>
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
