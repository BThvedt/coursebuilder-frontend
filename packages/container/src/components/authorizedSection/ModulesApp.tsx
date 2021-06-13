// @ts-ignore
import { mount } from "modules/ModulesApp"
import React, { useRef, useEffect } from "react"
import { Location, LocationListener } from "history"
import { USER } from "@makeamodule/shared-frontend"
import { useHistory } from "react-router-dom"

interface IProps {
  siteUser?: USER
}

interface IMountReturnObject {
  onParentNavigate?: LocationListener<unknown>
  siteUser?: USER
}

const ModulesApp: React.FC<IProps> = ({ siteUser }) => {
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
      siteUser
    })

    history.listen(onParentNavigate)
  }, [])

  return <div ref={ref} />
}

export default ModulesApp
