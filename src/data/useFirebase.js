import { firestore } from "../../firebase";
import {
  getDoc,
  doc,
  setDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

export const getDataFromFirestore = async (
  user,
  setTransactionsData,
  setBudgetsData
) => {
  const userId = user.uid;
  const userDocRef = doc(firestore, "users", userId);
  const userDocSnapshot = await getDoc(userDocRef);
  if (userDocSnapshot.exists()) {
    const firestoreUserData = userDocSnapshot.data();
    setTransactionsData(firestoreUserData.transactionsData);
    setBudgetsData(firestoreUserData.budgetsData);
  } else {
    await setDoc(userDocRef, {
      displayName: user.displayName,
      email: user.email,
      createdAt: serverTimestamp(),
      transactionsData: [],
      budgetsData: [],
    });
  }
};

export const setDataInFirestore = async (user, type, setData, data) => {
  const userId = user.uid;
  const userDocRef = doc(firestore, "users", userId);
  const userDocSnapshot = await getDoc(userDocRef);
  if (userDocSnapshot.exists()) {
    const firestoreUserData = userDocSnapshot.data();
    await setDoc(userDocRef, {
      displayName: user.displayName,
      email: user.email,
      createdAt: serverTimestamp(),
      transactionsData:
        type === "transaction" ? data : firestoreUserData.transactionsData,
      budgetsData: type === "budget" ? data : firestoreUserData.budgetsData,
    });
    setData(data);
  }
};
