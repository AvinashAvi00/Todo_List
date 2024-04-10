// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfsHswKfC3pknSfMmuQbQNiPq0j6QzsnQ",
  authDomain: "todo-list-e97fb.firebaseapp.com",
  projectId: "todo-list-e97fb",
  storageBucket: "todo-list-e97fb.appspot.com",
  messagingSenderId: "489321258980",
  appId: "1:489321258980:web:9ec843a7f2f86f1d43b1f1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)