import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import { BrowserRouter } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import Weekly from "main/Weekly";

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
ReactDOM.render(
  <BrowserRouter>
    <Weekly />
  </BrowserRouter>,
  document.getElementById("root")
);
serviceWorker.unregister();
