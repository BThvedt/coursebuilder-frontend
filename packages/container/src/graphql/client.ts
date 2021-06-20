import { useMemo } from "react"
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  createHttpLink
} from "@apollo/client"
import { TypedTypePolicies } from "../../generated/graphql-typepolicies"
import { setContext } from "apollo-link-context"

// see "task-mate" or the "typescript-with-react" course to understand wtf is happening here

// type MyApolloCache = any
// let apolloClient: ApolloClient<MyApolloCache> | undefined

// task 1: generate types (if codegen doesn't work try https://dgraph.io/blog/post/apollo-react-hooks-with-typescript/)
// task 2: type the memory cache? https://www.graphql-code-generator.com/docs/plugins/typescript-apollo-client-helpers
// task 3: authenticate mutation
// task 4: authenticate with cookie - maybe test users query. OK SO THIS IS WHERE SHIT GEST FUCKED UP. Now we're authenticating by either cookie or token
// task 5: duplicate for every microfrontend
// task 6: authenticate with login form
// task 7: repeat for builder

// function createIsomorphLink() {
//   return new HttpLink({
//     uri: "/api/graphql"
//   })
// }

// function createApolloClient() {
//   return new ApolloClient({
//     ssrMode: typeof window === "undefined",
//     link: createIsomorphLink(),
//     cache: new InMemoryCache()
//   })
// }

let credentials = "same-origin"
// important for cookies, but I actually don't think it comes up. We're only using cookies when:
// both front and back end are on localhost or both front and back end are live. Either way, should be the same domain
// if (process.env.DIFFERENT_FRONTEND_DOMAIN === "true") {
//   credentials = "include"
// }

// for the memory cache
const typePolicies: TypedTypePolicies = {
  // Keys in this object will be validated against the typed on your schema
  User: {
    keyFields: ["id"] // Values in this field will be validated against the available fields from the Product type
  }
}

const httpLink = createHttpLink({
  uri: process.env.AUTH_ENDPOINT,
  credentials
})

let link

if (process.env.AUTH_METHOD === "Token") {
  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem("token")
    // return the headers to the context so httpLink can read them

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ""
      }
    }
  })
  link = authLink.concat(httpLink as any) as any // I think this might be an error with apollo-whatever, just throw 'any' on anything, I guess
} else {
  link = httpLink
}

export const client = new ApolloClient({
  //ssrMode: typeof window === "undefined",
  link,
  cache: new InMemoryCache({ typePolicies })
})
