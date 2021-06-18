import React, { FC, lazy, Suspense, useState, useEffect } from "react"
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  Router,
  Link
} from "react-router-dom"
import {
  StylesProvider,
  ThemeProvider,
  createGenerateClassName,
  jssPreset
} from "@material-ui/core/styles"
import { create } from "jss"
import theme from "./Theme"
import Progress from "./components/Progress"
import Header from "./components/Header"
import { createBrowserHistory } from "history"
import AuthorizedSection from "./components/authorizedSection/AuthorizedSection"
import {
  AnonUser,
  USER,
  TokenPayload,
  ME,
  LOGOUT
} from "@makeamodule/shared-frontend"
import {
  useQuery,
  useMutation,
  useApolloClient,
  useLazyQuery
} from "@apollo/client"
import "../container.scss"
import { gql } from "@apollo/client"

const defaultUserData = {
  me: AnonUser
}

const MarketingLazy = lazy(() => import("./components/MarketingApp"))
const ModulesLazy = lazy(
  () => import("./components/authorizedSection/ModulesApp")
)
const AuthLazy = lazy(() => import("./components/AuthApp"))
//const ModulesLazy = lazy(() => import("./ModulesApp"))
const NewServiceLazy = lazy(
  () => import("./components/authorizedSection/NewServiceApp")
)
// const NewServiceLazy = lazy(
//   () => import("./components/authorizedSection/NewServiceApp")
// )

// an alternative is to use 'BrowserRouter' but then can't explicitly access the browser history in hte parent component,
// so just use 'Router' componet and pass in the history as opposed to creating yet another higher level component just for the router provider or something similar
const history = createBrowserHistory()

export default () => {
  const {
    loading,
    error,
    data: { me: user } = defaultUserData
  } = useQuery(gql`
    query {
      me {
        id
        name
        email
        orgRole
      }
    }
  `)
  const client = useApolloClient()
  const [isSignedIn, setIsSignedIn] = useState(false)

  // useEffect(() => {
  //   // put logic to redirect on sign in here
  //   console.log("user is")
  //   console.log(user)
  // }, [isSignedIn, user])

  const onSignIn = (userData: USER | TokenPayload, token?: string): void => {
    // we've logged in. Let's cache the data in the query

    let loggedInUser

    console.log("Now we are in the signin callback")
    console.log(process.env.AUTH_METHOD === "Token")

    if (process.env.AUTH_METHOD === "Token") {
      localStorage.setItem("token", (userData as TokenPayload).token)
      loggedInUser = (userData as TokenPayload).user
    } else {
      console.log("Setting the longged in user to:")
      console.log(userData)
      loggedInUser = userData
    }

    console.log("Time to write query")
    console.log(loggedInUser)

    client.writeQuery({
      query: ME,
      data: {
        me: loggedInUser as USER
      }
    })
  }

  const [logout, { data }] = useMutation(LOGOUT, {
    async onCompleted(data) {
      const { logout: success } = data

      if (success) {
        client.writeQuery({
          query: ME,
          data: {
            me: AnonUser
          }
        })
      } else {
        alert("there was an error logging out")
      }
    }
  })

  // status right now .. the logged in user is correct

  const generateClassName = createGenerateClassName({
    productionPrefix: "cont",
    seed: "cont"
  })

  if (loading) {
    console.log("loading")
  }

  if (user) {
    console.log("User is")
    console.log(user)
  }

  return (
    <ThemeProvider theme={theme}>
      <StylesProvider generateClassName={generateClassName}>
        <Router history={history}>
          <div id="i-dont-have-allweek-to-figure-out-why-material-ui-is-breaking">
            {!loading && !user.id && (
              <Header isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} />
            )}
            {/* {!loading && user.id && (
              <div style={{ position: "relative", zIndex: 9999 }}>
                <Link to="/modules/">Modules</Link>
                <Link to="/new_service/">New Service</Link>{" "}
                <Link to="/auth/signin">Auth</Link>{" "}
                <Link to="/">Marketing</Link>{" "}
              </div>
            )} */}
            <Suspense fallback={<Progress />}>
              <Switch>
                <Route path="/auth">
                  {user.id && <Redirect to="/modules/" />}
                  <AuthLazy onSignIn={onSignIn} />
                </Route>
                <Route
                  exact
                  path={["/", "/underConstruction"]}
                  //path={["/", "/underConstruction"]}
                  // render={({ location }) => {
                  //   return ["/", "/underConstruction"].includes(
                  //     location.pathname
                  //   ) ? (
                  //     <>
                  //       {/* {!loading && user.id && <Redirect to="/modules/" />} */}
                  //       <MarketingLazy />
                  //     </>
                  //   ) : null
                  // }}
                >
                  {!loading && user.id && <Redirect to="/modules/" />}
                  <MarketingLazy />
                </Route>
                <Route path="/*">
                  {!loading && !user.id && <Redirect to="/" />}
                  <AuthorizedSection
                    siteUser={user}
                    logout={logout}
                    history={history}
                  />
                </Route>
                {/* <Route path={["/modules", "/module/*"]}>
                  
                  <ModulesLazy siteUser={user} />
                </Route>
                <Route path="/new_service">
                  <NewServiceLazy siteUser={user} />
                </Route> */}
              </Switch>
            </Suspense>
          </div>
        </Router>
      </StylesProvider>
    </ThemeProvider>
  )
}
