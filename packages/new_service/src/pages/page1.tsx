import React, { FC } from "react"
import { Link } from "react-router-dom"
import {
  useQuery,
  useMutation,
  useApolloClient,
  useLazyQuery
} from "@apollo/client"
import { TEST } from "../grqphql/queries"

const Page1: FC = () => {
  return (
    <div>
      <p>Page 1</p>
      <p>
        <Link to="/new_service/page2">Go to page 2</Link>
      </p>
    </div>
  )
}

export default Page1
