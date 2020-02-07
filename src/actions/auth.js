import * as types from "./actionTypes";
import { firebase, googleAuthProvider } from "../firebase/firebase";

export const login = uid => ({ type: types.LOGIN, uid: uid });

export const logout = () => ({ type: types.LOGOUT });

export const startLogin = () => {
  return () => {
    return firebase.auth().signInWithPopup(googleAuthProvider);
  };
};

export const startLogout = () => {
  return () => {
    return firebase.auth().signOut();
  };
};
