import React, { useEffect, useState } from 'react'
import chewronDown from '../../img/Chevron down.png'
import more from '../../img/more.png'
import track from '../../img/track.png'
import time from '../../img/Frame 372.png'
import { Back, Shuffle, Vector } from '../../img/trackFunction/index'
import { Like, Share, Radio, MoonFill, Hide, Add, Credits, Queue, View, Artist } from '../../img/modalPlayerImgs/modalIndex'
import { useNavigate } from 'react-router-dom'
import { LiaPauseSolid } from "react-icons/lia";
import { GrPlay } from "react-icons/gr";
import { LiaPlaySolid } from "react-icons/lia";
import { RxPlay } from "react-icons/rx";

import repeat_active  from '../../img/trackFunction/Repeat.png'
import repeat from '../../img/media-playlist-repeat.png'

import './player.scss'





export default function Player() {

    const [isOpen, setIsOpen] = useState(false)
    const [isPlay, setIsPlay] = useState(false)
    const [repeatState, setRepeatState] = useState(false)

    const navigate = useNavigate()
    const goBackBtn = () => {
        navigate(-1)
    }

    function handleControlTrack(){
        setIsPlay(pr => !pr)
    }

    function handleRepeatControl(){
        setRepeatState(pr => !pr)
    }


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
                                <button><img src={Like} alt="" width={21} height={20} />Like</button>

                            </div>
                            <div>
                                <button><img src={Hide} alt="" width={21} height={20} />Hide song</button>

                            </div>
                            <div>
                                <button><img src={Add} alt="" width={21} height={20} />Add to playlist</button>
                            </div>
                            <div>
                                <button><img src={Queue} alt="" width={21} height={20} />Add to queue</button>
                            </div>
                            <div>
                                <button><img src={Share} alt="" width={21} height={20} />Share</button>
                            </div>
                            <div>
                                <button><img src={Radio} alt="" width={21} height={20} />Go to radio</button>
                            </div>
                            <div>
                                <button><img src={View} alt="" width={21} height={20} />View album</button>
                            </div>
                            <div>
                                <button><img src={Artist} alt="" width={21} height={20} />View artist</button>
                            </div>
                            <div>
                                <button><img src={Credits} alt="" width={21} height={20} />Song credits</button>
                            </div>
                            <div>
                                <button><img src={MoonFill} alt="" width={21} height={20} />Sleep timer</button>
                            </div>

                        </div>
                        <button onClick={() => { setIsOpen(pr => !pr) }}>Close</button>
                    </div>


                </div>
                <div className='player_content'>
                    <div className='upper_info'>
                        <button className='go_back__btn' onClick={() => { goBackBtn() }}><img src={chewronDown} alt="" height={22} width={22} /></button>
                        <h1>1(Remastered)</h1>
                        <button onClick={() => { setIsOpen(pr => !pr) }}> <img src={more} alt="" /></button>
                    </div>
                    <img src={track} alt="" width={380} height={380} className='track_img' />
                    <div className='track_info'>
                        <div className="track_content_1">
                        <div className='track_info_content'>
                            <div className="marquee-container"><h2 className='track_name'>Вгьи</h2></div>                          
                            <h3 className='track_artist'>The Beatles</h3>
                        </div>
                        <div className="track_content_2">
                            <button className='add_fav_song_btn'><img src={Like} alt="" /></button>
                        </div>
                        </div>                    
                        <img src={time} alt="" />
                    </div>
                    <div className='track_function'>
                        <button className='track_function__btn shuffle'> <img src={Shuffle} alt="" width={22} height={22} /></button>
                        <button className='track_function__btn prev_track'> <img src={Back} alt="" width={36} height={37} /></button>
                        {isPlay ? 
                            (
                                <button onClick={() => handleControlTrack()} className='track_function__btn play'>
                                   <LiaPauseSolid id='stop'/>
                                </button>
                            )
                            :
                            (
                                <button onClick={() => handleControlTrack()} className='track_function__btn play'>
                                    < RxPlay  id='start'/>
                                </button>
                            )}
                        {/* <button className='track_function__btn play'> <img src={Play} alt="" width={67} height={67} /></button> */}
                        <button className='track_function__btn next_track'> <img src={Back} alt="" width={36} height={37} className='vector' /></button>
                        <button onClick={() => handleRepeatControl()} className='track_function__btn repeat'>
                            {repeatState ? 
                            (<img className='repeat_img' src={repeat_active} alt="" />)
                            :
                            (<img className='repeat_img' src={repeat} alt="" />)
                            }                           
                        </button>
                    </div>
                </div>

            </div>


        </div>


    )
}
