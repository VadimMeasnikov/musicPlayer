import albumIcon from '../../img/Icon.png'
import './searchcard.scss'

export default function SearchCard() {
  return (
    <div className="searchCard">
        <div className="searchCard__title">Card</div>
        <img src={albumIcon} alt="album" />
    </div>
  )
}
