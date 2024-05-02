import "./artistminicard.scss";
import defaultImg from "../../img/default.png";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addArtistData } from "../../reduxToolkit/slices/artistSlice";

export default function MiniCard({ artist }) {
  const [src, setSrc] = useState(artist.image);
  useEffect(() => {
    if (!artist.image) {
      setSrc(defaultImg);
    }
  }, [artist.image]);
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(addArtistData(artist));
  };
  return (
    <NavLink onClick={handleClick} to="/artist">
      <div className="artistCard">
        <div className="artistCard-img">
          <img src={src} alt="img" />
        </div>
        <div className="artistCard-title">
          <p>{artist.name}</p>
        </div>
      </div>
    </NavLink>
  );
}
