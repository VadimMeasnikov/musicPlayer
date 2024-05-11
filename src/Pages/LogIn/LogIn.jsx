import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../reduxToolkit/slices/userSlice";
import { setArtists } from "../../reduxToolkit/slices/userArtistsSlice";
import { setKey } from "../../reduxToolkit/slices/userKeySlice";
import {
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import leftArrow from '../../img/ChevronLeft.png'
import { Link, useNavigate } from "react-router-dom";
import { getAllUsersData } from "../../services";

import GoBackButton from "../../Components/GoBackButton/GoBackButton";
import "./login.scss";


export default function LogIn() {
  const [emailLogIn, setEmailLogIn] = useState("");
  const [passwordLogIn, setPasswordLogIn] = useState("");

  const [isError, setIsError] = useState(false);

  const auth = getAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { dataUsers, isLoading } = getAllUsersData();

  async function logInUser(e) {
    e.preventDefault();
    if (!emailLogIn || !passwordLogIn) {
      return;
    }

    signInWithEmailAndPassword(auth, emailLogIn, passwordLogIn)
      .then(() => {
        getAllUsersData()
          .then((data) => {
            const usersArray = createUsersArray(data);
            console.log(usersArray);
            return usersArray
          })
          .then((array) => {
            const userFb = auth.currentUser;
            const userDb = getCurrentUser(array, userFb.email);
            return userDb
          })
          .then((userDb) => {
            if (userDb) {
              console.log(userDb);
              dispatch(
                setUser({
                  email: userDb.email,
                  id: userDb.uid,
                  username: userDb.username,
                  news: userDb.news,
                  share: userDb.share,
                })
              );
              dispatch(
                setKey({
                  key: userDb.key
                })
              )

              const artistsArr = JSON.parse(userDb.artists)
              console.log(typeof artistsArr);
              artistsArr.map((artist, key) => {
                console.log(artist);
                dispatch(setArtists(artist));
                return artist;
              })

            }
          })
        navigate("/");
      })
      .catch((e) => {
        console.error(e);
        setIsError(true);
      });
  }

  function getCurrentUser(usersArray, email) {
    const authorizedUser = usersArray.find((user) => user.email === email);
    console.log(authorizedUser);
    console.log("auth succesfull");
    return authorizedUser || null;
  }

  function createUsersArray(usersObj) {
    console.log(usersObj);
    const usersArray = Object.entries(usersObj).map(([key, value]) => {
      return { id: key, ...value };
    });
    return usersArray; // Возвращает массив пользователей
  }

  return (
    <div className="login">
      <div className="login_container">
        <div className="title_box_login">
        <Link to='/registration' className="go_back__btn_log"><img src={leftArrow} alt="" /></Link>
          <h1 className="title_text_login">Log In</h1>
        </div>
        <form onSubmit={(e) => logInUser(e)} className="login_user_form">
          <div className="user_data__box">
            <label className="user_data_label">Please, enter your email</label>
            <input
              className="user_data_input"
              value={emailLogIn}
              onChange={(e) => {
                setEmailLogIn(e.target.value);
                setIsError(false);
              }}
              type="email"
            />
          </div>
          <div className="user_data__box">
            <label className="user_data_label">
              Please, enter your password
            </label>
            <input
              className="user_data_input"
              value={passwordLogIn}
              onChange={(e) => {
                setPasswordLogIn(e.target.value);
                setIsError(false);
              }}
              type="password"
            />
          </div>
          <button type="submit" className="login_user__btn">
            Log In
          </button>
        </form>
      </div>
      {isError && (
        <div className="popUp">
          <p className="error_text">
            This email and password combination is incorrect.
          </p>
        </div>
      )}
    </div>
  );
}
