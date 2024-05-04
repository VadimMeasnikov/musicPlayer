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
import { useGetData } from "../../services";
import { addPlaylist } from "../../reduxToolkit/slices/playlistSlice";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import "./home.scss";
export default function Home() {
  const { data } = useGetTrackQuery();
  const [featured, setFeatured] = useState([]);
  const [greeting, setGreeting] = useState("");
  const [isPageLoading, setIsPageLoading] = useState(false);
  const { username } = useSelector((state) => state.user);
  const [playlistDataLoaded, setPlaylistDataLoaded] = useState(false);
  useEffect(() => {
    if (data && data.results) {
      setFeatured(data.results);
    }
  }, [data]);
  const currentHour = new Date().getHours();
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
  }, []);
  const auth = getAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.user);
  const usersDbData = useGetData();
  // console.log(usersDbData);
  // console.log(user);
  const userFb = auth.currentUser
  const [formattedDate, setFormattedDate] = useState("");
  const selectedArtists = useSelector(
    (state) => state.userArtists.userAppArtists
  );
  useEffect(() => {
    const updateFormattedDate = () => {
      setFormattedDate(new Date().toISOString().slice(0, 10));
    };
    updateFormattedDate();
    const intervalId = setInterval(updateFormattedDate, 24 * 60 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);
  const playlistInfo = useSelector((state) => state.playlists.tracks);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
      createPlaylists(selectedArtists, dispatch, formattedDate);
  }, [selectedArtists, dispatch, formattedDate]);
  useEffect(() => {
    if (!playlistDataLoaded && playlistInfo !== undefined) {
      setLoading(false);
      setPlaylistDataLoaded(true);
    }
  }, [playlistInfo, playlistDataLoaded]);
  const [artists, setArtists] = useState(selectedArtists);
  useEffect(() => {
    if (playlistInfo !== undefined) {
      setLoading(false);
    }
  }, [playlistInfo]);
  async function createPlaylists(artists, dispatch, formattedDate) {
    try {
      artists.map(async (artist) => {
        // console.log(artist);
        const playlistName = `${artist.name} Mix`;
        const response = await fetch(
          `https://api.jamendo.com/v3.0/artists/tracks/?client_id=354e8ba5&format=jsonpretty&order=track_name_desc&name=${artist.name}&album_datebetween=1980-01-01_${formattedDate}`
        );
        const playlistTracks = await response.json();
        const formattedTracks = playlistTracks.results[0].tracks;
        dispatch(addPlaylist({ name: playlistName, tracks: formattedTracks }));
      });
    } catch (error) {
      console.error("Error creating playlists:", error);
    }
  }
  useEffect(() => {
    if (!user.email) {
      navigate("/registration");
    }
  }, []);
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
          <div className="suggestedArtists">
            <div className="suggestedArtists-title">Artists you like</div>
            <div className="suggestedArtists-results">
              {artists.map((item, index) => (
                <ArtistMiniCard
                  key={index}
                  artist={item}
                />
              ))}
            </div>
          </div>
          <Navigation />
        </div>
      )}
    </div>
  );
}
