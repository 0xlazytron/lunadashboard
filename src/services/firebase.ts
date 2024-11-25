import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAJJas50BipPUibDfpURUmbbYrVFRWSu9k",
  authDomain: "lunalotto-e2db6.firebaseapp.com",
  projectId: "lunalotto-e2db6",
  storageBucket: "lunalotto-e2db6.appspot.com",
  messagingSenderId: "97429873953",
  appId: "1:97429873953:web:365c802e8984c2c6570a60",
  measurementId: "G-DG3078D7EE",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
