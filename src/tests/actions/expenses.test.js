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
import database from "../../firebase/firebase";

const middlewares = [thunk];
const createMockStore = configureStore(middlewares);

beforeEach(done => {
  deleteCollection(database, "expenses", 100).then(() => {
    loadInitialData(done);
  });
});

const loadInitialData = done => {
  const batch = database.batch();

  expenses.forEach(({ id, description, note, amount, createdAt }) => {
    batch.set(database.collection("expenses").doc(id), { description, note, amount, createdAt });
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
  //const store = createMockStore(defaultAuthState);
  const store = createMockStore({});
  const id = expenses[2].id;
  store
    .dispatch(startRemoveExpense(id))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: types.REMOVE_EXPENSE,
        id
      });
      //return database.ref(`users/${uid}/expenses/${id}`).once("value");
      return database
        .collection("expenses")
        .doc(id)
        .get();
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
  //const store = createMockStore(defaultAuthState);
  const store = createMockStore({});
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
      //return database.ref(`users/${uid}/expenses/${id}`).once("value");
      return database
        .collection("expenses")
        .doc(id)
        .get();
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

test("should setup set expense action object with data", () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type: types.SET_EXPENSES,
    expenses
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

test("should fetch the expenses from firestore", done => {
  const initialState = {};
  const store = createMockStore(initialState);
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

const deleteCollection = (db, collectionPath, batchSize) => {
  let collectionRef = db.collection(collectionPath);
  let query = collectionRef.orderBy("__name__").limit(batchSize);

  return new Promise((resolve, reject) => {
    deleteQueryBatch(db, query, batchSize, resolve, reject);
  });
};

const deleteQueryBatch = (db, query, batchSize, resolve, reject) => {
  query
    .get()
    .then(snapshot => {
      // When there are no documents left, we are done
      if (snapshot.size == 0) {
        return 0;
      }

      // Delete documents in a batch
      let batch = db.batch();
      snapshot.docs.forEach(doc => {
        batch.delete(doc.ref);
      });

      return batch.commit().then(() => {
        return snapshot.size;
      });
    })
    .then(numDeleted => {
      if (numDeleted === 0) {
        resolve();
        return;
      }

      // Recurse on the next process tick, to avoid
      // exploding the stack.
      process.nextTick(() => {
        deleteQueryBatch(db, query, batchSize, resolve, reject);
      });
    })
    .catch(reject);
};
