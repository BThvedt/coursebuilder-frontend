import React, { FC, lazy, Suspense, useState, useEffect } from "react"
// import { RouteComponentProps } from "react-router-dom"
import { AnonUser, USER, ME } from "@makeamodule/shared-frontend"
import { useApolloClient } from "@apollo/client"
import {
  BrowserRouter,
  Link,
  Route,
  Switch,
  useLocation,
  Router
} from "react-router-dom"
import {
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button
} from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu"
import { makeStyles } from "@material-ui/core/styles"
import { cacheSlot } from "@apollo/client/cache"
import { CallMissedSharp } from "@material-ui/icons"
const ModulesLazy = lazy(() => import("./ModulesApp"))
const NewServiceLazy = lazy(() => import("./NewServiceApp"))
import { History } from "history"

interface Props {
  siteUser?: USER // we do not get this prop in isoation
  logout: () => Promise<any> // eh I don't want to import a billion types just for this definition
  history: History
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  link: {
    color: "white",
    textDecoration: "none"
  },
  title: {
    flexGrow: 1
  },
  toolbar: {
    //justifyContent: "space-between",
    background: theme.palette.primary.dark,
    color: theme.palette.common.white,
    boxShadow: "0px 5px 10px rgba(0,0,0,0.3)"
  }
}))

const AuthorizedSection: FC<Props> = ({ siteUser, logout, history }) => {
  const [progress, setProgress] = useState(0)
  const classes = useStyles()
  const client = useApolloClient()

  // let location = useLocation()

  // useEffect(() => {
  //   console.log("TODO: Better progress. PERHAPS .. just a loading spinner")
  //   setProgress(0)
  //   setTimeout(() => {
  //     setProgress(100)
  //   })
  // }, [location])
  /* The layout is wide and non-responsive, as this app is designed to be used on desktop */

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <AppBar position="static">
          <Toolbar className={classes.toolbar}>
            <Typography variant="h6" className={classes.title}>
              <Link to="/modules/" className={classes.link}>
                Modules
              </Link>
              {/* <Link to="/new_service/" className={classes.link}>
                New Service
              </Link> */}
            </Typography>
            <Button
              color="inherit"
              onClick={() => {
                if (process.env.AUTH_METHOD === "Token") {
                  // @ts-ignore
                  localStorage.setItem("token", null)
                  client.writeQuery({
                    query: ME,
                    data: {
                      me: AnonUser
                    }
                  })
                } else if (process.env.AUTH_METHOD === "Cookie") {
                  // send message to the server to destroy session
                  logout()
                }
              }}
            >
              Logout
            </Button>
            <IconButton
              edge="end"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Router history={history}>
          <Switch>
            <Route path={["/modules", "/module/*"]}>
              <ModulesLazy siteUser={siteUser} />
            </Route>
            <Route path="/new_service">
              <NewServiceLazy siteUser={siteUser} />
            </Route>
          </Switch>
        </Router>
      </Grid>
    </div>
  )
}

export default AuthorizedSection
