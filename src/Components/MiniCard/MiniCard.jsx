import "./MiniCard.scss";

export default function MiniCard({ track }) {
  return (
    <div className="card">
      <div className="card-img">
        <img src={track.image} alt="img" />
      </div>
      <div className="card-title">
        <p>{track.name}</p>
      </div>
    </div>
  );
}
