import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";
import Registration_Data from "../../Components/Registration_Data/Registration_Data";
import miniLogo from "../../img/spotifyLogo.png";
import googleLogo from "../../img/googleLogo.png"
import facebookLogo from "../../img/facebookLogo.png"
import { FcMusic } from "react-icons/fc";
import "./registration.scss";

export default function Registration() {

  const [userEmail, setUserEmail] = useState()
  const [userPassword, setUserPassword] = useState()
  const [userName, setUserName] = useState()
  const [userNews, setUserNews] = useState()
  const [userShare, setUserShare] = useState()

  const userObj = {
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
  }
  const [isRegistration, setIsRegistration] = useState(false);
  const regState = { isRegistration, setIsRegistration };

  return (
    <div className="registration">
      {/* <div className="registration_content"></div> */}
      {isRegistration ? (
        <Registration_Data regState={regState} userObj={userObj} />
      ) : (
        <div className="reg">
          <div className="reg_container">
            <div className="title_box">
              <FcMusic color="#1ed760" className="mini_logo"/>
              <h1 className="reg_page__title">
                Millions of Songs.<br></br>Free on Music Player.
              </h1>
            </div>
            <div className="reg_funct_box">
              <button
                onClick={() => {
                  setIsRegistration(true);
                }}
                className="sign_up__btn"
              >
                Sign up free
              </button>
              <button className="regGoogleBtn">
                <p>Continue with Google</p>
                <img src={googleLogo} alt="google" />
              </button>
              <button className="regFacebookBtn">
                <p>Continue with Facebook</p>
                <img src={facebookLogo} alt="facebook" />
              </button>
              <Link to="/login" className="log_in__link">
                Log In
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
