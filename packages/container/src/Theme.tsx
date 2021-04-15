import { createMuiTheme } from "@material-ui/core/styles"
import blue from "@material-ui/core/colors/blue"
import green from "@material-ui/core/colors/green"

const theme = createMuiTheme({
  // breakpoints: {
  //   values: {
  //     xs: 0,
  //     sm: 600,
  //     md: 960,
  //     lg: 1280,
  //     xl: 1920
  //   }
  // },
  palette: {
    primary: {
      main: blue[400]
    },
    secondary: {
      main: green[500]
    }
  }
})

export default theme
