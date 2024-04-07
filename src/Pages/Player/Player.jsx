import React, { useEffect, useState } from 'react'
import chewronDown from '../../img/Chevron down.png'
import more from '../../img/more.png'
import track from '../../img/track.png'
import time from '../../img/Frame 372.png'
import { Back, Shuffle, Repeat, Play, Vector } from '../../img/trackFunction/index'
import { Like, Share, Radio, MoonFill, Hide, Add, Credits, Queue, View, Artist } from '../../img/modalPlayerImgs/modalIndex'
import './player.scss'




export default function Player() {

    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className='player'>
            <div className='player_container'>
                <div className={isOpen ? 'track_modal open' : 'track_modal'}>
                    <div className='track_box_modal'>

                        <img src={track} width={164} height={169} alt="" />

                        <h1>1(Remastered)</h1>
                        <h2>The Beatles</h2>
                        <div className='modal_function'>
                            <div>
                                <button><img src={Like} alt="" width={21} height={20} /></button>
                                <h1>Like</h1>
                            </div>
                            <div>
                                <button><img src={Hide} alt="" width={21} height={20} /></button>
                                <h1>Hide song</h1>
                            </div>
                            <div>
                                <button><img src={Add} alt="" width={21} height={20} /></button>
                                <h1>Add to playlist</h1>
                            </div>
                            <div>
                                <button><img src={Queue} alt="" width={21} height={20} /></button>
                                <h1>Add to queue</h1>
                            </div>
                            <div>
                                <button><img src={Share} alt="" width={21} height={20} /></button>
                                <h1>Share</h1>
                            </div>
                            <div>
                                <button><img src={Radio} alt="" width={21} height={20} /></button>
                                <h1>Go to radio</h1>
                            </div>
                            <div>
                                <button><img src={View} alt="" width={21} height={20} /></button>
                                <h1>View album</h1>
                            </div>
                            <div>
                                <button><img src={Artist} alt="" width={21} height={20} /></button>
                                <h1>View artist</h1>
                            </div>
                            <div>
                                <button><img src={Credits} alt="" width={21} height={20} /></button>
                                <h1>Song credits</h1>
                            </div>
                            <div>
                                <button><img src={MoonFill} alt="" width={21} height={20} /></button>
                                <h1>Sleep timer</h1>
                            </div>
                        </div>

                    </div>


                </div>
                <div className='player_content'>
                    <div className='upper_info'>
                        <a href=""><img src={chewronDown} alt="" height={22} width={22} /></a>
                        <h1>1(Remastered)</h1>
                        <button> <img src={more} alt="" /></button>
                    </div>
                    <img src={track} alt="" width={380} height={380} className='track_img' />
                    <div className='track_info'>
                        <div>
                            <h2 className='track_name'>From Me To You - Mono/Remastered</h2>
                            <h3 className='track_artist'>The Beatles</h3>
                        </div>
                        <img src={time} alt="" />

                    </div>
                    <div className='track_function'>
                        <img src={Shuffle} alt="" width={22} height={22} />
                        <img src={Back} alt="" width={36} height={37} />
                        <img src={Play} alt="" width={67} height={67} />
                        <img src={Back} alt="" width={36} height={37} className='vector' />
                        <img src={Repeat} alt="" width={29} height={29} />
                    </div>
                </div>

            </div>
            

        </div>


    )
}
