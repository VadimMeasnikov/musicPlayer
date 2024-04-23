import React from 'react';
import { useState } from 'react';
import defaultImg from '../../img/default.png'
import chosenActor from '../../img/chosen.png'
import './artist.scss'


export default function Artist({ item, onSelect }) { 
    const [src, setSrc] = useState(item.image)
    const handleArtistClick = () => {
        if(src !== chosenActor){
            setSrc(chosenActor)
        } else {
            setSrc(item.image)
        }
        onSelect(item);    
    };

    if (src === ""){
        setSrc(defaultImg)
    }
    
    return (
        <div className='artist' onClick={handleArtistClick}>
            <div><button className='choose_actor__button' ><img className='artist_photo' src={src} alt="" /></button></div>
            <div><p className='artist_name'>{item.name}</p></div>
        </div>
    );
}