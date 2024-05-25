import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addSearch } from '../../reduxToolkit/slices/userSearch';
import "./MiniCard.scss";

export default function MiniCard({ track }) {
  const dispatch = useDispatch();

  return (
    <NavLink to={`/player/${track.id}`} onClick={() => { dispatch(addSearch(track)) }}>
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
