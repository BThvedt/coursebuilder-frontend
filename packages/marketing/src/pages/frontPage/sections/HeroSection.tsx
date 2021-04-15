import React, { FC } from "react"
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import HeroImg from "../../../assets/images/HeroBackgroundSmall.jpg"
import ArrowDown from "../../../assets/images/productHeroArrowDownBlue.png"
import WhiteSquareButton from "../../../components/WhiteSquareButton"
import clsx from "clsx"

const useStyles = makeStyles((theme) => ({
  root: {
    color: "#0077c1",
    position: "relative",
    display: "flex",
    alignItems: "center",
    //minHeight: 725,
    [theme.breakpoints.up("sm")]: {
      height: "78vh",
      minHeight: 600,
      maxHeight: 1300
    }
  },
  container: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(14),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  backdrop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.5,
    zIndex: -1
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    zIndex: -2
  },
  arrowDown: {
    position: "absolute",
    bottom: theme.spacing(4)
    // right: "16px"
  },
  arrowDownImg: {
    position: "relative",
    right: "16px"
  }
}))

interface Props {
  children: JSX.Element
  backgroundClassName: string
  scrollRef: React.MutableRefObject<any>
}
const HeroSection: FC<Props> = ({
  children,
  backgroundClassName,
  scrollRef
}) => {
  const classes = useStyles()

  return (
    <section className={classes.root}>
      <Container className={classes.container}>
        {children}
        {/* <div className={classes.backdrop} /> */}
        <div className={clsx(classes.background, backgroundClassName)} />
        <div className={classes.arrowDown}>
          <div
            onClick={() => {
              scrollRef.current.scrollIntoView({
                behavior: "smooth"
              })
            }}
            className={classes.arrowDownImg}
          >
            <WhiteSquareButton
              title="Learn More"
              variant="h6"
              width={300}
            ></WhiteSquareButton>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default HeroSection
