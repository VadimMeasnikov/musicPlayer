import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {initializeApp } from "firebase/app";

import config from "../config.js";
import { Provider } from "react-redux";
import { store } from './reduxToolkit/store.js'
import "./stylesGlobal/index.scss";



initializeApp (config);

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
      <App />
    </Provider>
);
