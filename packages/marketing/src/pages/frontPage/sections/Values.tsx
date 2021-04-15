import React, { FC } from "react"
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/core/styles"
import { Container, Grid, Typography, ButtonBase } from "@material-ui/core"
import * as LottiePlayer from "@lottiefiles/lottie-player"
import Lottie from "lottie-react"
import collabAnim from "../../../assets/lottie/onlineMeetings.json"
import htmlAnim from "../../../assets/lottie/html.json"
import chainAnim from "../../../assets/lottie/breakingChain.json"
import ArrowDown from "../../../assets/images/productHeroArrowDownBlue.png"
import useWindowDimensions from "../../../hooks/WindowResize"

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    overflow: "hidden",
    boxShadow: "0px 5px 10px rgba(0,0,0,0.3)",
    // paddingLeft: theme.spacing(2),
    // paddingRight: theme.spacing(2),
    background: "white",
    position: "relative",
    paddingBottom: theme.spacing(8)
    // backgroundColor: theme.palette.secondary.light
  },
  container: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(10),
    display: "flex",
    position: "relative"
  },
  leftColumn: {
    position: "relative",
    left: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
      left: theme.spacing(0)
    }
    // [theme.breakpoints.down("xs")]: {
    //   width: 350,
    //   marginBottom: "0.5em",
    //   marginTop: "1em"
    // }
  },
  rightColumn: {
    position: "relative",
    right: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
      right: theme.spacing(0)
    }
  },
  item: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(0, 5)
  },
  image: {
    height: 55
  },
  title: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2)
    // fontWeight: 100
  },
  curvyLines: {
    pointerEvents: "none",
    position: "absolute",
    top: -180
  },
  lightFontWeight: {
    fontWeight: 100
  },
  arrowDown: {
    position: "absolute",
    width: "100%",
    textAlign: "center",
    bottom: theme.spacing(7),
    cursor: "pointer"
    // right: "16px"
  },
  arrowDownImg: {
    position: "relative",
    right: "16px"
  }
}))

interface Props {
  scrollRef: React.MutableRefObject<any>
}

const Values: FC<Props> = ({ scrollRef }) => {
  const classes = useStyles()
  const { height: winHeight, width: winWidth } = useWindowDimensions()
  // console.log(collabJson)
  return (
    <section className={classes.root}>
      <Container className={classes.container}>
        {/* <img
          src="/static/themes/onepirate/productCurvyLines.png"
          className={classes.curvyLines}
          alt="curvy lines"
        /> */}

        <Grid container spacing={5}>
          <Grid item xs={12} md={4} className={classes.leftColumn}>
            <div className={classes.item}>
              <div
                style={{
                  width:
                    winWidth > 1200
                      ? "445px"
                      : winWidth <= 1200 && winWidth > 960
                      ? "400px"
                      : winWidth <= 960 && winWidth > 600
                      ? "445px"
                      : "350px",
                  height:
                    winWidth > 1200
                      ? "312px"
                      : winWidth <= 1200 && winWidth > 960
                      ? "290px"
                      : winWidth <= 960 && winWidth > 600
                      ? "312px"
                      : "260px"
                }}
              >
                <Lottie animationData={collabAnim} />
              </div>
              <Typography variant="h6" className={classes.title}>
                One Place to Collaborate
              </Typography>
              <Typography variant="h6" className={classes.lightFontWeight}>
                A single place where multiple parties can view, review, edit,
                and develop so everyone is always on the same page. We
                streamline working with multiple parties and prevent unnecessary
                development complecations.
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <div
                style={{
                  width:
                    winWidth > 1200
                      ? "400px"
                      : winWidth <= 1200 && winWidth > 960
                      ? "360px"
                      : winWidth <= 960 && winWidth > 600
                      ? "400px"
                      : "360px",
                  height:
                    winWidth > 1200
                      ? "312px"
                      : winWidth <= 1200 && winWidth > 960
                      ? "290px"
                      : winWidth <= 960 && winWidth > 600
                      ? "312px"
                      : "260px",
                  position: "relative",
                  bottom: "45px"
                }}
                // style={{
                //   width: "400px",
                //   height: "312px",
                //   position: "relative",
                //   bottom: "45px"
                // }}
              >
                <Lottie animationData={htmlAnim} />
              </div>
              <Typography variant="h6" className={classes.title}>
                Simple, Powerful, HTML5
              </Typography>
              <Typography variant="h6" className={classes.lightFontWeight}>
                Responsive? Stylable? Templateable? Translatable? Yep. All done
                using components with such fluid and flexible power that your
                clients might start thinking you hired your own JavaScript
                developer.
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4} className={classes.rightColumn}>
            <div className={classes.item}>
              <div
                style={{
                  width:
                    winWidth > 1200
                      ? "400px"
                      : winWidth <= 1200 && winWidth > 960
                      ? "360px"
                      : winWidth <= 960 && winWidth > 600
                      ? "400px"
                      : "360px",
                  height:
                    winWidth > 1200
                      ? "312px"
                      : winWidth <= 1200 && winWidth > 960
                      ? "290px"
                      : winWidth <= 960 && winWidth > 600
                      ? "312px"
                      : "260px",
                  position: "relative",
                  bottom: "45px",
                  left: winWidth > 960 ? "20px" : "0px"
                }}
                // style={{
                //   width: "400px",
                //   position: "relative",
                //   bottom: "45px",
                //   left: "20px"
                // }}
              >
                <Lottie animationData={chainAnim} />
              </div>
              <Typography variant="h6" className={classes.title}>
                No more Chains
              </Typography>
              <Typography variant="h6" className={classes.lightFontWeight}>
                Let tech work for you instead of constrain you. Besides great
                tools, we offer development services. Do you or your clients
                want a truly custom learning solution? We believe inoovation is
                great business. We can build your idea.
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Container>
      {/* <Grid container item justify="center"> */}
      <div
        className={classes.arrowDown}
        onClick={() => {
          scrollRef.current.scrollIntoView({
            behavior: "smooth"
          })
        }}
      >
        <img
          className={classes.arrowDownImg}
          src={ArrowDown}
          height="16"
          width="12"
          alt="arrow down"
        />
      </div>
    </section>
  )
}

export default Values
