import React, { FC } from "react"
import { Link } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"
import {
  Button,
  Avatar,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link as MaterialUiLink,
  Grid,
  Box,
  Typography,
  Container
} from "@material-ui/core"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined" // builder might just use fonteaweome - don't want to couple with css framework after all

// console.log('TODO - Font awesome')

interface IProps {
  onSignIn: () => void
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.dark
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: theme.palette.primary.dark,
    color: "white"
  }
}))

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <MaterialUiLink color="inherit" href="https://material-ui.com/">
        MakeAModule.io
      </MaterialUiLink>{" "}
      {new Date().getFullYear()}
    </Typography>
  )
}

const Signin: FC<IProps> = ({ onSignIn }) => {
  // console.log("IN Signin and type of onSign IN is")
  // console.log(typeof onSignIn)

  const classes = useStyles()

  return (
    <>
      {/* <h2>Signin</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          onSignIn()
        }}
      >
        <p>
          <label htmlFor="username">Email</label>
          <input name="username" id="username" />
        </p>
        <p>
          <label htmlFor="password">Password</label>
          <input name="password" id="password" type="password" />
        </p>
        <button>Signin</button>
      </form>
      <Link to="/auth/signup">SignUp</Link> */}

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                {/* <MaterialUiLink href="#" variant="body2">
                  Forgot password?
                </MaterialUiLink> */}
              </Grid>
              {/* <Grid item>
                <MaterialUiLink href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </MaterialUiLink>
              </Grid> */}
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </>
  )
}

export default Signin
