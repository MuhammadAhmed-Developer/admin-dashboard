import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyD83qs2VQEvyXCK_v9z5lTUnDecah_ygPI",
  authDomain: "admin-panel-ac214.firebaseapp.com",
  projectId: "admin-panel-ac214",
  storageBucket: "admin-panel-ac214.appspot.com",
  messagingSenderId: "525789693196",
  appId: "1:525789693196:web:122e82566b019b6274b529",
  measurementId: "G-76MLE2HGKD"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);