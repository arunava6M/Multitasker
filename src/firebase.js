import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDtYJ1UOkcORSe_1nLTNUFQheTs9fOS5fE",
  authDomain: "multitasker-todo.firebaseapp.com",
  projectId: "multitasker-todo",
  storageBucket: "multitasker-todo.appspot.com",
  messagingSenderId: "256289453931",
  appId: "1:256289453931:web:3a6f0aff44c32b5edf7e2e",
  measurementId: "G-9NXWFWSDD7",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
