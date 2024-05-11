import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetTrackQuery } from "../../reduxToolkit/queryApi/tracksJamendo";
import MiniCard from "../../Components/MiniCard/MiniCard";
import ArtistMiniCard from "../../Components/ArtistMiniCard/ArtistMiniCard";
import MixMiniCard from "../../Components/MixMiniCard/MixMiniCard";
import Navigation from "../../Components/Navigation/Navigation";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { setUser } from "../../reduxToolkit/slices/userSlice";
import { getAllUsersData } from "../../services";
import { addPlaylist } from "../../reduxToolkit/slices/playlistSlice";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import { setKey } from "../../reduxToolkit/slices/userKeySlice";
import { setArtists } from "../../reduxToolkit/slices/userArtistsSlice";
import { getCurrentAvatar } from "./getCurrentAvatar";
import { setPhoto } from "../../reduxToolkit/slices/userPhoto";
// import CurrentArtist from "../CurrentArtist/CurrentArtist";
import "./home.scss";






export default function Home() {

  const { dataUsers, isLoading } = getAllUsersData();
  const { data } = useGetTrackQuery();
  // Стейт для треков
  const [featured, setFeatured] = useState([]);
  // Стейт для приветствия
  const [greeting, setGreeting] = useState("");
  const [userArtists, setUserArtists] = useState([])
  // Отображение имени на главной странице
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [formattedDate, setFormattedDate] = useState("");
  const [playlistDataLoaded, setPlaylistDataLoaded] = useState(false);
  const [isOpenCurrentArtist, setIsOpenCurrentArtist] = useState(false);
  const [artistModalData, setArtistModalData] = useState({});

  const currentHour = new Date().getHours();

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const auth = getAuth()
  const userFb = auth.currentUser;

  const userRd = useSelector(state => state.user)
  const { username } = useSelector((state) => state.user);
  const selectedArtists = useSelector((state) => state.userArtists.userAppArtists);
  const playlistInfo = useSelector((state) => state.playlists.tracks);

  const userAgent = navigator.userAgent;
  // Примеры проверок для разных устройств

  // Проверка, существует ли массив с треками
  useEffect(() => {
    if (data && data.results) {
      setFeatured(data.results);
    }
  }, [data]);

  // Логика времени


  useEffect(() => {

    if (currentHour >= 4 && currentHour < 12) {
      setGreeting("Good morning, ");
    } else if (currentHour >= 12 && currentHour < 17) {
      setGreeting("Good afternoon, ");
    } else if (currentHour >= 17 && currentHour < 24) {
      setGreeting("Good evening, ");
    } else {
      setGreeting("Good night, ");
    }

    onAuthStateChanged(auth, (user) => {
      if (user && !userRd.email) {
        getAllUsersData()
          .then((data) => {
            const newArr = createUsersArray(data)
            return newArr
          })
          .then((array) => {
            const key = auth.currentUser.displayName
            const user = getCurrentUser(array, key)

            getCurrentAvatar(user.id)
              .then((avatar) => {
                dispatch(setPhoto({
                  photo: avatar
                }
                ))
              })
              .catch(e => {
                console.error(e)
              })

            dispatch(setUser({
              email: user.email,
              id: user.id,
              share: user.share,
              news: user.news,
              username: user.username,
            }))

            dispatch(
              setKey({
                key: user.key
              })
            )

            const artists = JSON.parse(user.artists)
            artists.map((artist) => (
              dispatch(setArtists(artist))
            ))
            setUserArtists(artists)
            setIsPageLoading(false)
            return user
          })
          .catch((e) => { console.error(e) })
      } else if (!user || userRd.email == null) {
          navigate('/registration')
      }
    });
  }, []);


  function createUsersArray(usersObj) {
    return Object.entries(usersObj).map(([key, value]) => {
      return { id: key, ...value };
    });
  }

  function getCurrentUser(usersArray, key) {
    const currentUser = usersArray.find((user) => user.key === key);
    return currentUser;
  }


  useEffect(() => {
    if (selectedArtists) {
      setUserArtists(selectedArtists)
    }
  }, [selectedArtists])


  useEffect(() => {
    const updateFormattedDate = () => {
      setFormattedDate(new Date().toISOString().slice(0, 10));
    };
    updateFormattedDate();
    const intervalId = setInterval(updateFormattedDate, 24 * 60 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);






  const [loading, setLoading] = useState(true);
  useEffect(() => {
    createPlaylists(userArtists, dispatch, formattedDate);
  }, [userArtists, dispatch, formattedDate]);

  useEffect(() => {
    if (!playlistDataLoaded && playlistInfo !== undefined) {
      setLoading(false);
      setPlaylistDataLoaded(true);
    }
  }, [playlistInfo, playlistDataLoaded]);


  useEffect(() => {
    if (playlistInfo !== undefined) {
      setLoading(false);
    }
  }, [playlistInfo]);

  async function createPlaylists(artists, dispatch, formattedDate) {
    try {
      artists.map(async (artist) => {
        const playlistName = `${artist.name} Mix`;
        const response = await fetch(
          `https://api.jamendo.com/v3.0/artists/tracks/?client_id=354e8ba5&format=jsonpretty&order=track_name_desc&name=${artist.name}&album_datebetween=1980-01-01_${formattedDate}`
        );
        const playlistTracks = await response.json();
        const formattedTracks = playlistTracks.results[0].tracks;
        dispatch(addPlaylist({ name: playlistName, tracks: formattedTracks }));
      });
      setIsPageLoading(false)
    } catch (error) {
      console.error("Error creating playlists:", error);
    }
  }
  return (
    <div className="wrapper">
      {isPageLoading ? (
        <div className="spinnerBox">
          <CgSpinnerTwoAlt color="white" className="spinner" display="block" />
        </div>
      ) : (
        <div className="homePage">

          <div className="homePage-titleBox">
            <h1 className="homePage-title">
              {greeting}
              {username}
            </h1>
          </div>
          <div className="featuredTracks">
            <div className="featuredTracks-title">Today's biggest hits!</div>
            <div className="featuredTracks-results">
              {featured.map((item, index) => (
                <MiniCard key={index} track={item} />
              ))}
            </div>
          </div>
          {playlistInfo.length > 0 && (
            <div className="playlistsMix">
              <div className="playlistsMix-title">Recommended for today</div>
              <div className="playlistsMix-results">
                {loading ? (
                  <div className="spinnerBox">
                    <CgSpinnerTwoAlt
                      color="white"
                      className="spinner"
                      display="block"
                    />
                  </div>
                ) : (
                  <div className="playlistsMix-results">
                    {playlistInfo.map((item, index) => (
                      <MixMiniCard key={index} playlist={item} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
          {userArtists.length > 0 && (
            <div className="suggestedArtists">
              <div className="suggestedArtists-title">Artists you like</div>
              <div className="suggestedArtists-results">
                {userArtists.map((item, index) => (
                  <ArtistMiniCard
                    key={index}
                    artist={item}
                  />
                ))}
              </div>
            </div>
          )}
          <Navigation />
        </div>
      )}
    </div>
  );
}
