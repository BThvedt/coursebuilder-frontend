import React, { FC } from "react"
import { Link } from "react-router-dom"

const Page1: FC = () => {
  return (
    <div>
      <p>Page 1</p>
      <p>
        <Link to="/modules/page2">Go to page 2</Link>
      </p>
    </div>
  )
}

export default Page1
