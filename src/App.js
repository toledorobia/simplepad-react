import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { AuthContext } from "./providers/AuthProvider";

import LoadingPage from "./pages/LoadingPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import HomePage from "./pages/HomePage";
import { DataProvider } from "./providers/DataProvider";

const App = () => {
  const { auth } = useContext(AuthContext);

  if (!auth.loaded) {
    return <LoadingPage />;
  }

  if (!auth.logged) {
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
      <DataProvider>
        <Router>
          <Switch>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </Router>
      </DataProvider>
    </>
  );
};

export default App;
