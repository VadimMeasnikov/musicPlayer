<<<<<<< HEAD
import React, { useEffect } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { setUser, removeUser } from '../../reduxToolkit/slices/userSlice'
import { useDispatch, useSelector } from 'react-redux'
=======
import React from 'react'
>>>>>>> dfc7188721cb60fb92ce67104eab82ca2c9e5834
import { useGetTrackQuery } from '../../reduxToolkit/queryApi/tracksJamendo'
import { useAuth } from '../../hooks/useAuth'

import './home.scss'




export default function Home() {

  // const auth = getAuth()
  // const dispatch = useDispatch()
  // const navigate = useNavigate()

  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       dispatch(setUser({
  //         email: user.email,
  //         id: user.uid,
  //         password: null,
  //         username: user.displayName,
  //         news: null,
  //         share: null
  //       }))
  //     } else {
  //       navigate('/registration')
  //     }
  //   })
  // }, [])

  return (
    <div>Home</div>
  )
}
