import { useMemo } from "react"
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  createHttpLink,
  ApolloLink
} from "@apollo/client"
import { TypedTypePolicies } from "../../generated/graphql-typepolicies"
import { setContext } from "apollo-link-context"

let credentials = "same-origin"
// important for cookies, but I actually don't think it comes up. We're only using cookies when:
// both front and back end are on localhost or both front and back end are live. Either way, should be the same domain
if (process.env.DIFFERENT_FRONTEND_DOMAIN === "true") {
  credentials = "include"
}

// for the memory cache
const typePolicies: TypedTypePolicies = {
  // Keys in this object will be validated against the typed on your schema
  User: {
    keyFields: ["id"] // Values in this field will be validated against the available fields from the Product type
  }
}

const authHttpLink = createHttpLink({
  uri: process.env.LOCAL_AUTH_ENDPOINT,
  credentials
})

let linkForAuth

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
  linkForAuth = authLink.concat(authHttpLink as any) as any // I think this might be an error with apollo-whatever, just throw 'any' on anything, I guess
} else {
  linkForAuth = authHttpLink
}

const serviceHttpLink = createHttpLink({
  uri: process.env.LOCAL_SERVICE_ENDPOINT,
  credentials
})

let linkForService

if (process.env.AUTH_METHOD === "Token") {
  const serviceLink = setContext((_, { headers }) => {
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
  linkForService = serviceLink.concat(serviceHttpLink as any) as any // I think this might be an error with apollo-whatever, just throw 'any' on anything, I guess
} else {
  linkForService = serviceHttpLink
}

// gonna need at least one, maybe more? for permissions for other services
// at least one for compoennts. To be done later
export const client = new ApolloClient({
  link: ApolloLink.split(
    (operation) => {
      return operation.getContext().service === "auth"
    },
    linkForAuth,
    linkForService
  ),
  cache: new InMemoryCache({ typePolicies })
})

// const httpLink = createHttpLink({
//   uri: process.env.LOCAL_AUTH_ENDPOINT,
//   credentials
// })

// let link

// if (process.env.AUTH_METHOD === "Token") {
//   const authLink = setContext((_, { headers }) => {
//     // get the authentication token from local storage if it exists
//     const token = localStorage.getItem("token")
//     // return the headers to the context so httpLink can read them
//     return {
//       headers: {
//         ...headers,
//         authorization: token ? `Bearer ${token}` : ""
//       }
//     }
//   })
//   link = authLink.concat(httpLink as any) as any // I think this might be an error with apollo-whatever, just throw 'any' on anything, I guess
// } else {
//   link = httpLink
// }

// export const client = new ApolloClient({
//   link,
//   cache: new InMemoryCache({ typePolicies })
// })
