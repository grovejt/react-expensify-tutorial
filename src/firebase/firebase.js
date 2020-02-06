import * as firebase from "firebase";

// process.env.NODE_ENV will be set as follows:
//   will be set to 'development' when running dev environment > yarn dev
//   will be set to 'test' when running tests > yarn test
//   will be set to 'production' when running prod build > yarn prod
//process.env.NODE_ENV = process.env.NODE_ENV || "development";

// switch (process.env.NODE_ENV) {
//   case "development": {
//     break;
//   }
//   case "test": {
//     break;
//   }
//   case "production": {
//     break;
//   }
//   default: {
//     throw new Error("No NODE_ENV setting was found!!!");
//   }
// }
// if (process.env.NODE_ENV === "development") {
// } else if (process.env.NODE_ENV === "production") {
// }

//console.log("process.env", process.env);
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
//firebase.analytics();

// https://firebase.google.com/docs/firestore/manage-data/add-data?authuser=0

const database = firebase.firestore();

export { firebase, database as default };
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
