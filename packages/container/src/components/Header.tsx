import React, { FC } from "react"
import {
  Grid,
  AppBar,
  Toolbar,
  Link as MuiLink,
  Typography
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { Link, useLocation } from "react-router-dom"

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    zIndex: 11
  },
  link: {
    color: "white",
    textDecoration: "none"
  },
  toolbar: {
    justifyContent: "space-between",
    background: theme.palette.primary.dark,
    color: theme.palette.common.white,
    boxShadow: "0px 5px 10px rgba(0,0,0,0.3)"
  },
  title: {
    fontSize: 24,
    fontWeight: theme.typography.fontWeightLight
  },
  left: {
    flex: 1
  },
  leftLinkActive: {
    color: theme.palette.common.white
  },
  right: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end"
  },
  rightLink: {
    fontSize: 16,
    color: theme.palette.common.white,
    marginLeft: theme.spacing(3),
    fontWeight: 100
  },
  leftLink: {}
}))

interface IProps {
  isSignedIn: boolean
  setIsSignedIn: (signedInState: boolean) => void
}

const Header: FC<IProps> = ({ isSignedIn, setIsSignedIn }) => {
  const classes = useStyles()
  const location = useLocation()

  // console.log("Location is")
  // console.log(location)

  return (
    // <div>
    //   <Link to="/">App</Link>{" "}
    //   {isSignedIn && (
    //     <>
    //       <Link to="/modules/page1">Modules</Link>{" "}
    //     </>
    //   )}
    //   {isSignedIn ? (
    //     <button onClick={() => setIsSignedIn(false)}>Logout</button>
    //   ) : (
    //     <Link to="/auth/signin">Login</Link>
    //   )}
    // </div>
    <Grid item className={classes.root}>
      <AppBar elevation={0} position="static">
        <Toolbar className={classes.toolbar}>
          <div className={classes.left} />

          <Typography color="inherit" variant="h6" className={classes.title}>
            <Link to="/" className={classes.link}>
              {"MakeAModule.io"}
            </Link>
          </Typography>
          <div className={classes.right}>
            <Typography
              color="inherit"
              variant="h6"
              className={classes.rightLink}
            >
              {isSignedIn || location.pathname === "/auth/signin" ? (
                <></>
              ) : (
                <Link to="/auth/signin" className={classes.link}>
                  {"Sign In"}
                </Link>
              )}
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
    </Grid>
  )
}

export default Header
