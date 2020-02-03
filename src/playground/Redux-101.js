import React from "react";
import { createStore } from "redux";

const myReducer = (state = { count: 0 }, action) => {
  // debugger;
  switch (action.type) {
    case "INCREMENT": {
      const incrementBy = typeof action.incrementBy == "number" ? action.incrementBy : 1;
      return { count: state.count + incrementBy };
    }
    case "DECREMENT": {
      const decrementBy = typeof action.decrementBy == "number" ? action.decrementBy : 1;
      return { count: state.count - decrementBy };
    }
    case "SET": {
      return { count: action.count };
    }
    case "RESET": {
      return { count: 0 };
    }
    default:
      return state;
  }
};
const store = createStore(myReducer);

const unsubscribe = store.subscribe(() => {
  console.log("subscribe called", store.getState());
});

const TestApp = () => {
  console.log("store", store);
  console.log("getState", store.getState());
  store.dispatch(generateAction("INCREMENT", { incrementBy: 3 }));
  store.dispatch(inc);
  //unsubscribe();
  store.dispatch(inc);
  store.dispatch(dec);
  store.dispatch(res);
  console.log("getState", store.getState());
  return <p>test app</p>;
};

const generateAction = (actionType, { incrementBy = 1, decrementBy = 1, count = 0 } = {}) => {
  const action = {
    type: actionType,
    incrementBy: incrementBy,
    decrementBy: decrementBy,
    count: count
  };
  return action;
};
// Actions: incrementCount, decrementCount, resetCount
const inc = {
  type: "INCREMENT",
  incrementBy: 5
};
const dec = {
  type: "DECREMENT",
  decrementBy: 3
};
const res = {
  type: "RESET"
};

export default TestApp;
