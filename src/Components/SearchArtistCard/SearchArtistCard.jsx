import React from 'react'
import './searchartistcard.scss'
import  Artist  from '../../img/artist'
export default function Searches() {
    return (
        <div className='searches_component'>
            <div className='searches_component_container'>
            <img src={Artist} alt="" className='artist_search' width={47} height={47}/>
            <div className='searches_component_info'>
              <h1>Hozier</h1>
              <h2>Artist</h2>
            </div>
            </div>
        </div>
    )
}
