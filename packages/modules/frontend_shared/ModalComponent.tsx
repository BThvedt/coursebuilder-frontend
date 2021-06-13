import React, { FC, useEffect, useState } from "react"
import { USER, LocalLogin } from "@makeamodule/shared-frontend"
import AddIcon from "@material-ui/icons/Add"
import { Link } from "react-router-dom"
import {
  Grid,
  Button,
  Modal,
  Typography,
  IconButton,
  Color,
  CircularProgress,
  useTheme
} from "@material-ui/core"
import CloseIcon from "@material-ui/icons/Close"
import Fade from "@material-ui/core/Fade"

interface IProps {
  title: string
  open: boolean
  spinner: boolean
  onClose: () => void
}

const ModalComponent: FC<IProps> = ({
  title,
  children,
  open,
  onClose,
  spinner
}) => {
  const { palette } = useTheme()
  // const [modalOpen, setModalOpen] = useState(false)

  // useEffect(() => {
  //   if (open) {
  //     setModalOpen(true)
  //   } else {
  //     setModalOpen(false)
  //   }
  // }, [open])

  // let shit: Color

  // @ts-ignore
  return (
    <Modal
      open={open}
      onClose={onClose}
      className="to_be_moved_to_shared_modal"
    >
      <Fade in={open}>
        <div className="modal-paper">
          {spinner && (
            <div className="modal-overlay">
              <CircularProgress style={{ color: "#333" }} />
            </div>
          )}
          <Grid container>
            <Grid container item justify="space-between">
              <Grid item className="modal-title">
                <Typography variant="h5" component="h5" gutterBottom>
                  {title}
                </Typography>
              </Grid>
              <Grid item>
                {/* <IconButton style={{ color: "#333" }} onClick={onClose}> */}
                <IconButton
                  //style={{ color: palette.textColor.main }}
                  onClick={onClose}
                >
                  {/* big problem!! */}
                  <CloseIcon />
                </IconButton>
              </Grid>
            </Grid>
            <Grid container item className="modal-body">
              {children}
            </Grid>
          </Grid>
        </div>
      </Fade>
    </Modal>
  )
}

export default ModalComponent
