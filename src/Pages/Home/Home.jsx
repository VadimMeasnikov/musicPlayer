import React, { useState, useEffect } from 'react';
import { useGetTrackQuery } from '../../reduxToolkit/queryApi/tracksJamendo';
import MiniCard from '../../Components/MiniCard/MiniCard';
import './home.scss';

export default function Home() {
  const { data } = useGetTrackQuery();
  const [featured, setFeatured] = useState([])

  useEffect(() => {
    if (data && data.results) {
      setFeatured(data.results);
    }
  }, [data]);

  console.log(featured)

  return (
    <div className="featuredTracks">
      {featured.map((item, index) => (
        <MiniCard key={index} item={item} />
      ))}
    </div>
  );
}
