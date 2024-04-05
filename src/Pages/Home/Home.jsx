import React  from 'react'
import { useGetTrackQuery } from '../../reduxToolkit/queryApi/tracksJamendo'


import './home.scss'





export default function Home() {

  const {data} = useGetTrackQuery()
  console.log(data)


  return (
    <div className="featuredTracks">
      {featured.map((item, index) => (
        <MiniCard key={index} item={item} />
      ))}
    </div>
  );
}
