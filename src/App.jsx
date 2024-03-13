import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, NavLink, Route, Routes } from 'react-router-dom'

import Home from './Pages/Home/Home.jsx'
import Registration from  './Pages/Registration/Registration.jsx'
import LogIn from './Pages/LogIn/LogIn.jsx'
import Search from './Pages/Search/Search.jsx'

import './stylesGlobal/App.scss'

export default function App() {
  return (
    <Router>
        <Routes>
          <Route path='/' element={<Registration/>}/>
          <Route path='/login' element={<LogIn/>}/>
          <Route path='/search' element={<Search/>}/>
        </Routes>
    </Router>
  )
}

