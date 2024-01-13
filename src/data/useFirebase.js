import { firestore } from "../../firebase";
import {
  getDoc,
  doc,
  setDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { defaultCategoriesData } from "./defaultData/categories";
import { defaultRecurring } from "./defaultData/recurring";

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
      firestoreUserData.categoriesData || defaultCategoriesData
    );
    setRecurringData(firestoreUserData.recurringData || defaultRecurring);
  } else {
    await setDoc(userDocRef, {
      displayName: user.displayName,
      email: user.email,
      createdAt: serverTimestamp(),
      transactionsData: [],
      budgetsData: [],
      categoriesData: defaultCategoriesData,
      recurringData: defaultRecurringData,
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
      budgetsData:
        type === "budget" ? data : firestoreUserData.budgetsData || [],
      categoriesData:
        type === "categories"
          ? data
          : firestoreUserData.categoriesData || defaultCategoriesData,
      recurringData:
        type === "recurring"
          ? data
          : firestoreUserData.recurringData || defaultRecurring,
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
