import React, { FC } from "react";
import { Switch, Route, Router } from "react-router-dom";
// import { RouteComponentProps } from "react-router-dom";
import { History } from "history";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

interface IProps {
  history: History;
  onSignIn: () => void;
}

const App: FC<IProps> = ({ history, onSignIn }) => {
  console.log("IN APp and type of onSign IN is");
  console.log(typeof onSignIn);
  return (
    <div>
      <h1>Auth!</h1>
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
    </div>
  );
};

export default App;
