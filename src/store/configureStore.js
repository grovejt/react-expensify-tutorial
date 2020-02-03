import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import expensesReducer from "../reducers/expenses";
import filtersReducer from "../reducers/filters";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";

export default initialState => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    combineReducers({
      expenses: expensesReducer,
      filters: filtersReducer
    }),
    initialState,
    composeEnhancers(applyMiddleware(reduxImmutableStateInvariant()))
  );
  return store;
};
