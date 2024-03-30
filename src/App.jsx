import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, NavLink, Route, Routes } from 'react-router-dom'

import Home from './Pages/Home/Home.jsx'
import Registration from  './Pages/Registration/Registration.jsx'
import LogIn from './Pages/LogIn/LogIn.jsx'
import Search from './Pages/Search/Search.jsx'

import './stylesGlobal/App.scss'

export default function App() {
  
  const [userEmail, setUserEmail] = useState(false)
  const [userPassword, setUserPassword] = useState(false)
  const [userName, setUserName] = useState(false)
  const [userNews, setUserNews] = useState(false)
  const [userShare, setUserShare] = useState(false)

  const userObj ={
    userEmail, setUserEmail,
    userPassword, setUserPassword,
    userName, setUserName,
    userNews, setUserNews,
    userShare, setUserShare
  }

  return (
    <Router>
        <Routes>
          <Route path='/register' element={<Registration userObj={userObj}/>}/>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<LogIn/>}/>
          <Route path='/search' element={<Search/>}/>
        </Routes>
    </Router>
  )
}

