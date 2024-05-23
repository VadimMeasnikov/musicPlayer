import './MixMiniCard.scss'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addAlbum } from '../../reduxToolkit/slices/albumSlice';

export default function MixMiniCard({ playlist }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleCardClick = () => {
        dispatch(addAlbum({ albumData: playlist, isCustomPlaylist: true }));
        navigate(`/album/${playlist.id}`);
    };

    return (
        <div className="playlistCard" onClick={handleCardClick}>
            <div className="playlistCard-img">
                <img src={playlist.tracks[0].image} alt="img" />
            </div>
            <div className="playlistCard-title">
                <p>{playlist.name}</p>
            </div>
        </div>
    )
}
