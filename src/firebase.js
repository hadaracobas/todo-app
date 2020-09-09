import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDiIBBFLq6MEdC-uYimAAdcHEQY6EZ8nHw",
  authDomain: "todo-app-78fdc.firebaseapp.com",
  databaseURL: "https://todo-app-78fdc.firebaseio.com",
  projectId: "todo-app-78fdc",
  storageBucket: "todo-app-78fdc.appspot.com",
  messagingSenderId: "1049076995884",
  appId: "1:1049076995884:web:a2a5fd3a9f1af04bd4fe89",
});

const db = firebaseApp.firestore();

export default db;
