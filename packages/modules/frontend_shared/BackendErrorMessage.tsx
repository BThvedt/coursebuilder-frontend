import React, { FC } from "react"
import { ApolloError } from "@apollo/client"
// import { Message } from "semantic-ui-react"
import { Alert, AlertTitle } from "@material-ui/lab"
import _ from "lodash"

import { Typography } from "@material-ui/core"

interface Props {
  error: ApolloError
}

const BackendErrorMessage: FC<Props> = ({ error }) => {
  let gqlErrorArray = error.graphQLErrors as any
  let networkErrorObj = error.networkError as any
  let gqlErrors: JSX.Element
  let networkErors: JSX.Element
  let otherError: JSX.Element

  if (gqlErrorArray.length) {
    gqlErrors = (
      <>
        <AlertTitle>Server Error(s):</AlertTitle>
        <ul>
          {gqlErrorArray.map((entry: any, i: number) => {
            console.log(entry)
            return (
              <li key={i}>
                <Typography>
                  <strong>
                    {entry.status} {entry.message}
                  </strong>
                </Typography>
                <br />
                {entry.reasons?.map(
                  (reason: { description: string }, i: number) => {
                    return (
                      <>
                        <Typography key={i}>{reason.description}</Typography>
                        <br />
                      </>
                    )
                  }
                )}
              </li>
            )
          })}
        </ul>
      </>
    )
  }

  if (error.networkError && !_.isEmpty(error.networkError)) {
    console.log(
      "This is untested.. not sure how to test yet .. . hopefully this works"
    )
    networkErors = (
      <>
        <AlertTitle>Network Error(s):</AlertTitle>
        <ul>
          {Object.keys(error.networkError).map((key) => {
            return (
              <li>
                <Typography>
                  <strong>{key}</strong>
                </Typography>
                <br />
                {console.log(
                  "I dont know if this is an object or what.. might have to come back to this. Right now Im just stringifying  stuff"
                )}
                <Typography>
                  {
                    // @ts-ignore
                    JSON.stringify(error.networkError[key])
                  }
                </Typography>
              </li>
            )
          })}
        </ul>
      </>
    )
  }

  if (!gqlErrorArray.length && _.isEmpty(networkErrorObj) && error.message) {
    otherError = <h5>{error.message}</h5>
  }

  let backendErrors = (
    <>
      {gqlErrors ? gqlErrors : <></>}
      {networkErors ? networkErors : <></>}
      {otherError ? otherError : <></>}
    </>
  )

  return <Alert severity="error">{backendErrors}</Alert>
}

export default BackendErrorMessage
