import React from 'react'

import ChevronLeft from "../../img/ChevronLeft.png"
import userSettings from "../../img/userSettings.png"
import ChevronRight from "../../img/ChevronRight.png"
import Navigation from "../../Components/Navigation/Navigation"
import GoBackButton from '../../Components/GoBackButton/GoBackButton'
import "./settings.scss"

export default function Settings({modalArr}) {
    const {isSettings, setIsSettings} = modalArr
    return (
        <>
            <div className="header">
                <div className="header-components">
                    <button className='go_back__btn' onClick={() => setIsSettings(false)}> <img src={ChevronLeft} alt="" /></button>                  
                    <h1>Settings</h1>
                </div>
            </div>
            <main>
                <div className="Settings-profile">
                    <div className="Settings-profile-information">
                        <img src={userSettings} alt="" />
                        <div className="Settings-profile-text">
                            <p className='name'>maya</p>
                            <p className='view'>View Profile</p>
                        </div>
                    </div>
                    <img className='user-chevronRight' src={ChevronRight} alt="" />
                </div>
                <div className="settings">
                    <div className="settings-user">
                        <p>Account</p>
                        <img src={ChevronRight} alt="" />
                    </div>
                    <div className="settings-user">
                        <p>Data Saver</p>
                        <img src={ChevronRight} alt="" />
                    </div>
                    <div className="settings-user">
                        <p>Languages</p>
                        <img src={ChevronRight} alt="" />
                    </div>
                    <div className="settings-user">
                        <p>Playback</p>
                        <img src={ChevronRight} alt="" />
                    </div>
                    <div className="settings-user">
                        <p>Explicit Content</p>
                        <img src={ChevronRight} alt="" />
                    </div>
                    <div className="settings-user">
                        <p>Devices</p>
                        <img src={ChevronRight} alt="" />
                    </div>
                    <div className="settings-user">
                        <p>Car</p>
                        <img src={ChevronRight} alt="" />
                    </div>
                    <div className="settings-user">
                        <p>Social</p>
                        <img src={ChevronRight} alt="" />
                    </div>
                    <div className="settings-user">
                        <p>Voice Assistant & Apps</p>
                        <img src={ChevronRight} alt="" />
                    </div>
                    <div className="settings-user">
                        <p>Audio Quality</p>
                        <img src={ChevronRight} alt="" />
                    </div>
                    <div className="settings-user">
                        <p>Storage</p>
                        <img src={ChevronRight} alt="" />
                    </div>
                </div>
                <Navigation />
            </main>
        </>
    )
}
