// import * as firebase from "firebase";
// import expenses from "../tests/fixtures/expenses";

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
//   measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// firebase.analytics();

// https://firebase.google.com/docs/firestore/manage-data/add-data?authuser=0

// const database = firebase.firestore();

// expenses.forEach(expense => {
//   const { id, ...expenseWithoutId } = expense;
//   console.log("xxx", id, expense, expenseWithoutId);
//   database.collection("expenses").add({ ...expenseWithoutId });
// });

// database
//   .collection("expenses")
//   .get()
//   .then(snapshot => {
//     const expensesRead = [];
//     snapshot.forEach(doc => {
//       // console.log(doc.id, "=", doc.data());
//       expensesRead.push({ id: doc.id, ...doc.data() });
//     });
//     console.log("expensesRead", expensesRead);
//   });

// const onShapshot = database.collection("expenses").onSnapshot(snapshot => {
//   // console.log(snapshot);
//   const expensesRead = [];
//   snapshot.forEach(doc => {
//     expensesRead.push({ id: doc.id, ...doc.data() });
//   });
//   console.log("expensesRead from onShapshot", expensesRead);
// });

// const onChanged = database.collection("expenses").onSnapshot(function(snapshot) {
//   snapshot.docChanges().forEach(change => {
//     if (change.type === "added") {
//       console.log("New expense: ", change.doc.data());
//       // This is equivalent to child_added
//     }
//     if (change.type === "modified") {
//       console.log("Modified expense: ", change.doc.data());
//       // This is equivalent to child_changed
//     }
//     if (change.type === "removed") {
//       console.log("Removed expense: ", change.doc.data());
//       // This is equivalent to child_removed
//     }
//   });
// });

//// add new object:
// database
//   .collection("first-test-collection")
//   .add({
//     name: "John Grove",
//     age: 55,
//     isSingle: false,
//     location: {
//       city: "Odessa",
//       county: "United States"
//     }
//   })
//   .then(function(docRef) {
//     console.log("Document written with ID: ", docRef.id);
//   })
//   .catch(function(error) {
//     console.error("Error adding document: ", error);
//   });

//// replace object (create if it doesn't exist - upsert):
// database
//   .collection("first-test-collection")
//   .doc("User-1")
//   .set({
//     name: "John Grove",
//     stressLevel: 6,
//     job: {
//       title: "Sofware developer",
//       company: "Google"
//     },
//     age: 55,
//     isSingle: false,
//     location: {
//       address: "x",
//       city: "Odessa",
//       county: "United States"
//     }
//   })
//   .then(function() {
//     console.log("Document written successfully!: ");
//   })
//   .catch(function(error) {
//     console.error("Error adding document: ", error);
//   });

// //// update a field on an object:
// database
//   .collection("first-test-collection")
//   .doc("User-1")
//   .update({ stressLevel: 9, "job.company": "Amazon", "location.address": "ab" })
//   .then(() => {
//     console.log("Field updated successfully!: ");
//   })
//   .catch(e => {
//     console.error("Error updating field: ", e);
//   });

// database
//   .collection("first-test-collection")
//   .doc("User-1")
//   .update({
//     attributes: {
//       height: "5'8\"",
//       weight: 172
//     }
//   })
// .then(() => {
//     console.log("Field updated successfully!: ");
//   })
//   .catch(error => {
//     console.error("Error updating field: ", error);
//   });

//// delete an attribute (a field) from a document
// database
//   .collection("first-test-collection")
//   .doc("User-1")
//   .update({ isSingle: firebase.firestore.FieldValue.delete() })
//   .then(() => {
//     console.log("Field deleted successfully!: ");
//   })
//   .catch(e => {
//     console.error("Error updating field: ", e);
//   });

// const subsription = database
//   .collection("first-test-collection")
//   .doc("User-1")
//   .onSnapshot({ includeMetadataChanges: true }, doc => {
//     const data = doc.data();
//     console.log(data);
//     console.log(`${data.name} is a ${data.job.title} at ${data.job.company}`);
//   });

// console.log("subscription", subsription);

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
