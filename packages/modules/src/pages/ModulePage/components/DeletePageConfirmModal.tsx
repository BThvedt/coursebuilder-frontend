import React, { FC, useState, useEffect } from "react"
import { Grid, Typography, Button } from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"
import ModalComponent from "../../../../frontend_shared/ModalComponent"

interface IProps {
  modalOpen: boolean
  setModalOpen: (open: boolean) => void
  pageName: string
  deleteFcn: () => void
}

const DeletePageConfirmModal: FC<IProps> = ({
  modalOpen,
  setModalOpen,
  pageName,
  deleteFcn
}) => {
  return (
    <ModalComponent
      open={modalOpen}
      title={"Delete Page"}
      spinner={false}
      onClose={() => {
        setModalOpen(false)
      }}
    >
      <Grid container direction="column" className="standard-padding-no-top">
        <Grid item>
          <Typography variant="h6" component="h6">
            Delete {pageName}?
          </Typography>
        </Grid>
        <Grid container className="standard-padding" direction="row-reverse">
          <Grid item>
            <Button variant="outlined" type="submit">
              <Typography
                variant="h6"
                component="h6"
                onClick={() => {
                  deleteFcn()
                  setModalOpen(false)
                }}
              >
                Delete
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </Grid>

      {/* The create form */}
    </ModalComponent>
  )
}

export default DeletePageConfirmModal
