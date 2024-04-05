import './MiniCard.scss'
import cardImg from '../../img/cardImg.png'

export default function MiniCard({ item }) {
  console.log(item.image)
  return (
    <div className="card">
      <div className="card-img">
        <img src={item.image} alt="img" />
      </div>
      <div className="card-title">
        <audio controls>
          <source src={item.audio} type="audio/mpeg"></source>
        </audio>
        <p>{item.name}</p>
      </div>
    </div>
  )
}
