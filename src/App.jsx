import React, { useEffect, useRef, useState } from 'react'
import { BrowserRouter as Router, NavLink, Route, Routes, useNavigate } from 'react-router-dom'
import Home from './Pages/Home/Home.jsx'
import Registration from './Pages/Registration/Registration.jsx'
import LogIn from './Pages/LogIn/LogIn.jsx'
import Search from './Pages/Search/Search.jsx'
import Player from './Pages/Player/Player.jsx'
import Artists from './Pages/Artists/Artists.jsx'
import ArtistPage from './Components/ArtistPage/ArtistPage.jsx'
import EditProfile from './Pages/EditProfile/EditProfile.jsx'
import Album from './Pages/Album/Album.jsx'
import Liked from './Pages/Liked/Liked.jsx'
import Profile from './Pages/Profile/Profile.jsx'
import UserLikes from './Pages/UserLikes/UserLikes.jsx'
import History from './Pages/History/History.jsx'

import { useSelector } from 'react-redux'

import './stylesGlobal/App.scss'





export default function App() {

  const audioSettings = useSelector(state => state.audio)
  const [URL, setURL] = useState(null)
  const [isPlay, setIsPlay] = useState(false)

  const audioRef = useRef()

  useEffect(() => {
    const audio  = audioRef.current
    if (audioSettings.audio) {
      setURL(audioSettings.audio)
      if (audioSettings.isPlay) {
        audio.play()
        setIsPlay(true)
      } else {
        audio.pause()
        setIsPlay(false)
      }
    }
    if(audioSettings.audio == null){
      audio.pause()
    }
  }, [audioSettings])


  return (
    <div className="app">
      <audio
        className="audio_element"
        ref={audioRef}
        src={URL}
        autoPlay={isPlay}
        controls
      ></audio>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/registration' element={<Registration />} />
          <Route path='/player' element={<Player />} />
          <Route path='/player/:trackId' element={<Player />} />
          <Route path='/login' element={<LogIn />} />
          <Route path='/search' element={<Search />} />
          <Route path='/artists' element={<Artists />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/artist' element={<ArtistPage />} />
          <Route path='/editprofile' element={<EditProfile />} />
          <Route path='/album/:albumId' element={<Album />} />
          <Route path="/liked" element={<Liked />} />
          <Route path="/userlikes" element={<UserLikes />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </Router>
    </div>

  )
}

