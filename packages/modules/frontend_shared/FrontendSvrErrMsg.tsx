import React, { FC } from "react"
import { ApolloError } from "@apollo/client"
import _ from "lodash"
import {
  Grid,
  Typography,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  useTheme,
  Link
} from "@material-ui/core"

interface Props {
  error: ApolloError
}

const FrontendSvrErrMsg: FC<Props> = ({ error }) => {
  let gqlErrorArray = error.graphQLErrors as any
  let networkErrorObj = error.networkError as any
  let gqlErrors: JSX.Element
  let networkErors: JSX.Element
  let otherError: JSX.Element

  console.log("ERROR IS")
  console.log(error)

  if (gqlErrorArray.length) {
    gqlErrors = (
      <>
        <span className="server-error-message">Server Error(s): </span>
        <ul>
          {gqlErrorArray.map((entry: any, i: number) => {
            console.log(entry)
            return (
              <li key={i}>
                <strong>
                  {entry.status} {entry.message}
                </strong>
                <br />
                {entry.reasons?.map(
                  (reason: { description: string }, i: number) => {
                    return (
                      <span key={i}>
                        {reason.description}
                        <br />
                      </span>
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
        <span>Network Error(s): </span>
        <ul>
          {Object.keys(error.networkError).map((key) => {
            return (
              <li>
                <strong>{key}</strong>
                <br />
                {console.log(
                  "I dont know if this is an object or what.. might have to come back to this. Right now Im just stringifying  stuff"
                )}
                {
                  // @ts-ignore
                  JSON.stringify(error.networkError[key])
                }
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

  console.log(backendErrors)

  return <span className="message-container">{backendErrors}</span>
}

export default FrontendSvrErrMsg
