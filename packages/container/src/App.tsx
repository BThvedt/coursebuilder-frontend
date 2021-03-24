import React, { FC, lazy, Suspense, useState, useEffect } from "react"
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  Router
} from "react-router-dom"
// import AuthApp from "./components/AuthApp";
// import Service1App from "./components/Service1App";
import Header from "./components/Header"
import { createBrowserHistory } from "history"

const MarketingLazy = lazy(() => import("./components/MarketingApp"))
const ModulesApp = lazy(() => import("./components/ModulesApp"))
const AuthLazy = lazy(() => import("./components/AuthApp"))

// an alternative is to use 'BrowserRouter' but then can't explicitly access the browser history in hte parent component,
// so just use 'Router' componet and pass in the history as opposed to creating yet another higher level component just for the router provider or something similar
const history = createBrowserHistory()

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false)

  useEffect(() => {
    // put logic to redirect on sign in here
  }, [isSignedIn])

  const onSignIn = (): void => {
    setIsSignedIn(true)
  }

  return (
    <Router history={history}>
      <div>
        <Header isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} />
        <Suspense fallback={<div>Loading..</div>}>
          <Switch>
            <Route path="/auth">
              <AuthLazy onSignIn={onSignIn} />
            </Route>
            <Route path="/modules">
              {!isSignedIn && <Redirect to="/" />}
              <ModulesApp onSignIn={onSignIn} />
            </Route>
            <Route path="/">
              <MarketingLazy />
            </Route>
          </Switch>
        </Suspense>
      </div>
    </Router>
  )
}
