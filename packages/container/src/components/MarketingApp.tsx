// @ts-ignore
import { mount } from "marketing/MarketingApp"
import React, { useRef, useEffect } from "react"
import { Location, LocationListener } from "history"
import { useHistory } from "react-router-dom"

interface IMountReturnObject {
  onParentNavigate?: LocationListener<unknown>
}

const MarketingApp: React.FC = () => {
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
      }
    })

    history.listen(onParentNavigate)
  }, [])

  return <div ref={ref} />
}

export default MarketingApp
