import React, { FC, useState } from "react"
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/core/styles"
// import { withStyles } from "@material-ui/core/styles"
// import ButtonBase from "@material-ui/core/ButtonBase"
// import Container from "@material-ui/core/Container"
//import Typography from "../components/Typography"
import {
  ButtonBase,
  Container,
  Typography,
  Button,
  Grid
} from "@material-ui/core"
import AnimatedCategoryPic from "./components/AnimatedCategoryPic"
import { Link, useHistory } from "react-router-dom"
import glassReflection from "../../../assets/images/glass2.png"
import Lottie from "lottie-react"
import demoBasic from "../../../assets/lottie/demo-basic.json"
import demoMedia from "../../../assets/lottie/demo-media.json"
import demoClick from "../../../assets/lottie/demo-click.json"
import demoInteraction from "../../../assets/lottie/demo-interactions.json"
import demoPackaging from "../../../assets/lottie/demo-packaging.json"
import demoNav from "../../../assets/lottie/demo-nav.json"
import demoDragDrop from "../../../assets/lottie/demo-drag-drop.json"
import demoQuiz from "../../../assets/lottie/demo-quiz.json"
import demoVars from "../../../assets/lottie/demo-variables.json"

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(4),
    borderRadius: "3px",
    boxShadow:
      "0px 5px 10px rgba(0,0,0,0.3), inset -3px -3px 3px rgb(0 0 0 / 4%), inset 4px 4px 4px rgb(255 255 255 / 35%)",
    // backdropFilter: "blur(4px) brightness(1.2) contrast(0.95) opacity(0.1)",
    paddingLeft: "0px",
    paddingRight: "0px",
    // backdropFilter: "blur(7px) contrast(0.85) brightness(1.3)",
    backdropFilter: "blur(5px) contrast(.55) brightness(1.25)",
    backgroundImage: `url(${glassReflection})`,
    backgroundSize: "cover",
    backgroundAttachment: "fixed"
  },
  images: {
    marginTop: theme.spacing(6),
    display: "flex",
    flexWrap: "wrap"
  },
  imageWrapper: {
    position: "relative",
    display: "flex",
    padding: 0,
    borderRadius: 0,
    height: "40vh",
    minHeight: "250px",
    //minWidth: "249px",

    [theme.breakpoints.down("sm")]: {
      width: "100% !important",
      height: 100
    },
    "&:hover": {
      zIndex: 1
    },
    "&:hover $imageBackdrop": {
      opacity: 0.4
    },
    "&:hover $imageMarked": {
      opacity: 0,
      color: "white"
    },
    "&:hover $imageTitle": {
      border: "4px solid currentColor",
      color: "white",
      backdropFilter: "blur(2px) brightness(0.9) contrast(0.8)",
      boxShadow: "0px 0px 5px rgba(0,0,0,0.15)",
      textShadow: "0px 0px 1px rgba(0,0,0,0.3)"
    },
    "&:hover $demoAnimation": {
      opacity: 0.8,
      filter: "none"
    }
  },
  imageButton: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.white
  },
  imageSrc: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%"
  },
  imageBackdrop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    background: theme.palette.common.black,
    opacity: 0.25,
    // backdropFilter: "blur(3px) brightness(0.4) contrast(1.8)",
    // //background: "rgb(248,248,248)",
    transition: theme.transitions.create("opacity")
  },
  imageTitle: {
    position: "relative",
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px 14px`,
    color: "black"
  },
  imageMarked: {
    height: 3,
    width: 18,
    background: theme.palette.common.black,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: "0s all"
  }
  // demoAnimation: {
  //   opacity: 0.35,
  //   height: "35vh"
  // }
}))

// Green rgb(129,199,132)
// blue rgb(20,130,180)
// yellow rgb(255,183,77)
// red rgb(255,134,134)

const images = [
  {
    json: demoBasic,
    title: "Basics",
    width: "40%",
    color: "rgb(120,230,250)",
    customClass: ""
  },
  {
    json: demoMedia,
    title: "Media",
    width: "20%",
    color: "rgb(100,220,245)",
    customClass: ""
  },
  {
    json: demoClick,
    title: "Click Reveals",
    width: "40%",
    color: "rgb(185,240,204)",
    customClass: ""
  },
  {
    json: demoInteraction,
    title: "Interactions",
    width: "34%",
    color: "rgb(100,220,245)",
    customClass: ""
  },
  {
    json: demoVars,
    title: "Variables",
    width: "32%",
    color: "rgb(190,245,215)",
    customClass: ""
  },
  {
    json: demoQuiz,
    title: "Quizzes",
    width: "34%",
    color: "rgb(220,209,148)",
    customClass: ""
  },
  {
    json: demoDragDrop,
    title: "Drag and Drops",
    width: "40%",
    color: "rgb(185,240,204)",
    customClass: ""
  },
  {
    json: demoNav,
    title: "Navigation",
    width: "20%",
    color: "rgb(220,209,148)",
    customClass: ""
  },
  {
    json: demoPackaging,
    title: "LMS Packages",
    width: "40%",
    color: "rgb(230,230,158)",
    customClass: "frontpage-lms-box"
  }
]

const defaultHoveredArray = images.map(() => false)

// const ProductCategories(props) {
const ProductCategories: FC = () => {
  const classes = useStyles()
  const history = useHistory()

  const [hoveredArray, setHoveredArray] = useState(defaultHoveredArray)

  // console.log("HISTORY IS")
  // console.log(history)

  return (
    <Container className={classes.root} component="section">
      <div className={classes.images}>
        {images.map((image, i) => (
          <ButtonBase
            key={image.title}
            className={classes.imageWrapper}
            style={{
              width: image.width
            }}
            onClick={() => {
              console.log("IVE BEEN CLICKED")
              history.push("/underConstruction")
            }}
            onMouseEnter={() => {
              let newHoveredArray = hoveredArray.map(() => false)
              newHoveredArray[i] = true
              setHoveredArray(newHoveredArray)
            }}
            onMouseLeave={() => {
              let newHoveredArray = hoveredArray.map(() => false)
              setHoveredArray(newHoveredArray)
            }}
          >
            <div
              className={classes.imageBackdrop}
              style={{
                background: image.color ? image.color : "white"
              }}
            />
            <AnimatedCategoryPic
              hovered={hoveredArray[i]}
              jsonFile={image.json}
              color={image.color}
              index={i}
            />
            {/* {image.json && (
              <div
                className={classes.demoAnimation}
                style={{
                  background: image.color ? image.color : "white"
                }}
              >
                <Lottie animationData={image.json} />
              </div>
            )} */}
            <div className={classes.imageButton}>
              <Typography
                component="h3"
                variant="h6"
                color="inherit"
                className={`${classes.imageTitle}`}
              >
                {image.title}
                <div className={classes.imageMarked} />
              </Typography>
            </div>
          </ButtonBase>
        ))}
      </div>
    </Container>
  )
}

export default ProductCategories
