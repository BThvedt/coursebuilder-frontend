import React, { FC, useState, useEffect, useRef } from "react"
import Lottie from "lottie-react"
import { makeStyles } from "@material-ui/core/styles"
import useWindowDimensions from "../../../../hooks/WindowResize"
import {
  ButtonBase,
  Container,
  Typography,
  Button,
  Grid
} from "@material-ui/core"
import { CompassCalibrationOutlined } from "@material-ui/icons"

const useStyles = makeStyles((theme) => ({
  // demoanimation
  demoAnimation: {
    opacity: 0.25,
    height: "35vh",
    minHeight: "250px",
    minWidth: "249px",
    transition: "opacity 0.3s",
    overflow: "hidden",
    "&.hovered": {
      opacity: 0.8
      // filter: "none"
    }
  }
  // image_0: {
  //   [theme.breakpoints.down("xs")]: {
  //     backgroundColor: "purple"
  //   },
  //   [theme.breakpoints.between("xs", "sm")]: {
  //     backgroundColor: "green"
  //   }
  // },
  // image_1: {
  //   [theme.breakpoints.down("xs")]: {
  //     backgroundColor: "purple"
  //   },
  //   [theme.breakpoints.between("xs", "sm")]: {
  //     backgroundColor: "orange"
  //   }
  // },
  // image_2: {
  //   [theme.breakpoints.down("xs")]: {
  //     backgroundColor: "purple"
  //   },
  //   [theme.breakpoints.between("xs", "sm")]: {
  //     backgroundColor: "yellow"
  //   }
  // },
  // image_3: {
  //   [theme.breakpoints.down("xs")]: {
  //     backgroundColor: "purple"
  //   },
  //   [theme.breakpoints.between("xs", "sm")]: {
  //     backgroundColor: "green"
  //   }
  // },
  // image_4: {
  //   [theme.breakpoints.down("xs")]: {
  //     backgroundColor: "purple"
  //   },
  //   [theme.breakpoints.between("xs", "sm")]: {
  //     backgroundColor: "blue"
  //   }
  // },
  // image_5: {
  //   [theme.breakpoints.down("xs")]: {
  //     backgroundColor: "purple"
  //   },
  //   [theme.breakpoints.between("xs", "sm")]: {
  //     backgroundColor: "blue"
  //   }
  // },
  // image_6: {
  //   [theme.breakpoints.down("xs")]: {
  //     backgroundColor: "purple"
  //   },
  //   [theme.breakpoints.between("xs", "sm")]: {
  //     backgroundColor: "blue"
  //   }
  // },
  // image_7: {
  //   [theme.breakpoints.down("xs")]: {
  //     backgroundColor: "purple"
  //   },
  //   [theme.breakpoints.between("xs", "sm")]: {
  //     backgroundColor: "blue"
  //   }
  // },
  // image_8: {
  //   [theme.breakpoints.down("xs")]: {
  //     backgroundColor: "purple"
  //   },
  //   [theme.breakpoints.between("xs", "sm")]: {
  //     backgroundColor: "blue"
  //   }
  // }
}))

interface Props {
  jsonFile: any
  color: string
  hovered: boolean
  index: number
}

const getWidth = (
  height: number | undefined,
  width: number | undefined,
  winWidth: number,
  winHeight: number
) => {
  if (winWidth < 960) {
    console.log("asdf")
    return 250
  }

  if (!height || !width) {
    return "auto"
  }

  if (height > width) {
    return "auto"
  } else {
    return height + 1
  }
}

const AnimatedCategoryPic: FC<Props> = ({
  jsonFile,
  color,
  hovered,
  index
}) => {
  const classes = useStyles()
  const divRef = useRef(null)
  const { height: winHeight, width: winWidth } = useWindowDimensions()

  const [width, setWidth] = useState<number | string>(0)
  const [dummyTrigger, setDummyTrigger] = useState(false)

  useEffect(() => {
    setDummyTrigger(true)
  }, [])

  useEffect(() => {
    setWidth(
      getWidth(
        divRef.current?.clientHeight,
        divRef.current?.clientWidth,
        winWidth,
        winHeight
      )
    )
  }, [hovered, winHeight, winWidth, dummyTrigger])

  return (
    <div
      className={`${classes.demoAnimation} ${
        hovered ? "hovered" : "not-hovered"
      }`}
      // style={{
      //   background: color ? color : "white"
      // }}
      style={{ height: width < 251 ? 250 : "auto" }}
      ref={divRef}
    >
      <div style={{ width, overflow: "hidden" }}>
        {/* <Lottie
          animationData={jsonFile}
          style={{ display: hovered ? "inherit" : "none" }}
        /> */}
        <Lottie animationData={jsonFile} />
      </div>
    </div>
  )
}

export default AnimatedCategoryPic
