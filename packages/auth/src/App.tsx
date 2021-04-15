import React, { FC } from "react"
import { Switch, Route, Router } from "react-router-dom"
// import { RouteComponentProps } from "react-router-dom";
import { History } from "history"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
// import { ThemeProvider } from "@material-ui/core/styles"
import theme from "./Theme"
import {
  ThemeProvider,
  createGenerateClassName
} from "@material-ui/core/styles"
import { StylesProvider } from "@material-ui/core"

const generateClassName = createGenerateClassName({
  productionPrefix: "au"
})

interface IProps {
  history: History
  onSignIn: () => void
}

const App: FC<IProps> = ({ history, onSignIn }) => {
  return (
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
  )
}

export default App
