import React, { FC, useEffect, useState } from "react"
import { Switch, Route, Router } from "react-router-dom"
// import { RouteComponentProps } from "react-router-dom";
import { History } from "history"
import List from "./pages/ListAndCreate/List"
import ModulePage from "./pages/ModulePage/ModulePage"
import { client } from "./grqphql/client"
import { ApolloProvider, useApolloClient, useQuery } from "@apollo/client"
import { StylesProvider, Container } from "@material-ui/core"
import { USER, ME, LocalLogin, AnonUser } from "@makeamodule/shared-frontend"
import theme from "./Theme"
import {
  ThemeProvider,
  createGenerateClassName
} from "@material-ui/core/styles"
import "./modules.scss"
import { ModuleContext } from "./Context"
import { ContactSupportOutlined } from "@material-ui/icons"

interface IProps {
  history: History
  siteUser?: USER // we do not get this prop in isoation
}

const generateClassName = createGenerateClassName({
  //productionPrefix: "ma",
  seed: "ma"
})

const App: FC<IProps> = ({ history, siteUser }) => {
  const [user, setUser] = useState<USER | null>(null)
  const client = useApolloClient()

  let [bodyClickCounter, setBodyClickCounter] = useState<number>(0)

  const incrementBodyClickCounter = () => {
    // a bad idea to do it like this in complicated things because it runs a rerender of everything from this level down
    // every time body click counter changes. But, for simple things I think it's fine
    setBodyClickCounter(bodyClickCounter + 1)
  }

  useEffect(() => {
    if (siteUser) {
      console.log("IN modules, useffect: site user exists")
      console.log(siteUser)
      setUser(siteUser)
    } else {
      ;(async () => {
        let { data: { me: user } = AnonUser } = await client.query({
          query: ME,
          //fetchPolicy: "network-only",
          context: {
            service: "auth"
          }
        })

        console.log("IN modules, useffect: user is")
        console.log(user)
        setUser(user)
      })()
    }
  }, [])

  return (
    <StylesProvider generateClassName={generateClassName} injectFirst>
      <ThemeProvider theme={theme}>
        <ModuleContext.Provider
          value={{
            bodyClickCounter,
            incrementBodyClickCounter,
            user,
            setUser
          }}
        >
          <div
            onClick={incrementBodyClickCounter}
            style={{ width: "100%", marginTop: "1.5em" }}
          >
            {!siteUser && <LocalLogin />} {/* if not in isolation .. */}
            <Router history={history}>
              {user && (
                <Container fixed id="modules-container">
                  <Switch>
                    <Route exact path="/modules">
                      <List user={user}></List>
                    </Route>
                    <Route exact path="/module/:id">
                      <ModulePage user={user}></ModulePage>
                    </Route>
                  </Switch>
                </Container>
              )}
            </Router>
          </div>
        </ModuleContext.Provider>
      </ThemeProvider>
    </StylesProvider>
  )
}

export default App
