import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";

import Page1 from "./pages/page1";
import Page2 from "./pages/page2";

export default () => {
  return (
    <div>
      <h1>Service One</h1>
      <BrowserRouter>
        <Switch>
          <Route exact path="/page2" component={Page2} />
          <Route exact path="/" component={Page1} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};
