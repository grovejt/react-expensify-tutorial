import React from "react";
import { Provider } from "react-redux";
import AppRouter from "./routers/AppRouter";
import configureStore from "./store/configureStore";
import * as ExpenseAction from "./actions/expenses";
// import getVisibleExpenses from "./selectors/expenses";

const store = configureStore();
// const state = store.getState();
// console.log(store.getState());

store.dispatch(ExpenseAction.addExpense({ description: "Water bill", amount: 4500, createdAt: 500 }));
store.dispatch(ExpenseAction.addExpense({ description: "Gas bill", createdAt: 1000 }));
store.dispatch(ExpenseAction.addExpense({ description: "Rent", amount: 109500 }));

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
