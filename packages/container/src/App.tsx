import React, { FC, lazy, Suspense, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
// import AuthApp from "./components/AuthApp";
// import Service1App from "./components/Service1App";
import Header from "./components/Header";

const Serivce1Lazy = lazy(() => import("./components/Service1App"));
const AuthLazy = lazy(() => import("./components/AuthApp"));

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const onSignIn = (): void => {
    setIsSignedIn(true);
  };

  return (
    <BrowserRouter>
      <div>
        <Header isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} />
        <Suspense fallback={<div>Loading..</div>}>
          <Switch>
            <Route path="/auth">
              <AuthLazy onSignIn={onSignIn} />
            </Route>
            <Route path="/">
              <Serivce1Lazy />
            </Route>
          </Switch>
        </Suspense>
      </div>
    </BrowserRouter>
  );
};
