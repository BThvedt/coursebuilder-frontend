import React, { FC, useState } from "react"
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
import { ME, LOGOUT, LoginError, USER } from "@makeamodule/shared-frontend"
import { LOGIN } from "./loginGQL"
import {
  useQuery,
  useMutation,
  useApolloClient,
  useLazyQuery
} from "@apollo/client"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined" // builder might just use fonteaweome - don't want to couple with css framework after all

interface IProps {
  onSignIn: (userData: USER) => void
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
  const [loginErrors, setLoginErrors] = useState<LoginError[]>([])
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const classes = useStyles()

  // ok, actually I want to get the user here, and then set onsignin in the parent
  const [login, { data: loginData }] = useMutation(LOGIN, {
    async onCompleted(loginData) {
      const { login: result } = loginData

      setLoginErrors([])

      // The logic of whether it's a token or a cookie happen in "Container"
      console.log("RESULT IS sdfgsdfgsdgfsdfgsdfgsdf")
      console.log(result)

      onSignIn(result)
    },
    onError(err) {
      let returnedErrors = err.graphQLErrors as any
      let loginErrors: LoginError[] = []

      returnedErrors.forEach((err: LoginError, i: number) => {
        let { status, message, reasons } = err
        loginErrors.push({
          status,
          message,
          reasons
        })
      })

      setLoginErrors(loginErrors)
    }
  })

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={(e) => {
              e.preventDefault()
              //onSignIn()
              login({ variables: { data: { email, password } } })
            }}
          >
            {loginErrors.length
              ? loginErrors.map((error, i) => {
                  return (
                    <p key={i}>
                      {error.status} {error.message}
                      <br />{" "}
                      {error?.reasons?.map((reason, i) => (
                        <span key={i}>{reason.description}</span>
                      ))}
                    </p>
                  )
                })
              : null}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={(e) => {
                setEmail(e.target.value)
              }}
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
              onChange={(e) => {
                setPassword(e.target.value)
              }}
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
              <Grid item xs></Grid>
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
