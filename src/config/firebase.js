// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import * as firebase from "firebase";
import "firebase/storage";

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
const analytics = getAnalytics(app);

export const database = firebase.Firestore();