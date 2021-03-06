import React from "react"
import ReactDOM from "react-dom"
import { createMemoryHistory, createBrowserHistory } from "history"
import { History, MemoryHistory, LocationListener } from "history"
import { USER } from "@makeamodule/shared-frontend"
import App from "./App"

import { ApolloProvider, useApolloClient, useQuery } from "@apollo/client"
import { client } from "./grqphql/client"

interface IOptions {
  onNavigate?: LocationListener<unknown> // callback for naviagation
  defaultHistory?: History<unknown>
  initialPath?: string
  siteUser?: USER
}

interface IReturn {
  onParentNavigate?: LocationListener<unknown>
}

// Mount function to start up the app
const mount = (
  el: Element,
  { onNavigate, defaultHistory, initialPath, siteUser }: IOptions = {}
): IReturn => {
  const history: History<unknown> | MemoryHistory<unknown> =
    defaultHistory ||
    createMemoryHistory({
      initialEntries: [initialPath]
    })

  if (onNavigate) {
    history.listen(onNavigate)
  }

  ReactDOM.render(
    <ApolloProvider client={client}>
      <App siteUser={siteUser} history={history} />
    </ApolloProvider>,
    el
  )

  // ReactDOM.render(<App siteUser={siteUser} history={history} />, el)

  return {
    onParentNavigate({ pathname: nextPathname }) {
      const { pathname } = history.location

      if (pathname !== nextPathname) {
        history.push(nextPathname)
      }
    }
  }
}

// If we are in development and in isolation,
// call mount immdeiatley
if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector("#_modules-dev-root")

  if (devRoot) {
    mount(devRoot, { defaultHistory: createBrowserHistory() })
  }
}

// If we aren't, we are running through container
// and we should export the mount function
export { mount }
