import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from '../../reduxToolkit/slices/userSlice'
import { getAuth, signInWithEmailAndPassword, updateProfile } from "firebase/auth"
import { useNavigate } from 'react-router-dom'
import GoBackButton from '../../Components/GoBackButton/GoBackButton'

import './login.scss'


export default function LogIn() {

  const [emailLogIn, setEmailLogIn] = useState('')
  const [passwordLogIn, setPasswordLogIn] = useState('')

  const [isError, setIsError] = useState(false)

  const auth = getAuth()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  async function logInUser(e) {
    e.preventDefault()

    if (!emailLogIn || !passwordLogIn) {
      return
    }



    signInWithEmailAndPassword(auth, emailLogIn, passwordLogIn)
      .then((user) => {
        console.log('login user');
        dispatch(setUser({
          email: user.email,
          password: user.password,
          username: user.displayName,
        }))

        setEmailLogIn('')
        setPasswordLogIn('')

        navigate('/')
      })
      .catch((e) => {
        setIsError(true)
      }
      )
  }



  return (
    <div className='login'>
      <div className="login_container">
        <div className="title_box_login">
          <GoBackButton className='go_back' />
          <h1 className='title_text_login'>Log In</h1>
        </div>
        <form onSubmit={(e) => logInUser(e)} className='login_user_form'>
          <div className="user_data__box">
            <label className={isError ? 'error_label' : 'user_data_label'}>Please, enter your email</label>
            <input className={isError ? 'error_input' : 'user_data_input'} value={emailLogIn} onChange={(e) => {setEmailLogIn(e.target.value); setIsError(false)}} type="email" />
          </div>
          <div className='user_data__box' >
            <label className={isError ? 'error_label' : 'user_data_label'}>Please, enter your password</label>
            <input className={isError ? 'error_input' : 'user_data_input'} value={passwordLogIn} onChange={(e) => {setPasswordLogIn(e.target.value); setIsError(false)}} type="password" />
          </div>
          {isError && <div className='error_box_extra'><p className='error_box_extra_text'>Неверная почта или ароль</p></div>}
          <button type='submit' className='login_user__btn'>Log In</button>
        </form>
      </div>
    </div>
  )
}
