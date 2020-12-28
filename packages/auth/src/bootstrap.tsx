import React from "react";
import ReactDOM from "react-dom";
import { createMemoryHistory, createBrowserHistory } from "history";
import { History, MemoryHistory, LocationListener } from "history";
import App from "./App";

interface IOptions {
  onNavigate?: LocationListener<unknown>; // callback for naviagation
  defaultHistory?: History<unknown>;
  initialPath?: string;
  onSignIn?: () => void;
}

interface IReturn {
  onParentNavigate?: LocationListener<unknown>;
}

// Mount function to start up the app
const mount = (
  el: Element,
  { onNavigate, defaultHistory, initialPath, onSignIn }: IOptions = {}
): IReturn => {
  const history: History<unknown> | MemoryHistory<unknown> =
    defaultHistory ||
    createMemoryHistory({
      initialEntries: [initialPath],
    });

  if (onNavigate) {
    history.listen(onNavigate);
  }

  ReactDOM.render(<App history={history} onSignIn={onSignIn} />, el);

  return {
    onParentNavigate({ pathname: nextPathname }) {
      const { pathname } = history.location;

      if (pathname !== nextPathname) {
        history.push(nextPathname);
      }
    },
  };
};

// If we are in development and in isolation,
// call mount immdeiatley
if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector("#_auth-dev-root");

  if (devRoot) {
    mount(devRoot, { defaultHistory: createBrowserHistory() });
  }
}

// If we aren't, we are running through container
// and we should export the mount function
export { mount };
