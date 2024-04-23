import "./artistminicard.scss";
import defaultImg from "../../img/default.png";
import { useState } from "react";

export default function MiniCard({ artist }) {
  const [src, setSrc] = useState(artist.image);
  if (src === "") {
    setSrc(defaultImg);
  }
  return (
    <div className="artistCard">
      <div className="artistCard-img">
        <img src={src} alt="img" />
      </div>
      <div className="artistCard-title">
        <p>{artist.name}</p>
      </div>
    </div>
  );
}
