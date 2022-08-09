// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcIxoYkoqhkDuWG1xRfW929GuJBkc9-18",
  authDomain: "shopclone-1140f.firebaseapp.com",
  projectId: "shopclone-1140f",
  storageBucket: "shopclone-1140f.appspot.com",
  messagingSenderId: "366372689789",
  appId: "1:366372689789:web:60a1aeb56889767bc2de14",
  measurementId: "G-5M3BSS5FN6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const shopCloneDB = getFirestore(app);
export default shopCloneDB;