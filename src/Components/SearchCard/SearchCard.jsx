import { useState } from "react";
import defaultImg from "../../img/default.png";
import "./searchcard.scss";

export default function SearchCard({ info }) {
  const [src, setSrc] = useState(info.image);
  if (src === "") {
    setSrc(defaultImg);
  }
  return (
    <div className="searchCard">
      <img src={src} alt="album" />
      <div className="searchCard-text">
        <div className="searchCard__title">{info.name}</div>
        <div className="searchCard__artist">{info.artist_name}</div>
      </div>
    </div>
  );
}
