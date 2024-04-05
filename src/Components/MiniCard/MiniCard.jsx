import './MiniCard.scss'
import cardImg from '../../img/cardImg.png'

export default function MiniCard() {
  return (
    <div className="card">
        <div className="card-img">
            <img src={cardImg} alt="img" />
        </div>
        <div className="card-title">
            <p>1(Remastered)</p>
        </div>
    </div>
  )
}
