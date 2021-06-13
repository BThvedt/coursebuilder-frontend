import React, { FC } from "react"
import { Switch, Route, Router, Link } from "react-router-dom"
// import { RouteComponentProps } from "react-router-dom";
import { History } from "history"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
// import { ThemeProvider } from "@material-ui/core/styles"
import theme from "./Theme"
import { client } from "./grqphql/client"
import {
  ThemeProvider,
  createGenerateClassName
} from "@material-ui/core/styles"
import { StylesProvider } from "@material-ui/core"
import { ApolloProvider } from "@apollo/client"

const generateClassName = createGenerateClassName({
  //productionPrefix: "au",
  seed: "au"
})

interface IProps {
  history: History
  onSignIn: () => void
}

const App: FC<IProps> = ({ history, onSignIn }) => {
  return (
    <ApolloProvider client={client}>
      <StylesProvider generateClassName={generateClassName}>
        <ThemeProvider theme={theme}>
          <Router history={history}>
            <Switch>
              <Route exact path="/auth/signin">
                <Signin onSignIn={onSignIn} />
              </Route>

              <Route exact path="/auth/signup">
                <Signup onSignIn={onSignIn} />
              </Route>
            </Switch>
          </Router>
        </ThemeProvider>
      </StylesProvider>
    </ApolloProvider>
  )
}

export default App
