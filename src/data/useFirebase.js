import { firestore } from "../../firebase";
import {
  getDoc,
  doc,
  setDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { categoriesDefaultData } from "./dummyData/categories";

export const getDataFromFirestore = async (
  user,
  setTransactionsData,
  setBudgetsData,
  setCategoriesData,
  setRecurringData,
  returnToast,
  toast
) => {
  const userId = user.uid;
  const userDocRef = doc(firestore, "users", userId);
  const userDocSnapshot = await getDoc(userDocRef);

  if (userDocSnapshot.exists()) {
    const firestoreUserData = userDocSnapshot.data();
    setTransactionsData(firestoreUserData.transactionsData || []);
    setBudgetsData(firestoreUserData.budgetsData || []);
    setCategoriesData(
      firestoreUserData.categoriesData || categoriesDefaultData
    );
    setRecurringData(firestoreUserData.recurringData || []);
  } else {
    await setDoc(userDocRef, {
      displayName: user.displayName,
      email: user.email,
      createdAt: serverTimestamp(),
      transactionsData: [],
      budgetsData: [],
      categoriesData: [],
    })
      .then(() => {
        returnToast(toast, true, "Successfully updated data");
      })
      .catch((err) => {
        returnToast(toast, false, "Failed to udpate data");
        console.error(err);
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
        type === "transaction" || type === "income" || type === "savings"
          ? data
          : firestoreUserData.transactionsData,
      budgetsData: type === "budget" ? data : firestoreUserData.budgetsData,
      categoriesData:
        type === "categories" ? data : firestoreUserData.categoriesData,
      recurringData:
        type === "recurring" ? data : firestoreUserData.recurringData,
    })
      .then(() => {
        returnToast(toast, true, "Successfully updated data");
      })
      .catch((err) => {
        returnToast(toast, false, "Failed to udpate data");
        console.error(err);
      });
    setData(data);
  }
};
