import React from 'react';
import { useState } from 'react';
import defaultImg from '../../img/default.png'
import './artist.scss'

export default function Artist({ item }) {
	const [src, setSrc] = useState(item.image)

	if (src === ""){
		setSrc(defaultImg)
	}

    return (
        <div className='artist'>
            <div><button className='choose_actor__button'><img className='artist_photo' src={src} alt="" /></button></div>
            <div><p className='artist_name'>{item.name}</p></div>
        </div>
    );
}