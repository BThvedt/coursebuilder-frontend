import React, { FC } from "react"
import { ApolloError } from "@apollo/client"
// import { Message } from "semantic-ui-react"
import { Alert, AlertTitle } from "@material-ui/lab"
var html = require("react-escape-html")
import _ from "lodash"

import { Typography } from "@material-ui/core"

interface Props {
  title: string
  message: string
}

const SuccessMessage: FC<Props> = ({ title, message }) => {
  return (
    <Alert severity="success">
      <AlertTitle>{title}</AlertTitle>
      <Typography>
        <span>{message}</span>
      </Typography>
    </Alert>
  )
}

export default SuccessMessage
