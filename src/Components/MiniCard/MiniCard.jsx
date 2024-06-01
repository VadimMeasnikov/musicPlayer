import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addSearch } from '../../reduxToolkit/slices/userSearch';
import { addTrackToHistory } from "../../reduxToolkit/slices/historySlice";
import "./MiniCard.scss";

export default function MiniCard({ track }) {
  const dispatch = useDispatch();

  function correctLastTrack(track){
    localStorage.setItem('track', JSON.stringify(track))
  }

  return (
    <NavLink to={`/player/${track.id}`} onClick={() => {correctLastTrack(track); dispatch(addSearch(track)); dispatch(addTrackToHistory(track)) }}>
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
