import React from 'react'
import { useGetTrackQuery } from '../../reduxToolkit/queryApi/tracksJamendo'
import { useAuth } from '../../hooks/useAuth'

import './home.scss'




export default function Home() {
  const {data} = useGetTrackQuery()
  console.log(data)
  return (
    <div>Home</div>
  )
}
