// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD83qs2VQEvyXCK_v9z5lTUnDecah_ygPI",
  authDomain: "admin-panel-ac214.firebaseapp.com",
  projectId: "admin-panel-ac214",
  storageBucket: "admin-panel-ac214.appspot.com",
  messagingSenderId: "525789693196",
  appId: "1:525789693196:web:122e82566b019b6274b529",
  measurementId: "G-76MLE2HGKD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);