import React, { FC, Suspense } from "react"
import { Switch, Route, useLocation } from "react-router-dom"
// import { RouteComponentProps } from "react-router-dom";
import { History } from "history"
import FrontPage from "./pages/frontPage/FrontPage"
import UnderConstruction from "./pages/UnderConstruction"
import "../marketing.scss"
import { CSSTransition, TransitionGroup } from "react-transition-group"

interface IProps {
  // history: History
}

const AnimatedRouteAttempt: FC<IProps> = () => {
  let location = useLocation()
  const currentKey = location.pathname.split("/")[1] || "/"

  return (
    <Route
      render={({ location }) => {
        return (
          <TransitionGroup>
            <CSSTransition key={location.key} timeout={300} classNames="fade">
              {/* <div id="asdfasdfasdfsaf"> */}
              <Suspense fallback={<div>Loading...</div>}>
                <Switch location={location}>
                  <Route path="/underConstruction">
                    <div className="page-wrapper">
                      <UnderConstruction />
                    </div>
                  </Route>
                  <Route exact path="/">
                    <div className="page-wrapper">
                      <FrontPage />
                    </div>
                  </Route>
                </Switch>
              </Suspense>
              {/* </div> */}
            </CSSTransition>
          </TransitionGroup>
        )
      }}
    />
  )
}

export default AnimatedRouteAttempt
