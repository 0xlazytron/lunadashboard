import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAgmxpkblKRdrEJ8LofTmaALdBwQBtnp8U",
  authDomain: "luna-ticketing-7cbb1.firebaseapp.com",
  projectId: "luna-ticketing-7cbb1",
  storageBucket: "luna-ticketing-7cbb1.firebasestorage.app",
  messagingSenderId: "910220422347",
  appId: "1:910220422347:web:b7125472282695d96a3f4e",
  measurementId: "G-L7E06826V8",
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
