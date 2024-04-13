import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, NavLink, Route, Routes, useNavigate } from 'react-router-dom'
import Home from './Pages/Home/Home.jsx'
import Registration from './Pages/Registration/Registration.jsx'
import LogIn from './Pages/LogIn/LogIn.jsx'
import Search from './Pages/Search/Search.jsx'
import Player from './Pages/Player/Player.jsx'
import Artists from './Pages/Artists/Artists.jsx'
import Profile from './Pages/Profile/Profile.jsx'
// import { useGetData } from './services.js'
import { getData } from './services.js'

import './stylesGlobal/App.scss'



export default function App() {

  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [userName, setUserName] = useState('')
  const [userNews, setUserNews] = useState(false)
  const [userShare, setUserShare] = useState(false)

  // const {data} = useGetData()
  // console.log(data);

  const userObj = {
    userEmail, setUserEmail,
    userPassword, setUserPassword,
    userName, setUserName,
    userNews, setUserNews,
    userShare, setUserShare
  }

  // const { data } = useGetTrackQuery()
  // console.log(data);

 getData()

  return (
    <Router>
      <Routes>

        <Route path='/' element={<Home/>} />
        <Route path='/registration' element={<Registration userObj={userObj}/>} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/player' element={<Player/>}/>
        <Route path='/search' element={<Search />} />
        <Route path='/artists' element={<Artists />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
      {/* <button onClick={getData}>Click</button> */}
    </Router>
  )
}

