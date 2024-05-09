import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {QueryClient, QueryClientProvider} from 'react-query'
import config from "../config.js";
import { Provider } from "react-redux";
import { store } from './reduxToolkit/store.js'
import "./stylesGlobal/index.scss";
import { getStorage } from "firebase/storage";


initializeApp (config);

export const imageDb = getStorage(initializeApp(config))

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client = {new QueryClient()}>
    <Provider store={store}>
      <App />
    </Provider>
    </QueryClientProvider>
);


