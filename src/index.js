import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "./styles/style.scss";
import "react-dates/lib/css/_datepicker.css";
import App from "./App";
// import AppRouter from "./routers/AppRouter";
// import TestApp from "./playground/Redux-101";
import * as serviceWorker from "./serviceWorker";

// ReactDOM.render(<TestApp />, document.getElementById("root"));
// ReactDOM.render(<AppRouter />, document.getElementById("root"));
ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
