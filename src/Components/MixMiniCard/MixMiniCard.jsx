import './MixMiniCard.scss'

export default function MixMiniCard({playlist}) {
  return (
    <div className="playlistCard">
      <div className="playlistCard-img">
        <img src={playlist.tracks[0].image} alt="img" />
      </div>
      <div className="playlistCard-title">
        <p>{playlist.name}</p>
      </div>
    </div>
  )
}
