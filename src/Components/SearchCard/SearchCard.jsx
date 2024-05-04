import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import defaultImg from "../../img/default.png";
import "./searchcard.scss";
import { useDispatch } from "react-redux";
import {
  addArtistData,
  clearArtistData,
} from "../../reduxToolkit/slices/artistSlice";

export default function SearchCard({ info }) {
  const [src, setSrc] = useState(info.image);
  useEffect(() => {
    if (!info.image) {
      setSrc(defaultImg);
    }
  }, [info.image]);
  const dispatch = useDispatch();
  const [linkTo, setLinkTo] = useState("");
  useEffect(()=>{
    if (info.image.includes("artist")) {
      handleClick;
      setLinkTo("/artist")
    } else {
      setLinkTo(`/player/${info.id}`);
    }
  },[dispatch, info.image])
  const handleClick = () => {
    dispatch(addArtistData(info));
  };
  return (
    <Link to={linkTo} onClick={handleClick}>
      <div className="searchCard">
        <img src={info.image} alt="album" />
        <div className="searchCard-text">
          <div className="searchCard__title">{info.name}</div>
          <div className="searchCard__artist">{info.artist_name}</div>
        </div>
      </div>
    </Link>

  );
}
