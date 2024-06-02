import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../../reduxToolkit/slices/userSlice";
import { setKey } from "../../reduxToolkit/slices/userKeySlice";
import { useAddData, useEditData } from "../../services";
import leftArrow from '../../img/ChevronLeft.png'

import "./registration_data.scss";

export default function Registration_Data({ regState, userObj }) {
  const [userState, setUserState] = useState("");
  const [isError, setIsError] = useState(false);

  const {
    userEmail,
    setUserEmail,
    userPassword,
    setUserPassword,
    userName,
    setUserName,
    userNews,
    setUserNews,
    userShare,
    setUserShare,
  } = userObj;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth();
  const editData = useEditData()
  const addData = useAddData();

  async function createUser(event) {
    event.preventDefault();

    if (!userName || !userEmail || !userPassword) {
      setIsError(true)
      return;
    }



    createUserWithEmailAndPassword(auth, userEmail, userPassword)
      .then((user) => {
        setUserState(user);
        dispatch(
          setUser({
            email: userEmail,
            id: user.user.uid,
            username: userName,
            news: userNews,
            share: userShare,
            search: [],
            // artists: [],
          })
        );

        setUserEmail("");
        setUserPassword("");
        setUserName("");
        setUserShare(false);
        setUserNews(false);

        navigate("/artists");
        return user;
      })
      .then(() => {
        addDataUser();
      })
      .catch((e) => {
        setIsError(true);
        console.error(e);
      });
  }
  async function addDataUser() {

    const user = auth.currentUser;
    const userObj = {
      email: userEmail,
      id: user.uid,
      username: userName,
      news: userNews,
      share: userShare,
      search: false,
      artists: false,
      key: false,
      liked: false,
    };

    const userKey = await addData.mutateAsync(userObj);
    dispatch(
      setKey({
        key: userKey,
      })
    );
    updateProfile(user, {
      displayName: userKey
    })
      .catch((e) => console.error(e))

    const field = 'key'
    editData.mutate({ id: userKey, field, updateData: userKey })
  }



  return (
    <div className="registration_data">


      <div className="registration_data__container">
        <div className="title_box__reg_data">
          <button onClick={() => regState.setIsRegistration(false)} className="go_back__btn_reg"><img src={leftArrow} alt="" /></button>
          <h1 className="create_account__title">Create account</h1>
        </div>
        <form
          className="create_account__content"
          onSubmit={(event) => {
            createUser(event);
          }}
        >
          <div className="user_data__box">
            <label className={isError ? ("error_label") : ("user_data_label")} >
              What's your email?
            </label>
            <input
              className={isError ? ("error_input") : ("user_data_input")}
              value={userEmail}
              name='email'
              onChange={(e) => {
                setUserEmail(e.target.value);
                setIsError(false);
              }}
              type="email"
            />
            <label className="user_data_info">
              You’ll need to confirm this email later.
            </label>
          </div>
          <div className="user_data__box">
            <label className={isError ? ("error_label") : ("user_data_label")} >
              Create a password
            </label>
            <input
              name='password'
              className={isError ? ("error_input") : ("user_data_input")}
              value={userPassword}
              onChange={(e) => {
                setUserPassword(e.target.value);
                setIsError(false);
              }}
              type="password"
            />
            <label className="user_data_info">Use at least 6 characters.</label>
          </div>
          <div className="user_data__box">
            <label className={isError ? ("error_label") : ("user_data_label")} >
              What's your name?
            </label>
            <input
              name='username'
              className={isError ? ("error_input") : ("user_data_input")}
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
                setIsError(false);
              }}
              type="text"
            />
            <label className="user_data_info">
              This appears on your Spotify profile.
            </label>
          </div>

          <div className="user_terms">
            <p className="user_terms__text">
              By creating an account, you agree to Music Player's
              <Link to="*" className="terms_link">
                Terms and Conditions of Use
              </Link>
            </p>

            <p className="user_terms__text">
              {" "}
              To learn more about how Spotify collect, uses, shares and protects
              your personal data, please read Music Player's
              <Link to="*" className="terms_link">
                Privacy Policy
              </Link>
            </p>

            <div className="extra_box">
              <div className="user_extra">
                <p className="user_extra__text">
                  Please send me news and offers from Music Player.
                </p>
                <input
                  className="user_extra__inp"
                  value={userNews}
                  checked={userNews}
                  onChange={(e) => {
                    setUserNews(!userNews);
                  }}
                  type="checkbox"
                />
              </div>
              <div className="user_extra">
                <p className="user_extra__text">
                  Share my registration data with Music Player's content providers
                  for marketing purposes.
                </p>
                <input
                  className="user_extra__inp"
                  value={userNews}
                  checked={userShare}
                  onChange={(e) => {
                    setUserShare(!userShare);
                  }}
                  type="checkbox"
                />
              </div>
            </div>
          </div>
          <button disabled={isError} className="create_user__btn" type="submit">
            Create an account
          </button>
        </form>
      </div>
    </div>
  );
}
