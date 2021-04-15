import React, { FC } from "react"
import { Typography, ButtonBase, TypographyClassKey } from "@material-ui/core"
import { Variant } from "@material-ui/core/styles/createTypography"
import { makeStyles } from "@material-ui/core/styles"

/*
  Note... I thought this would be a useful component .. but probably not haha
  might have to remake eventually if I want to keep using it
  Also, it's a blue button now I guess. 
*/

const useStyles = makeStyles((theme) => ({
  whiteButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#0077c2"
  },
  imageTitle: {
    position: "relative",
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${
      theme.spacing(1) + 6
    }px`,
    fontWeight: 100
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: "#0077c2",
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity")
  },
  buttonStyles: {
    margin: 0,
    padding: 0,

    "& $imageTitle": {
      border: "3px solid transparent"
    },
    "&:hover, &$focusVisible": {
      "& $imageMarked": {
        opacity: 0
      },
      "& $imageTitle": {
        border: "3px solid currentColor"
      }
    }
  }
}))

interface Props {
  title: string
  variant?: Variant
  width?: number
}

const WhiteSquareButton: FC<Props> = ({ title, variant, width }) => {
  const classes = useStyles()
  return (
    <ButtonBase
      focusRipple
      className={classes.buttonStyles}
      // style={{
      //   width: width ? width : "auto"
      // }}
    >
      <span className={classes.whiteButton}>
        <Typography
          component="span"
          color="inherit"
          className={classes.imageTitle}
          variant={variant ? variant : "body1"}
        >
          {title}
          <span className={classes.imageMarked} />
        </Typography>
      </span>
    </ButtonBase>
  )
}

export default WhiteSquareButton
