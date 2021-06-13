import { USER } from "@makeamodule/shared-frontend"
import { createContext, useContext } from "react"
type TheContext = {
  bodyClickCounter: number
  incrementBodyClickCounter: () => void
  user: USER | null
  setUser: (user: USER) => void
}
export const ModuleContext = createContext<TheContext>({
  bodyClickCounter: 0, // set a default value
  incrementBodyClickCounter: () => {},
  user: null, // set a default value
  setUser: () => {}
})
