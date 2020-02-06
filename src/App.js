import React from "react";
import { Provider } from "react-redux";
import AppRouter from "./routers/AppRouter";
import configureStore from "./store/configureStore";
// import * as ExpenseAction from "./actions/expenses";
// import "./firebase/firebase";
// import "./firebase/firebase-2";
// import "./playground/promises";

//console.log("process.env", process.env);
// console.log("process.env.NODE_ENV", process.env.NODE_ENV);
// console.log("process.env.REACT_APP_FIREBASE_PROJECT_ID", process.env.REACT_APP_FIREBASE_PROJECT_ID);

const store = configureStore();
// const state = store.getState();
// console.log(store.getState());

// store.dispatch(ExpenseAction.addExpense({ description: "Water bill", amount: 4500, createdAt: 500 }));
// store.dispatch(ExpenseAction.addExpense({ description: "Gas bill", createdAt: 1000 }));
// store.dispatch(ExpenseAction.addExpense({ description: "Rent", amount: 109500 }));

// console.log("visible expenses: ", getVisibleExpenses(store.getState().expenses, store.getState().filters));
// console.log(store.getState());

const App = props => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
};

export default App;
