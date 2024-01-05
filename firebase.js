import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAEHgusSkJUpBa2LHtkcAPQN8bT1aAfPcU",
  authDomain: "budget-b8b7a.firebaseapp.com",
  projectId: "budget-b8b7a",
  storageBucket: "budget-b8b7a.appspot.com",
  messagingSenderId: "343170218754",
  appId: "1:343170218754:web:85d39cffdec7f89c27201b",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const firestore = getFirestore(app);
