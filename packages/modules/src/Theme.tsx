import { createMuiTheme } from "@material-ui/core/styles"
import blue from "@material-ui/core/colors/blue"
import green from "@material-ui/core/colors/green"
import React from "react"

// declare module "@material-ui/core/styles/createMuiTheme" {
//   interface Theme {
//     status: {
//       danger: React.CSSProperties["color"]
//     }
//   }
//   interface ThemeOptions {
//     status: {
//       danger: React.CSSProperties["color"]
//     }
//   }
// }

declare module "@material-ui/core/styles/createPalette" {
  interface Palette {
    textColor: Palette["primary"]
  }
  interface PaletteOptions {
    textColor: PaletteOptions["primary"]
  }
}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[400]
    },
    secondary: {
      main: green[500]
    },
    textColor: {
      main: "#333" // <-- NEW COLOR
    }
  }
})

export default theme
