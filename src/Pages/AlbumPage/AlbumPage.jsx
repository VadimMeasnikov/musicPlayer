import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { clearAlbum } from '../../reduxToolkit/slices/albumSlice'
import GoBackButton from '../../Components/GoBackButton/GoBackButton'
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaCirclePlay } from "react-icons/fa6";
import { FaCirclePause } from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";
import { addLikedTrack, removeLikedTracks } from "../../reduxToolkit/slices/favouriteTracks";
import './AlbumPage.scss'

export default function AlbumPage() {
    const dispatch = useDispatch()
    const goBack = () => {
        dispatch(clearAlbum())
    }
    const data = useSelector((state) => state.album.album);
    console.log(data);
    const [tracks, setTracks] = useState([]);
    console.log(tracks);
    useEffect(() => {
        getAlbumTracks(data);
    }, [data]);
    async function getAlbumTracks(data) {
        const response = await fetch(
            `https://api.jamendo.com/v3.0/tracks/?client_id=354e8ba5&format=jsonpretty&limit=all&artist_name=${data.artist_name}&album_name=${data.name}`
        );
        const tracksData = await response.json();
        setTracks(tracksData.results);
    }

    const likedTracksStore = useSelector((state) => state.likes.likedTracks);
    const [likedTracks, setLikedTracks] = useState([]);
    console.log(likedTracks);

    useEffect(() => {
        setLikedTracks(likedTracksStore);
    }, [likedTracksStore]);

    const handleTrackLike = (track) => {
        const isTrackLiked = likedTracksStore.some(
            (likedTrack) => likedTrack.id === track.id
        );
        if (!isTrackLiked) {
            setLikedTracks(track);
            dispatch(addLikedTrack(track));
        } else {
            const updatedLikedTracks = likedTracks.filter(
                (likedTrack) => likedTrack.id !== track.id
            );
            setLikedTracks(updatedLikedTracks);
            dispatch(removeLikedTracks(track.id));
        }
    };

    return (
        <>
            <div className="discography-topPanel">
                <GoBackButton className="GoBackBtn" onClick={goBack} />
            </div>
            <div className="album">
                <div className="album-info">
                    <img src={data.image} alt="" />
                    <div className="album-textInfo">
                        <div className="name">
                            <p>Album</p>
                            <h1>{data.name}</h1>
                            <span>{data.artist_name} • {data.releasedate.slice(0, 4)} • {tracks.length} tracks</span>
                        </div>
                        <div className="buttons">
                            <FaCirclePlay className="funcBtn playBtn" />
                            <FaRegHeart className="funcBtn likeBtn" />
                            <BsThreeDots className="funcBtn settingsBtn" />
                        </div>
                    </div>
                </div>
                <div className="albumTrackPositionPanel">
                    <div className="trackIndex">#</div>
                    <div className="trackTitle">Title</div>
                </div>
                <ol className="album-tracks">
                    {tracks.sort((a, b) => a.position - b.position).map((item, index) => (
                        <li key={item.id}>
                            <span className="trackPosition">{item.position}</span>
                            <div>
                                <span>{item.name}</span>
                                <span>{data.artist_name}</span>
                            </div>
                            <button className="likeBtn"
                                onClick={() => {
                                    handleTrackLike(item);
                                }}
                            >
                                {likedTracksStore.some(
                                    (likedTrack) => likedTrack.id === item.id
                                ) ? (
                                    <FaHeart className="likeBtnSVG" />
                                ) : (
                                    <FaRegHeart className="likeBtnSVG" />
                                )}
                            </button>
                        </li>
                    ))}
                </ol>
            </div>
        </>
    )
}
