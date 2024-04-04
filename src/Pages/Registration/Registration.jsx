import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { createUserWithEmailAndPassword,  getAuth,  onAuthStateChanged } from "firebase/auth";
import Registration_Data from '../../Components/Registration_Data/Registration_Data';
import miniLogo from '../../img/mini_logo.png'

import './registration.scss'


export default function Registration({ userObj }) {

  const { userEmail, setUserEmail, userPassword, setUserPassword, userName, setUserName, userNews, setUserNews,
  userShare, setUserShare } = userObj;

  const [isRegistration, setIsRegistration] = useState(false)
  const regState = { isRegistration, setIsRegistration }


  return (
    <div className='registration'>
      <div className="registration_content"></div>
      {isRegistration ?
        (<Registration_Data regState={regState} userObj={userObj} />)
        :
        (<div className='reg'>
          <div className="reg_container">
            <div className="title_box">
              <h1 className='reg_page__title'>Millions of Songs. Free on Music Player.</h1>
              <img className='mini_logo' src={miniLogo} alt="logo" />
            </div>
            <div className="reg_funct_box">
              <button
                onClick={() => { setIsRegistration(true) }}
                className='sign_up__btn'>
                Sign Up Free
              </button>
              <Link to='/login' className='log_in__link'>Log In</Link>
            </div>
          </div>

        </div>)

      }
    </div>
  )
}
