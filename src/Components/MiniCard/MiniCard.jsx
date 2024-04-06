import './MiniCard.scss'
import cardImg from '../../img/cardImg.png'

export default function MiniCard({track }) {
  console.log('hello')
  return (
    <div className="card">
      <div className="card-img">
        <img src={track.image} alt="img" />
      </div>
      <div className="card-title">
        <audio controls>
          <source src={track.audio} type="audio/mpeg"></source>
        </audio>
        <p>{track.name}</p>
      </div>
    </div>
  )
}
