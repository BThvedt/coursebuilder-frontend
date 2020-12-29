import React, { FC } from "react";
import { Switch, Route, Router } from "react-router-dom";
// import { RouteComponentProps } from "react-router-dom";
import { History } from "history";
import Page1 from "./pages/page1";
import Page2 from "./pages/page2";

interface IProps {
  history: History;
}

const App: FC<IProps> = ({ history }) => {
  return (
    <div>
      <h1>Service 2!</h1>
      <Router history={history}>
        <Switch>
          <Route exact path="/service_2/page2" component={Page2} />
          <Route exact path="/service_2/page1" component={Page1} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
