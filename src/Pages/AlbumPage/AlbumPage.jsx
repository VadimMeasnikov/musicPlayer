import { useDispatch, useSelector } from 'react-redux'
import { clearAlbum } from '../../reduxToolkit/slices/albumSlice'
import GoBackButton from '../../Components/GoBackButton/GoBackButton'
import './AlbumPage.scss'

export default function AlbumPage() {
    const dispatch = useDispatch()
    const goBack = () => {
        dispatch(clearAlbum())
    }
    const album = useSelector((state) => state.album.album)
    console.log(album);
    return (
        <div><GoBackButton onClick={goBack}/></div>
    )
}
