import React, { FC } from "react"
import { Link } from "react-router-dom"
import Lottie, { useLottie } from "lottie-react"
import UnderConstruction from "../assets/lottie/under-construction.json"
import {
  Container,
  Typography,
  Button,
  Grid,
  Link as MuiLink
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
  note: {
    fontWeight: 100
  }
}))

const Page2: FC = () => {
  const classes = useStyles()

  return (
    <Grid
      container
      justify="center"
      direction="column"
      spacing={0}
      className="page"
    >
      <Grid item>
        <Typography variant="h2" align="center">
          Under Construction
        </Typography>
      </Grid>
      <Grid container item justify="center" direction="row">
        <Grid item>
          <Lottie animationData={UnderConstruction} />
        </Grid>
      </Grid>
      <Grid item>
        <Typography variant="h5" align="center" gutterBottom>
          The platform is still under development. Once finished I will have all
          the awesome demos.
        </Typography>
      </Grid>
      <Grid item>
        <Typography
          variant="h5"
          align="center"
          className={classes.note}
          gutterBottom
        >
          MnCup Judges: I have a prototype! I can do in-person demos. Get in
          touch!
        </Typography>
      </Grid>
      {/* <Grid item>
        <Typography
          variant="body1"
          align="center"
          className={classes.note}
          gutterBottom
        >
          (If you're heare you probably know how to contact me already)
        </Typography>
      </Grid> */}

      <Grid item>
        <Typography variant="h6" align="center" className={classes.note}>
          <Link to="/">
            <MuiLink>Go Back</MuiLink>
          </Link>
        </Typography>
      </Grid>
    </Grid>
  )
}

export default Page2
