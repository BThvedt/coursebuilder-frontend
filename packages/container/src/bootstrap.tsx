import React from "react"
import ReactDom from "react-dom"
import App from "./App"
import { ApolloProvider } from "@apollo/client"
import { client } from "./graphql/client"

ReactDom.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.querySelector("#root")
)
