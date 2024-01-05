"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, firestore } from "../../firebase";
import {
  getDoc,
  doc,
  setDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

const AuthContext = createContext();

export const MyAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPhoto, setShowPhoto] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log(user);
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        showPhoto,
        setShowPhoto,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
