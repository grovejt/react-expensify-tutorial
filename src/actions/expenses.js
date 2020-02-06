import uuid from "uuid";
import database from "../firebase/firebase";
import * as types from "./actionTypes";

// Sync:
//   component calls action generator
//   action generator returns object
//   component dispatches object
//   redux store changes

// Async:
//   component calls action generator
//   action generator returns function
//   component dispatches function (?)
//   function runs (has the ability to dispatch other actions and do whatever it wants)

// ADD_EXPENSE
// export const addExpense = ({ description = "", note = "", amount = 0, createdAt = 0 } = {}) => ({
//   type: "ADD_EXPENSE",
//   expense: {
//     id: uuid(),
//     description,
//     note,
//     amount,
//     createdAt
//   }
// });
export const addExpense = expense => ({
  type: types.ADD_EXPENSE,
  expense
});

export const startAddExpense = (expenseData = {}) => {
  return dispatch => {
    // set defaults:
    const { description = "", note = "", amount = 0, createdAt = 0 } = expenseData;
    const expense = { description, note, amount, createdAt };

    return database
      .collection("expenses")
      .add(expense)
      .then(function(docRef) {
        //console.log("Document written with ID: ", docRef.id);
        dispatch(addExpense({ id: docRef.id, ...expense }));
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
  };
};

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
  type: types.EDIT_EXPENSE,
  id,
  updates
});

export const setExpenses = expenses => ({
  type: types.SET_EXPENSES,
  expenses
});

export const startSetExpenses = () => {
  return dispatch => {
    return database
      .collection("expenses")
      .get()
      .then(snapshot => {
        const expensesRead = [];
        snapshot.forEach(doc => {
          // console.log(doc.id, "=", doc.data());
          expensesRead.push({ id: doc.id, ...doc.data() });
        });
        //console.log("Document written with ID: ", docRef.id);
        dispatch(setExpenses(expensesRead));
      })
      .catch(function(error) {
        console.error("Error loading expenses from database: ", error);
      });
  };
};

// REMOVE_EXPENSE
export const removeExpense = id => ({
  type: types.REMOVE_EXPENSE,
  id
});
