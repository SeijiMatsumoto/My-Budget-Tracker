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
  setBudgetsData,
  returnToast,
  toast
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
    })
      .then(() => {
        returnToast(toast, true, "Successfully updated data");
      })
      .catch((err) => {
        returnToast(toast, false, "Failed to udpate data");
        console.log(err);
      });
  }
};

export const setDataInFirestore = async (
  user,
  type,
  setData,
  data,
  returnToast,
  toast
) => {
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
    })
      .then(() => {
        returnToast(toast, true, "Successfully updated data");
      })
      .catch((err) => {
        returnToast(toast, false, "Failed to udpate data");
        console.log(err);
      });
    setData(data);
  }
};
