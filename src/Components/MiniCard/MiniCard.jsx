import { NavLink } from "react-router-dom";
import "./MiniCard.scss";

export default function MiniCard({ track }) {
  return (
    <NavLink to={`/player/${track.id}`}>
    <div className="card">
      <div className="card-img">
        <img src={track.image} alt="img" />
      </div>
      <div className="card-title">
        <p>{track.name}</p>
      </div>
    </div>
    </NavLink>
  );
}
