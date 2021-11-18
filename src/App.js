import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { signIn } from "./features/auth/authSlice";
import { setNotepads } from "./features/notepad/notepadSlice";
import { firebaseClearUser } from "./libs/helpers";

import { snapshotNotepads } from "./backend/notepads";
import { snapshotAuthState, signOut } from "./backend/auth";

import LoadingPage from "./pages/LoadingPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import HomePage from "./pages/HomePage";

const App = () => {
  const dispatch = useDispatch();
  const loaded = useSelector((state) => state.auth.loaded);
  const logged = useSelector((state) => state.auth.logged);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const unsubscribe = snapshotAuthState(async(user) => {
      if (user != null && !user.emailVerified) {
        await signOut();
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
      const unsubscribe = snapshotNotepads(
        user.uid,
        (items) => {
          dispatch(setNotepads(items.map((i) => ({ ...i, saved: true, selected: false }))));
        },
        (error) => {
          console.error(error);
        }
      );

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
