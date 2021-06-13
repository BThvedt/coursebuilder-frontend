import React, { FC } from "react"
import { Switch, Route, Router } from "react-router-dom"
// import { RouteComponentProps } from "react-router-dom";
import { History } from "history"
import FrontPage from "./pages/frontPage/FrontPage"
import UnderConstruction from "./pages/UnderConstruction"
import { Container, Typography, Button, Grid } from "@material-ui/core"
import "../marketing.scss"
import {
  ThemeProvider,
  createGenerateClassName
} from "@material-ui/core/styles"
import { StylesProvider } from "@material-ui/core"
import { CSSTransition, TransitionGroup } from "react-transition-group"
import theme from "./Theme"
import AnimatedRoutesAttempt from "./AnimatedRoutesAttempt"
import { client } from "./grqphql/client"
import { ApolloProvider } from "@apollo/client"

const generateClassName = createGenerateClassName({
  //productionPrefix: "ma",
  seed: "ma"
})

interface IProps {
  history: History
}

const App: FC<IProps> = ({ history }) => {
  return (
    <ApolloProvider client={client}>
      <StylesProvider generateClassName={generateClassName} injectFirst>
        <ThemeProvider theme={theme}>
          <Router history={history}>
            <AnimatedRoutesAttempt />
          </Router>
        </ThemeProvider>
      </StylesProvider>
    </ApolloProvider>
  )
}

export default App
