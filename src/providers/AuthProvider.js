import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import { auth as fbauth } from "../firebase";

export const AuthContext = React.createContext({
  auth: null,
  signIn: null,
  signOut: null,
  signUp: null,
  forgotPassword: null,
});

export const AuthProvider = (props) => {
  const [auth, setAuth] = useState({
    uid: null,
    user: null,
    logged: false,
    loaded: false
  });

  const signIn = async (email, password, remember) => {
      await fbauth.setPersistence(remember ? firebase.auth.Auth.Persistence.LOCAL : firebase.auth.Auth.Persistence.SESSION);
      await fbauth.signInWithEmailAndPassword(email, password);
  }

  const signUp = async (email, password) => {
    await fbauth.createUserWithEmailAndPassword(email, password);
    await fbauth.currentUser.sendEmailVerification();
    fbauth.signOut();
  }

  const signOut = () => {
    fbauth.signOut();
  };

  const forgotPassword = async (email) => {
    await fbauth.sendPasswordResetEmail(email);
  };

  useEffect(() => {
    let unsubscribe = fbauth.onAuthStateChanged((user) => {
      if (user != null && !user.emailVerified) {
        fbauth.signOut();
      }
      else {
        // console.log(user);
        setAuth({
          uid: user != null ? user.uid : null,
          user: user,
          logged: user != null,
          loaded: true
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ auth, signIn, signUp, signOut, forgotPassword }}>
      {props.children}
    </AuthContext.Provider>
  );
};