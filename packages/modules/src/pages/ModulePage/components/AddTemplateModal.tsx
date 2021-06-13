import React, { FC, useState, useEffect } from "react"
import {
  Grid,
  Typography,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  useTheme,
  Link
} from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"
import ModalComponent from "../../../../frontend_shared/ModalComponent"

interface IProps {
  modalOpen: boolean
  setModalOpen: (open: boolean) => void
  addFcn: () => void
}

const AddTemplateModal: FC<IProps> = ({ modalOpen, setModalOpen, addFcn }) => {
  const onSubmit = () => {
    console.log("form submeitted")
  }
  return (
    <ModalComponent
      open={modalOpen}
      title={"Add Template"}
      spinner={false}
      onClose={() => {
        setModalOpen(false)
      }}
    >
      <Grid container direction="column" className="standard-padding-no-top">
        <Grid item>
          <Typography variant="body1" gutterBottom>
            In the future, down the line, some kind of selector/search for the
            templates should be here. For now, just copy/paste the template ID
          </Typography>
        </Grid>
        <Grid item>
          <form autoComplete="off" onSubmit={onSubmit}>
            <TextField
              // error={!!errors.name}
              // helperText={errors.name}
              id="outlined-basic"
              label="Template ID"
              variant="outlined"
              style={{ width: "100%" }}
              name="name"
              // value={values.name ? values.name : ""}
              // onChange={field.onChange}
            />
          </form>
        </Grid>
        <Grid container className="standard-padding" direction="row-reverse">
          <Grid item>
            <Button variant="outlined" type="submit">
              <Typography
                variant="h6"
                component="h6"
                onClick={() => {
                  addFcn()
                  setModalOpen(false)
                }}
              >
                Add
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </Grid>

      {/* The create form */}
    </ModalComponent>
  )
}

export default AddTemplateModal
