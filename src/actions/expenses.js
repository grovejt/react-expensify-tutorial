// import uuid from "uuid";
import database, { getRefToUsersExpensesCol, getRefToUsersExpenseDoc } from "../firebase/firebase";

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

export const addExpense = expense => ({
  type: types.ADD_EXPENSE,
  expense
});

export const startAddExpense = (expenseData = {}) => {
  return (dispatch, getState) => {
    //console.log("uid", getState().auth.uid);
    const uid = getState().auth.uid;

    // set defaults:
    const { description = "", note = "", amount = 0, createdAt = 0 } = expenseData;
    const expense = { description, note, amount, createdAt };

    return getRefToUsersExpensesCol(database, uid)
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

export const startEditExpense = (id, updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return getRefToUsersExpenseDoc(database, uid, id)
      .update(updates)
      .then(() => {
        dispatch(editExpense(id, updates));
      });
  };
};

export const setExpenses = expenses => ({
  type: types.SET_EXPENSES,
  expenses
});

export const startSetExpenses = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return getRefToUsersExpensesCol(database, uid)
      .get()
      .then(snapshot => {
        const expensesRead = [];
        snapshot.forEach(doc => {
          expensesRead.push({ id: doc.id, ...doc.data() });
        });
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

export const startRemoveExpense = id => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return getRefToUsersExpenseDoc(database, uid, id)
      .delete()
      .then(() => {
        dispatch(removeExpense(id));
      })
      .catch(function(error) {
        console.error("Error removing expense from database: ", error);
      });
  };
};
