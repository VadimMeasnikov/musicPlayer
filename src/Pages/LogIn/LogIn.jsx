import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../reduxToolkit/slices/userSlice";
import {
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useGetData } from "../../services";
import GoBackButton from "../../Components/GoBackButton/GoBackButton";
import "./login.scss";

export default function LogIn() {
  const [emailLogIn, setEmailLogIn] = useState("");
  const [passwordLogIn, setPasswordLogIn] = useState("");

  const [isError, setIsError] = useState(false);

  const auth = getAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const usersData = useGetData();

  async function logInUser(e) {
    e.preventDefault();
    if (!emailLogIn || !passwordLogIn) {
      return;
    }

    signInWithEmailAndPassword(auth, emailLogIn, passwordLogIn)
      .then((user) => {
        setEmailLogIn("");
        setPasswordLogIn("");
        // navigate('/')
      })
      .then(() => {
        const usersArray = createUsersArray();
        const userFb = auth.currentUser;
        console.log(usersArray);
        const userDb = getCurrentUser(usersArray, userFb.email);

        if (userDb) {
          console.log(userDb);
          dispatch(
            setUser({
              email: userDb.email,
              id: userDb.uid,
              username: userDb.username,
              artists: userDb.artists,
              search: userDb.search,
              news: userDb.news,
              share: userDb.share,
            })
          );
        }
        navigate("/");
      })
      .catch((e) => {
        console.error(e);
        setIsError(true);
      });
  }

  function getCurrentUser(usersArray, email) {
    const authorizedUser = usersArray.find((user) => user.email === email);
    console.log("auth succesfull");
    return authorizedUser || null;
  }

  function createUsersArray() {
    console.log(usersData);
    const usersArray = Object.entries(usersData.data).map(([key, value]) => {
      return { id: key, ...value };
    });
    return usersArray; // Возвращает массив пользователей
  }

  return (
    <div className="login">
      <GoBackButton className="go_back" />
      <div className="login_container">
        <div className="title_box_login">
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
