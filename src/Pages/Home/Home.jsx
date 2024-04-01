import React, { useEffect } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { setUser, removeUser } from '../../reduxToolkit/slices/userSlice'

import { useDispatch, useSelector } from 'react-redux'
import { useGetTrackQuery } from '../../reduxToolkit/queryApi/tracksJamendo'
import { useAuth } from '../../hooks/useAuth'

import './home.scss'




export default function Home() {
  // const {data} = useGetTrackQuery()
  // console.log(data)
  const auth = getAuth()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const getUser = useAuth()
  console.log(getUser)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser({
          email: user.email,
          password: null,
          username: user.displayName,
          news: null,
          share: null
        }))
      } else {
        navigate('/registration')
      }
    })
  })

  return (
    <div>
      <button onClick={() => {
          dispatch(removeUser())
          navigate('/registration')
      }}>Log out</button>
    </div>
  )
}
