import firebase from "firebase";

const firebaseConfig = {
  // your firebase credentials go here
  apiKey: "AIzaSyATzrBF5vHDi39esVM6TiGpXf8ovoNKjZY",
  authDomain: "imessage-clone-ba53d.firebaseapp.com",
  projectId: "imessage-clone-ba53d",
  storageBucket: "imessage-clone-ba53d.appspot.com",
  messagingSenderId: "860818540576",
  appId: "1:860818540576:web:3cc95e2c7c8c61db969445"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
