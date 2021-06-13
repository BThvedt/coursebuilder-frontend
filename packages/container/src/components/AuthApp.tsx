// @ts-ignore
import { mount } from "auth/AuthApp"
import React, { useRef, useEffect } from "react"
import { Location, LocationListener } from "history"
import { useHistory } from "react-router-dom"
import { USER } from "@makeamodule/shared-frontend"

interface IProps {
  onSignIn: (userData: USER) => void
}

interface IMountReturnObject {
  onParentNavigate?: LocationListener<unknown>
  onSignIn?: string
}

const AuthApp: React.FC<IProps> = ({ onSignIn }) => {
  const ref = useRef(null)
  const history = useHistory()

  useEffect(() => {
    const { onParentNavigate }: IMountReturnObject = mount(ref.current, {
      initialPath: history.location.pathname,
      onNavigate: ({ pathname: nextPathName }: Location) => {
        const { pathname } = history.location

        if (pathname !== nextPathName) {
          history.push(nextPathName)
        }
      },
      onSignIn
    })

    history.listen(onParentNavigate)
  }, [])

  return <div ref={ref} />
}

export default AuthApp
