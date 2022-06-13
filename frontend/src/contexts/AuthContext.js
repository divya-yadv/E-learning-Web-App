import React, { useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  sendSignInLinkToEmail,
  deleteUser,
  updatePassword,
  updateEmail,
} from 'firebase/auth';
import { auth } from '../firebase';
const AuthContext = React.createContext();

export function useUserAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(true);
  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function signin(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function logOut() {
    return signOut(auth);
  }
  function deleteuser() {
    return deleteUser(auth, currentUser);
  }
  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }
  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }
  function sendLinkToVerify(email) {
    return sendSignInLinkToEmail(auth, email);
  }
  function updateemail(email) {
    return updateEmail(auth, email);
  }
  function updatepassword(user,password) {
    return updatePassword(user, password);
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setCurrentUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    signin,
    logOut,
    googleSignIn,
    resetPassword,
    sendLinkToVerify,
    deleteuser,
    updateemail,
    updatepassword,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
