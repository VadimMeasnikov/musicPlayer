import albumIcon from "../../img/Icon.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import defaultImg from "../../img/default.png";
import "./searchcard.scss";

export default function SearchCard({ info }) {
  const [src, setSrc] = useState(info.image);
  if (src === "") {
    setSrc(defaultImg);
  }
  return (
    <Link to={`/player/${info.id}`}>
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
