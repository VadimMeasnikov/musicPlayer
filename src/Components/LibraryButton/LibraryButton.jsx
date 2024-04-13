import React from 'react'
import './libraryButton.scss'

export default function LibraryButton() {
  return (
    <div className='library-buttons'>
        <button>Playlists</button>
        <button>Artists</button>
        <button>Albums</button>
        <button className='podcasts'>Podcasts & shows</button>
    </div>
  )
}
