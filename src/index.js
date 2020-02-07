import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "./styles/style.scss";
import "react-dates/lib/css/_datepicker.css";
import App from "./App";
import { history } from "./routers/AppRouter";
import { startSetExpenses } from "./actions/expenses";
import { login, logout } from "./actions/auth";
import configureStore from "./store/configureStore";
import * as serviceWorker from "./serviceWorker";
import { firebase } from "./firebase/firebase";

//console.log("process.env", process.env);
// console.log("process.env.NODE_ENV", process.env.NODE_ENV);
// console.log("process.env.REACT_APP_FIREBASE_PROJECT_ID", process.env.REACT_APP_FIREBASE_PROJECT_ID);

const store = configureStore();

let hasRendered = false;
const renderApp = params => {
  if (!hasRendered) {
    ReactDOM.render(<App store={store} />, document.getElementById("root"));
    hasRendered = true;
  }
};

ReactDOM.render(<p>Loading...</p>, document.getElementById("root"));

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    console.log("user is logged in.", user.uid);
    store.dispatch(login(user.uid));
    store.dispatch(startSetExpenses()).then(() => {
      renderApp();
      if (history.location.pathname === "/") {
        history.push("/dashboard");
      }
    });
  } else {
    console.log("user is logged out.");
    store.dispatch(logout());
    renderApp();
    history.push("/");
  }
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
