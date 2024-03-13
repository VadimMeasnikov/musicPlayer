import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

import arrow from '../../img/Chevron left.png'

import './registration_data.scss'

export default function Registration_Data({ regState }) {
  return (
    <div className='registration_data'>
      <div className="registration_data__container">
        <div className="title_box__reg_data">
          <button onClick={() => {
            regState.setIsRegistration(false)
          }} className='back__btn'> <img src={arrow} alt="" /> </button>
          <h1 className='create_account__title'>Create account</h1>
        </div>
        <form className="create_account__content">

          <div className="user_data__box">
            <label className='user_data_label'>What’s your email?</label>
            <input className='user_data_input' type="email" />
            <label className='user_data_info'>You’ll need to confirm this email later.</label>
          </div>
          <div className="user_data__box">
            <label className='user_data_label'>Create a password</label>
            <input className='user_data_input' type="password" />
            <label className='user_data_info'>Use atleast 8 characters.</label>
          </div>
          <div className="user_data__box">
            <label className='user_data_label'>What’s your name?</label>
            <input className='user_data_input' type="text" />
            <label className='user_data_info'>This appears on your spotify profile</label>
          </div>

          <div className="user_terms">
            <p className='user_terms__text'>By tapping on “Create account”, you agree to the spotify Terms of Use.</p>
            <Link to='*' className='terms_link'>Terms of Use</Link>

            <p className='user_terms__text'> To learn more about how Spotify collect, uses, shares and protects your personal data, Please see the Spotify Privacy Policy.</p>
            <Link to='*' className='terms_link'>Privacy Policy</Link>

            <div className="extra_box">
              <div className="user_extra">
                <p className='user_extra__text'>
                  Please send me news and offers from Spotify.</p>
                <input className='user_extra__inp' type="checkbox" />
              </div>
              <div className="user_extra">
                <p className='user_extra__text'>Share my registration data with Spotify’s content providers for marketing purposes.</p>
                <input className='user_extra__inp' type="checkbox" />
              </div>
            </div>
          </div>
          <button className='create_user__btn' type='button'>Create an account</button>
        </form>
      </div>
    </div>
  )
}
