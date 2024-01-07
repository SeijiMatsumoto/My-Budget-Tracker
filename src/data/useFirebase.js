import { firestore } from "../../firebase";
import {
  getDoc,
  doc,
  setDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import {
  incomeCategories,
  savingsCategories,
  transactionCategories,
} from "./dummyData/categories";
export const getDataFromFirestore = async (
  user,
  setTransactionsData,
  setBudgetsData,
  setCategoriesData,
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
    let categoriesData;
    if (!firestoreUserData.categoriesData) {
      categoriesData = [
        {
          type: "transaction",
          data: transactionCategories,
        },
        {
          type: "income",
          data: incomeCategories,
        },
        {
          type: "savings",
          data: savingsCategories,
        },
      ];
      await setDoc(userDocRef, {
        displayName: user.displayName,
        email: user.email,
        createdAt: serverTimestamp(),
        transactionsData: firestoreUserData.transactionsData,
        budgetsData: firestoreUserData.budgetsData,
        categoriesData: categoriesData,
      });
    } else {
      categoriesData = firestoreUserData.categoriesData;
    }
    setCategoriesData(categoriesData);
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
      categoriesData:
        type === "categories" ? data : firestoreUserData.categoriesData,
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
