import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, query, where, orderBy, onSnapshot } from "firebase/firestore";

import { signIn } from "./features/auth/authSlice";
import { setNotepads } from "./features/notepad/notepadSlice";
import { firebaseClearUser, firebaseDocToObject } from "./libs/helpers";

import LoadingPage from "./pages/LoadingPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import HomePage from "./pages/HomePage";

const App = () => {
  const auth = getAuth();
  const db = getFirestore();

  const dispatch = useDispatch();
  const loaded = useSelector((state) => state.auth.loaded);
  const logged = useSelector((state) => state.auth.logged);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    let unsubscribe = onAuthStateChanged(auth, async(user) => {
      if (user != null && !user.emailVerified) {
        await auth.signOut(auth);
      }
      else {
        dispatch(signIn(firebaseClearUser(user)));
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (user == null) {
      dispatch(setNotepads(null));
    }
    else {
      const q = query(collection(db, "notepads"), where("uid", "==", user.uid), orderBy("name"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        console.log("Snapshot");

        const items = [];
        snapshot.forEach((doc) => {
          items.push(firebaseDocToObject(doc, { saved: true, selected: false }));
        });
        dispatch(setNotepads(items));
      },
      (err) => {
        console.log(err);
      });

      return () => unsubscribe();
    }
  }, [user]);

  if (!loaded) {
    return <LoadingPage />;
  }

  if (!logged) {
    return (
      <>
        <Router>
          <Switch>
            <Route path="/forgot-password">
              <ForgotPasswordPage />
            </Route>
            <Route path="/sign-up">
              <SignUpPage />
            </Route>
            <Route path="/">
              <SignInPage />
            </Route>
          </Switch>
        </Router>
      </>
    );
  }

  return (
    <>
      <Router>
        <Switch>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
