import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "./styles/style.scss";
import "react-dates/lib/css/_datepicker.css";
import App from "./App";
import { startSetExpenses } from "./actions/expenses";
import configureStore from "./store/configureStore";
import * as serviceWorker from "./serviceWorker";

//console.log("process.env", process.env);
// console.log("process.env.NODE_ENV", process.env.NODE_ENV);
// console.log("process.env.REACT_APP_FIREBASE_PROJECT_ID", process.env.REACT_APP_FIREBASE_PROJECT_ID);

const store = configureStore();

ReactDOM.render(<p>Loading...</p>, document.getElementById("root"));

store.dispatch(startSetExpenses()).then(() => {
  ReactDOM.render(<App store={store} />, document.getElementById("root"));
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
