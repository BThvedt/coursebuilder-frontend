import React, { FC } from "react"
import { Switch, Route, Router, Link } from "react-router-dom"
// import { RouteComponentProps } from "react-router-dom";
import { History } from "history"
import Page1 from "./pages/page1"
import Page2 from "./pages/page2"
import { client } from "./grqphql/client"
import { ApolloProvider } from "@apollo/client"
import { StylesProvider } from "@material-ui/core"
import { USER, LocalLogin } from "@makeamodule/shared-frontend"
import theme from "./Theme"
import {
  ThemeProvider,
  createGenerateClassName
} from "@material-ui/core/styles"

interface IProps {
  history: History
  siteUser?: USER // we do not get this prop in isoation
}

const generateClassName = createGenerateClassName({
  //productionPrefix: "ma",
  seed: "ns"
})

const App: FC<IProps> = ({ history, siteUser }) => {
  return (
    <ApolloProvider client={client}>
      <StylesProvider generateClassName={generateClassName} injectFirst>
        <ThemeProvider theme={theme}>
          <>
            {!siteUser && <LocalLogin />} {/* if not in isolation .. */}
            <h1>NEW Service!</h1>
            <Router history={history}>
              <Link to="/new_service/page1">Page1</Link>
              <Link to="/new_service/page2">Page2</Link>
              <Switch>
                <Route exact path="/new_service/page2" component={Page2} />
                <Route exact path="/new_service/page1" component={Page1} />
              </Switch>
            </Router>
          </>
        </ThemeProvider>
      </StylesProvider>
    </ApolloProvider>
  )
}

export default App
