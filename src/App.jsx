import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, NavLink, Route, Routes, useNavigate } from 'react-router-dom'
import Home from './Pages/Home/Home.jsx'
import Registration from './Pages/Registration/Registration.jsx'
import LogIn from './Pages/LogIn/LogIn.jsx'
import Search from './Pages/Search/Search.jsx'
import Player from './Pages/Player/Player.jsx'
import './stylesGlobal/App.scss'
import Artists from './Pages/Artists/Artists.jsx'


export default function App() {

  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [userName, setUserName] = useState('')
  const [userNews, setUserNews] = useState(false)
  const [userShare, setUserShare] = useState(false)

  const userObj = {
    userEmail, setUserEmail,
    userPassword, setUserPassword,
    userName, setUserName,
    userNews, setUserNews,
    userShare, setUserShare
  }

  // const { data } = useGetTrackQuery()
  // console.log(data);

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/registration' element={<Registration userObj={userObj}/>} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/search' element={<Search />} />
        <Route path='/artists' element={<Artists />} />
      </Routes>
    </Router>
  )
}

