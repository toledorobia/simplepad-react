import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
// import app from "../firebase";

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
      await app.auth().setPersistence(remember ? firebase.auth.Auth.Persistence.LOCAL : firebase.auth.Auth.Persistence.SESSION);
      await app.auth().signInWithEmailAndPassword(email, password);
  }

  const signUp = async (email, password) => {
    await app.auth().createUserWithEmailAndPassword(email, password);
    await app.auth().currentUser.sendEmailVerification();
    app.auth().signOut();
  }

  const signOut = () => {
    app.auth().signOut();
  };

  const forgotPassword = async (email) => {
    await app.auth().sendPasswordResetEmail(email);
  };

  useEffect(() => {
    let unsubscribe = app.auth().onAuthStateChanged((user) => {
      if (user != null && !user.emailVerified) {
        app.auth().signOut();
        alert("First verify your email address.");
      }
      else {
        console.log(user);
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