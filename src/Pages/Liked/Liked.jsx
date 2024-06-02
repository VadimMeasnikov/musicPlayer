import { useDispatch, useSelector } from 'react-redux'
import './Liked.scss'


export default function Liked() {
    const likedTracks = useSelector((state) => state.likes.likedTracks);
  return (
    <div>Liked</div>
  )
}
