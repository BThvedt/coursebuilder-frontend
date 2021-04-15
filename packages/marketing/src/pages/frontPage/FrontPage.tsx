import React, { FC, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"

import { Container, Typography, Button, Grid } from "@material-ui/core"
// import HeroImg from "../../assets/images/HeroBackgroundSmall.jpg"
import LargeLogo from "../../assets/images/MakeAModule Logo Large Blue.png"
import Sunrise from "../../assets/lottie/sunrise.json"
import { AppBar, Toolbar, Link as MuiLink } from "@material-ui/core"
import clsx from "clsx"
import HeroSection from "./sections/HeroSection"
import Values from "./sections/Values"
import WhiteSquareButton from "../../components/WhiteSquareButton"
import Categories from "./sections/Categories"
import Lottie, { useLottie } from "lottie-react"
import Footer from "./sections/Footer"
import BackgroundDots from "../../assets/lottie/21317-wave-loop.json"
import footerWave from "../../assets/lottie/footer-wave.json"

const useStyles = makeStyles(
  (theme) => {
    return {
      largeLogo: {
        width: 500,
        position: "relative",
        left: "1%",
        marginBottom: "1em",
        [theme.breakpoints.down("sm")]: {
          width: 450,
          marginBottom: "0.6em"
        },
        [theme.breakpoints.down("xs")]: {
          width: 350,
          marginBottom: "0.5em",
          marginTop: "1em"
        }
      },
      background: {
        // backgroundImage: `url(${HeroImg})`,
        // backgroundColor: "#7fc7d9", // Average color of the background image.
        backgroundPosition: "center"
      },
      title: {
        fontSize: 24,
        fontWeight: theme.typography.fontWeightLight
      },
      // image_2: {
      //   [theme.breakpoints.down("xs")]: {
      //     backgroundColor: "purple"
      //   },
      //   [theme.breakpoints.between("xs", "sm")]: {
      //     backgroundColor: "yellow"
      //   }
      // },
      heroTitle: {
        [theme.breakpoints.down("sm")]: {
          fontSize: "4.5rem"
        },
        [theme.breakpoints.down("xs")]: {
          fontSize: "3.5rem"
        }
      },
      heroText: {
        // textShadow: "0px 0px 3px rgb(255,255,255)",
        fontWeight: theme.typography.fontWeightLight
      },
      placeholder: {
        height: 64,
        [theme.breakpoints.up("sm")]: {
          height: 70
        }
      },
      toolbar: {
        justifyContent: "space-between",
        background: theme.palette.primary.dark,
        color: theme.palette.common.white,
        boxShadow: "0px 5px 10px rgba(0,0,0,0.3)"
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
        justifyContent: "flex-end",
        fontWeight: 100
      },
      rightLink: {
        fontSize: 16,
        color: theme.palette.common.white,
        marginLeft: theme.spacing(3)
      },
      linkSecondary: {
        color: theme.palette.secondary.main
      },
      headerText: {
        padding: theme.spacing(6),
        fontWeight: 100,
        textAlign: "center"
      },
      demosAndTutorialsText: {
        padding: theme.spacing(3),
        marginTop: theme.spacing(3),
        fontWeight: 100,
        position: "relative",
        right: "8px"
      },
      imageMarked: {
        height: 2,
        width: 18,
        background: theme.palette.common.black,
        position: "absolute",
        bottom: -2,
        left: "calc(50% - 28px)"
      },
      nonBackground: {
        position: "relative",
        zIndex: 10
      },
      bottomButton: {
        border: "2px solid currentColor",
        borderRadius: 0,
        height: "auto",
        padding: theme.spacing(2, 5),
        display: "block",
        marginTop: theme.spacing(3),
        fontWeight: 100,
        textAlign: "center",
        [theme.breakpoints.down("xs")]: {
          fontSize: "2rem"
        }
      },
      link: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        fontWeight: 100
      },
      buoy: {
        width: 60
      },

      dots: {
        position: "fixed",
        bottom: "40%",
        left: 0,
        width: "100%",
        zIndex: 0,
        filter: "opacity(0.17) blur(2px) brightness(1.15)",
        transform: "scale(1.8)"
      },
      sun: {
        position: "fixed",
        bottom: "6%",
        left: 0,
        width: "100%",
        zIndex: 0,
        filter: "opacity(0.2) blur(2px) brightness(1.1)",
        transform: "scale(1.2)",
        [theme.breakpoints.down("md")]: {
          bottom: "9%"
        },
        [theme.breakpoints.down("sm")]: {
          bottom: "21%"
        },
        [theme.breakpoints.down("xs")]: {
          bottom: "39%"
        }
      },
      // heroGradient: {
      //   position: "absolute",
      //   top: 0,
      //   left: 0,
      //   width: "100%",
      //   height: "100vh",
      //   background:
      //     "radial-gradient(ellipse at center, rgba(0,119,194,1) 5%, rgba(0,119,194,0.25) 50%, rgba(0,119,194,0) 75%);"
      // },
      wave: {
        // position: "absolute",
        // top: "0",
        // left: "0",
        width: "100%",
        // height: "80px"
        transform: "rotate(180deg) scaleY(0.4) translateY(-77%)"
      }
    }
  },
  { index: 1 }
)

const FrontPage: FC = () => {
  const classes = useStyles()
  const values = useRef(null)
  const demos = useRef(null)

  return (
    <div className="page">
      {/* <div className={classes.dots}>
        <Lottie animationData={BackgroundDots} />
      </div> */}
      <div className={classes.sun}>
        <Lottie animationData={Sunrise} />
      </div>
      {/* <div className={classes.heroGradient}></div> */}

      <Grid
        container
        justify="center"
        direction="column"
        spacing={0}
        className={classes.nonBackground}
      >
        {/* <Grid item>
          <AppBar elevation={0} position="static">
            <Toolbar className={classes.toolbar}>
              <div className={classes.left} />
              <MuiLink
                variant="h6"
                underline="none"
                color="inherit"
                className={classes.title}
                href="/premium-themes/onepirate/"
              >
                {"MakeAModule.io"}
              </MuiLink>
              <div className={classes.right}>
                <MuiLink
                  color="inherit"
                  variant="h6"
                  underline="none"
                  className={classes.rightLink}
                  href="/premium-themes/onepirate/sign-in/"
                >
                  {"Sign In"}
                </MuiLink>
              </div>
            </Toolbar>
          </AppBar>
        </Grid> */}

        <Grid item>
          <HeroSection
            backgroundClassName={classes.background}
            scrollRef={values}
          >
            <Grid container justify="center" direction="column" spacing={4}>
              <Grid container item justify="center">
                <img
                  src={LargeLogo}
                  alt="MakeAModule Logo"
                  className={classes.largeLogo}
                />
              </Grid>
              <Grid container item justify="center" direction="column">
                <Grid item>
                  <Typography
                    variant="h1"
                    align="center"
                    gutterBottom
                    className={classes.heroTitle}
                  >
                    MakeAModule.io
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    variant="h4"
                    align="center"
                    className={classes.heroText}
                  >
                    Dream and Build ..
                  </Typography>
                </Grid>
              </Grid>
              {/* <Grid container item justify="center" direction="row">
                <span
                  style={{ position: "relative", right: "15px" }}
                  onClick={() => {
                    values.current.scrollIntoView({
                      behavior: "smooth"
                    })
                  }}
                >
                  <WhiteSquareButton
                    title="Learn More"
                    variant="h6"
                    width={300}
                  ></WhiteSquareButton>
                </span>


              </Grid> */}
            </Grid>
          </HeroSection>
        </Grid>

        <Grid
          container
          item
          justify="center"
          style={{ position: "relative" }}
          ref={values}
        >
          <Typography variant="h4" className={classes.headerText}>
            A powerful, collaborative platform to create fluid, interactive
            eLearning.
          </Typography>
        </Grid>
        <Grid container item justify="center">
          <Values scrollRef={demos} />
        </Grid>
        <Grid container item justify="center" style={{ position: "relative" }}>
          <Typography
            variant="h4"
            className={`${classes.demosAndTutorialsText}`}
            ref={demos}
          >
            Demos and Tutorials
          </Typography>
          <div className={classes.imageMarked} />
        </Grid>
        <Grid item>
          <Categories />
        </Grid>
        <Grid
          container
          item
          justify="center"
          alignItems="center"
          direction="column"
        >
          <Grid item>
            {/* <Button className={classes.button}> */}
            <Typography
              variant="h4"
              component="span"
              className={classes.bottomButton}
            >
              A new dawn for eLearning. Coming Soon.
            </Typography>
            {/* </Button> */}
          </Grid>
          <Grid item>
            <Typography variant="h5" className={classes.link}>
              Awaken design ..
            </Typography>
          </Grid>
        </Grid>

        {/* <Footer /> */}
        <div className={classes.wave}>
          <Lottie animationData={footerWave} />
        </div>
      </Grid>
      <Footer />
    </div>
  )
}

export default FrontPage
