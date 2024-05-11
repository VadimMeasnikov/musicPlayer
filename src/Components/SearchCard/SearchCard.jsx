import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import defaultImg from "../../img/default.png";
import "./searchcard.scss";
import { useDispatch } from "react-redux";
import { addArtistData } from "../../reduxToolkit/slices/artistSlice";
import { addAlbum } from "../../reduxToolkit/slices/albumSlice";

export default function SearchCard({ info }) {
  const [src, setSrc] = useState(info.image);
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
      } else if (info.zip) {
        setLinkTo("/album");
      } else {
        setLinkTo(`/player/${info.id}`);
      }
    }
  }, [info]);

  const handleClick = () => {
    if (info && info.image && info.image.includes("artist")) {
      dispatch(addArtistData(info));
    } else if (info && info.zip) {
      dispatch(addAlbum(info));
    }
  };

  return (
    <Link to={linkTo} onClick={handleClick}>
      <div className="searchCard">
        <img src={src} alt="album" />
        <div className="searchCard-text">
          <div className="searchCard__title">{info.name}</div>
          <div className="searchCard__artist">{info.artist_name}</div>
        </div>
      </div>
    </Link>
  );
}
