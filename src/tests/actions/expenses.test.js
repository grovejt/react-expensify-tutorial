import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { startAddExpense, addExpense, editExpense, removeExpense } from "../../actions/expenses";
import expenses from "../fixtures/expenses";
import * as types from "../../actions/actionTypes";
import database from "../../firebase/firebase";

const middlewares = [thunk];
const createMockStore = configureStore(middlewares);

test("should setup remove expense action object", () => {
  const action = removeExpense("123abc");
  expect(action).toEqual({
    type: types.REMOVE_EXPENSE,
    id: "123abc"
  });
});

test("should setup edit expense action object", () => {
  const action = editExpense("123abc", { note: "New note value" });
  expect(action).toEqual({
    type: types.EDIT_EXPENSE,
    id: "123abc",
    updates: {
      note: "New note value"
    }
  });
});

test("should setup add expense action object with provided values", () => {
  const action = addExpense(expenses[2]);
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: expenses[2]
  });
});

it("should add expense to database and store", done => {
  const initialState = {};
  const store = createMockStore(initialState);

  expect.assertions(2);

  const expenseData = {
    description: "Mouse",
    note: "This one is better",
    amount: 3000,
    createdAt: 1000
  };
  store
    .dispatch(startAddExpense(expenseData))
    .then(() => {
      const actions = store.getActions();
      //console.log("actions", actions);
      expect(actions[0]).toEqual({
        type: types.ADD_EXPENSE,
        expense: {
          id: expect.any(String),
          ...expenseData
        }
      });
      return database
        .collection("expenses")
        .doc(actions[0].expense.id)
        .get();
    })
    .then(doc => {
      //console.log("doc.data()", doc.data());
      expect(doc.data()).toEqual(expenseData);
      done();
    });
});

test("should add expense with defaults to database and store", done => {
  const initialState = {};
  const store = createMockStore(initialState);

  expect.assertions(2);

  const defaultExpenseData = {
    description: "",
    note: "",
    amount: 0,
    createdAt: 0
  };
  store
    .dispatch(startAddExpense())
    .then(() => {
      const actions = store.getActions();
      //console.log("actions", actions);
      expect(actions[0]).toEqual({
        type: types.ADD_EXPENSE,
        expense: {
          id: expect.any(String),
          ...defaultExpenseData
        }
      });
      return database
        .collection("expenses")
        .doc(actions[0].expense.id)
        .get();
    })
    .then(doc => {
      //console.log("doc.data()", doc.data());
      expect(doc.data()).toEqual(defaultExpenseData);
      done();
    });
});

// test("should setup add expense action object with default values", () => {
//   const action = addExpense();
//   expect(action).toEqual({
//     type: type.ADD_EXPENSE,
//     expense: {
//       id: expect.any(String),
//       description: "",
//       note: "",
//       amount: 0,
//       createdAt: 0,
//     },
//   });
// });
