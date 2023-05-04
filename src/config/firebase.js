// Import the functions you need from the SDKs you need
import firebase, { initializeApp } from "firebase/app"
import "firebase/firestore";
import { getAuth} from "firebase/auth"
import { getFirestore } from '@firebase/firestore'
import { getStorage } from "@firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyBEYRR_3d9n2WQSevS5N4qd4Y1iVQI2ivQ",
  authDomain: "tele-visao-224f7.firebaseapp.com",
  projectId: "tele-visao-224f7",
  storageBucket: "tele-visao-224f7.appspot.com",
  messagingSenderId: "18932905554",
  appId: "1:18932905554:web:bebeba26b7ef2e09bf918b",
  measurementId: "G-N900JQ61NY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage(app, 'gs://tele-visao-224f7.appspot.com/');

// firebase.auth().signInWithEmailAndPassword(email, password)
//   .then((userCredential) => {
//     // Signed in
//     var user = userCredential.user;
//     // ...
//   })
//   .catch((error) => {
//     var errorCode = error.code;
//     var errorMessage = error.message;
//   });


export default app

// signInWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed in 
//     const user = userCredential.user;
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//   });
/*
const db = firebaseApp.firestone();
export {db};*/