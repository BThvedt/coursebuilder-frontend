import React, { FC } from "react"

import { Container, Typography, Button, Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",

    color: "white",
    backgroundColor: "#0077c1",
    position: "relative"
  },
  container: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    display: "flex"
  },
  // footerContainer: {
  //   width: "100%",
  //   backgroundColor: theme.palette.primary.dark
  // },
  iconsWrapper: {
    height: 120
  },
  icons: {
    display: "flex"
  },
  text: {
    color: "white"
  },
  icon: {
    width: 48,
    height: 48,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.palette.warning.main,
    marginRight: theme.spacing(1),
    "&:hover": {
      backgroundColor: theme.palette.warning.dark
    }
  },
  list: {
    margin: 0,
    listStyle: "none",
    padding: 0
  },
  listItem: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5)
  },
  language: {
    marginTop: theme.spacing(1),
    width: 150
  },
  footerContainer: {
    position: "relative"
  }
}))

const Footer: FC = ({}) => {
  const classes = useStyles()
  return (
    <Grid container item className={classes.root} direction="column">
      <Container className={classes.container}>
        <Grid container spacing={5}>
          <Grid item xs={6} sm={4} md={3}>
            <Grid item>
              <Typography variant="body1">© MakeAModule.io 2021</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Container>

      {/*<Grid container item className={classes.root} direction="column">

       <Container className={classes.container}>
        <Grid container spacing={5}>
          <Grid item xs={6} sm={4} md={3}>
            <Grid
              container
              direction="column"
              justify="flex-end"
              className={classes.iconsWrapper}
              spacing={2}
            >
              <Grid item>
                <Typography variant="body1">© MakeAModule.io 2021</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container> 
      </Grid>*/}
    </Grid>
  )
}

export default Footer
