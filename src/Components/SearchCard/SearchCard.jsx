import albumIcon from "../../img/Icon.png";
import { Link } from "react-router-dom";
import "./searchcard.scss";

export default function SearchCard({ info }) {
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
