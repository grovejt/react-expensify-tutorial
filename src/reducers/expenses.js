import * as types from "../actions/actionTypes";
const expensesReducerDefaultState = [];

export default (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case types.ADD_EXPENSE:
      return [...state, action.expense];
    case types.REMOVE_EXPENSE:
      console.log("reducer - remove expense", action.id);
      return state.filter(({ id }) => id !== action.id);
    case types.EDIT_EXPENSE:
      return state.map(expense => {
        if (expense.id === action.id) {
          return {
            ...expense,
            ...action.updates
          };
        } else {
          return expense;
        }
      });
    case types.SET_EXPENSES:
      //console.log("reducer - SET_EXPENSES", action);
      return action.expenses;
    default:
      return state;
  }
};
