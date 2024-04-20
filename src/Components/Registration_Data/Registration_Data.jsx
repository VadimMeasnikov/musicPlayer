import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, getAuth, updateProfile } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { setUser } from '../../reduxToolkit/slices/userSlice';
import { useAddData } from '../../services';
import arrow from '../../img/Chevron left.png'

import './registration_data.scss'



export default function Registration_Data({ regState, userObj }) {

  const [userState, setUserState] = useState('')
  const [isError, setIsError] = useState(false)

  const {
    userEmail, setUserEmail,
    userPassword, setUserPassword,
    userName, setUserName,
    userNews, setUserNews,
    userShare, setUserShare
  } = userObj;

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const auth = getAuth()

  const addData = useAddData()



  async function createUser(event) {
    event.preventDefault();

    if (!userName || !userEmail || !userPassword) {
      return
    }

    // console.log('create user');

    createUserWithEmailAndPassword(auth, userEmail, userPassword)
      .then((user) => {
        setUserState(user)
        console.log(user.user.uid);
        dispatch(setUser({
          email: userEmail,
          id: user.user.uid,
          username: userName,
          news: userNews,
          share: userShare,
          search: [],
          artists: []
        }))

        setUserEmail('')
        setUserPassword('')
        setUserName('')
        setUserShare(false)
        setUserNews(false)

        navigate('/artists')
        return user
      })
      .then(() => {
        addDataUser()
      })
      .catch((e) => {
        setIsError(true)
      })
  }

  function addDataUser() {
    console.log('start add data');

    const user = auth.currentUser;
    const userObj = {
      email: userEmail,
      id: user.uid,
      username: userName,
      news: userNews,
      share: userShare,
      search: false,
      artists: false
    }
    addData.mutate(userObj)
    console.log(userObj);
    console.log('end add data');
  }



  return (
    <div className='registration_data'>
      <div className="registration_data__container">
        <div className="title_box__reg_data">

          <button className='go_back__button' onClick={() => regState.setIsRegistration(false)}><img src={arrow} alt="" /></button>

          <h1 className='create_account__title'>Create account</h1>
        </div>
        <form className="create_account__content" onSubmit={(event) => { createUser(event) }}>

          <div className="user_data__box">
            <label className={isError ? 'error_label' : 'user_data_label'}>Please, enter your email</label>
            <input className={isError ? 'error_input' : 'user_data_input'} value={userEmail} onChange={(e) => { setUserEmail(e.target.value); setIsError(false) }} type="email" />
            <label className='user_data_info'>You’ll need to confirm this email later.</label>
          </div>
          <div className="user_data__box">
            <label className={isError ? 'error_label' : 'user_data_label'}>Create your password</label>
            <input className={isError ? 'error_input' : 'user_data_input'} value={userPassword} onChange={(e) => { setUserPassword(e.target.value); setIsError(false) }} type="password" />
            <label className='user_data_info'>Use atleast 8 characters.</label>
          </div>
          <div className="user_data__box">
            <label className={isError ? 'error_label' : 'user_data_label'}>Please, enter your username</label>
            <input className={isError ? 'error_input' : 'user_data_input'} value={userName} onChange={(e) => { setUserName(e.target.value); setIsError(false) }} type="text" />
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
                <input className='user_extra__inp' value={userNews} checked={userNews} onChange={(e) => { setUserNews(!userNews) }} type="checkbox" />
              </div>
              <div className="user_extra">
                <p className='user_extra__text'>Share my registration data with Spotify’s content providers for marketing purposes.</p>
                <input className='user_extra__inp' value={userNews} checked={userShare} onChange={(e) => { setUserShare(!userShare) }} type="checkbox" />
              </div>
            </div>
          </div>
          <button disabled={isError} className='create_user__btn' type='submit'>Create an account</button>
          {isError && <div className='error_box_extra'><p className='error_box_extra_text'>Упс! Видимо вы уже зарегистрированы</p></div>}
        </form>
      </div>
    </div>
  )
}











