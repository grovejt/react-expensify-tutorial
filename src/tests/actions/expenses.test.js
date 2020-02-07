import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  startAddExpense,
  addExpense,
  setExpenses,
  startEditExpense,
  startSetExpenses,
  editExpense,
  startRemoveExpense,
  removeExpense
} from "../../actions/expenses";
import expenses from "../fixtures/expenses";
import * as types from "../../actions/actionTypes";
import database, { getRefToUsersExpensesCol, getRefToUsersExpenseDoc, deleteCollection } from "../../firebase/firebase";

const middlewares = [thunk];
const createMockStore = configureStore(middlewares);

const uid = "test-uid-1";
const defaultAuthState = { auth: { uid } };

beforeEach(done => {
  deleteCollection(database, getRefToUsersExpensesCol(database, uid), 100).then(() => {
    loadInitialData(done);
  });
});
const loadInitialData = done => {
  const batch = database.batch();

  expenses.forEach(({ id, description, note, amount, createdAt }) => {
    batch.set(getRefToUsersExpenseDoc(database, uid, id), { description, note, amount, createdAt });
  });

  batch.commit().then(() => {
    done();
  });
};

test("should setup remove expense action object", () => {
  const action = removeExpense("123abc");
  expect(action).toEqual({
    type: types.REMOVE_EXPENSE,
    id: "123abc"
  });
});

test("should remove expense from firebase", done => {
  const store = createMockStore(defaultAuthState);
  const id = expenses[2].id;
  store
    .dispatch(startRemoveExpense(id))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: types.REMOVE_EXPENSE,
        id
      });
      return getRefToUsersExpenseDoc(database, uid, id).get();
    })
    .then(docSnapshot => {
      expect(docSnapshot.exists).toBe(false);
      done();
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

test("should edit expense from firebase", done => {
  const store = createMockStore(defaultAuthState);
  const id = expenses[0].id;
  const updates = { amount: 21045 };
  store
    .dispatch(startEditExpense(id, updates))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "EDIT_EXPENSE",
        id,
        updates
      });
      return getRefToUsersExpenseDoc(database, uid, id).get();
    })
    .then(doc => {
      expect(doc.data().amount).toBe(updates.amount);
      done();
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
  const store = createMockStore(defaultAuthState);

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
      return getRefToUsersExpenseDoc(database, uid, actions[0].expense.id).get();
    })
    .then(doc => {
      //console.log("doc.data()", doc.data());
      expect(doc.data()).toEqual(expenseData);
      done();
    });
});

test("should add expense with defaults to database and store", done => {
  const store = createMockStore(defaultAuthState);

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
      return getRefToUsersExpenseDoc(database, uid, actions[0].expense.id).get();
    })
    .then(doc => {
      //console.log("doc.data()", doc.data());
      expect(doc.data()).toEqual(defaultExpenseData);
      done();
    });
});

test("should setup set expense action object with data", () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type: types.SET_EXPENSES,
    expenses
  });
});

test("should fetch the expenses from firestore", done => {
  const store = createMockStore(defaultAuthState);
  expect.assertions(1);
  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: types.SET_EXPENSES,
      expenses
    });
    done();
  });
});
