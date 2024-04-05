import React, { useState, useEffect } from 'react';
import { useGetTrackQuery } from '../../reduxToolkit/queryApi/tracksJamendo';
import MiniCard from '../../Components/MiniCard/MiniCard';
import { useDispatch } from 'react-redux';
import { setUser } from '../../reduxToolkit/slices/userSlice';
import {  useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import './home.scss';



export default function Home() {
  const { data } = useGetTrackQuery();
  const [featured, setFeatured] = useState([])

  useEffect(() => {
    if (data && data.results) {
      setFeatured(data.results);
    }
  }, [data]);

  const auth = getAuth()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser({
          email: user.email,
          id: user.uid,
          password: null,
          username: user.displayName,
          news: null,
          share: null
        }))
      } else {
        navigate('/registration')
      }
    })
  }, [])

  console.log(featured)

  return (
    <div className="featuredTracks">
      {featured.map((item, index) => (
        <MiniCard key={index} item={item} />
      ))}
    </div>
  );
}
