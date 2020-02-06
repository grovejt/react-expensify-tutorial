import * as firebase from "firebase";
import expenses from "../tests/fixtures/expenses";

// Your web app's Firebase configuration
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// https://firebase.google.com/docs/firestore/manage-data/add-data?authuser=0

const database = firebase.firestore();

// expenses.forEach(expense => {
//   const { id, ...expenseWithoutId } = expense;
//   console.log("xxx", id, expense, expenseWithoutId);
//   database.collection("expenses").add({ ...expenseWithoutId });
// });

database
  .collection("expenses")
  .get()
  .then(snapshot => {
    const expensesRead = [];
    snapshot.forEach(doc => {
      // console.log(doc.id, "=", doc.data());
      expensesRead.push({ id: doc.id, ...doc.data() });
    });
    console.log("expensesRead", expensesRead);
  });

const onShapshot = database.collection("expenses").onSnapshot(snapshot => {
  // console.log(snapshot);
  const expensesRead = [];
  snapshot.forEach(doc => {
    expensesRead.push({ id: doc.id, ...doc.data() });
  });
  console.log("expensesRead from onShapshot", expensesRead);
});

const onChanged = database.collection("expenses").onSnapshot(function(snapshot) {
  snapshot.docChanges().forEach(change => {
    if (change.type === "added") {
      console.log("New expense: ", change.doc.data());
      // This is equivalent to child_added
    }
    if (change.type === "modified") {
      console.log("Modified expense: ", change.doc.data());
      // This is equivalent to child_changed
    }
    if (change.type === "removed") {
      console.log("Removed expense: ", change.doc.data());
      // This is equivalent to child_removed
    }
  });
});

// const notes = [
//   {
//     //  id: "12",
//     title: "first note",
//     body: "this is my note"
//   },
//   {
//     //  id: "12fdsf",
//     title: "another note",
//     body: "this is my other note"
//   }
// ];
// const firebaseNotes = {
//   id12: {
//     title: "first note",
//     body: "this is my note"
//   },
//   id12fdsf: {
//     title: "another note",
//     body: "this is my other note"
//   }
// };

//// replace object (create if it doesn't exist - upsert):
// database
//   .collection("second-test-collection")
//   .doc("notes")
//   .set(firebaseNotes)
//   .then(function() {
//     console.log("Document written successfully!: ");
//   })
//   .catch(function(error) {
//     console.error("Error adding document: ", error);
//   });

// notes.forEach(value => {
//   database
//     .collection("third-test-collection")
//     .doc(value.id)
//     .set({ title: value.title, body: value.body });
// });

// database
//   .collection("forth-test-collection")
//   .doc("notes")
//   .set({ notes: notes });

// notes.forEach(value => {
//   database.collection("notes").add({ title: value.title, body: value.body });
// });

// database
//   .collection("notes")
//   .doc("nojakIzOdoPwrhJli2iP")
//   .update({ body: "this is changed" });
