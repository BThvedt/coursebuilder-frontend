import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// Mount function to start up the app
const mount = (el: Element): void => {
  ReactDOM.render(<App />, el);
};

// If we are in development and in isolation,
// call mount immdeiatley
if (process.env.NODE_ENV === "development") {
  const root = document.querySelector("#_service_1-root");

  if (root) {
    mount(root);
  }
}

// If we aren't, we are running through container
// and we should export the mount function
export { mount };
