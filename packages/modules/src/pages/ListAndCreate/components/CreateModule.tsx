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
  Link,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from "@material-ui/core"
import { useMutation, ApolloError, useApolloClient } from "@apollo/client"
import * as yup from "yup"
import { useForm } from "react-yup"
import AddIcon from "@material-ui/icons/Add"
import ModalComponent from "../../../../frontend_shared/ModalComponent"
import { CREATE_MODULE } from "../../../grqphql/mutations"
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline"
import ArrowForwardIcon from "@material-ui/icons/ArrowForward"
import { string } from "yup/lib/locale"
import { Link as RouterLink } from "react-router-dom"
import FrontendSvrErrMsg from "../../../../frontend_shared/FrontendSvrErrMsg"
import { GET_MODULES } from "../../../grqphql/queries"

const creationSchema = yup
  .object({
    name: yup
      .string()
      .required("Name is a required field")
      .min(3, "What the .. hey, name must be at least 3 characters!"),
    responsive: yup.boolean(),
    sizes: yup.number().positive().integer().min(1).max(3)
  })
  .defined()

interface IProps {
  addModalOpen: boolean
  setAddModalOpen: (open: boolean) => void
}

interface newModuleInfo {
  id: string
  name: string
}

const CreateModule: FC<IProps> = ({ addModalOpen, setAddModalOpen }) => {
  const [spinner, setSpinner] = useState(false)
  const [formValid, setFormValid] = useState(false)
  const [responsive, setResponsive] = useState(false)
  const [newModuleInfo, setNewModuleInfo] = useState<newModuleInfo | null>(null)
  const [serverError, setServerError] = useState<ApolloError>(null)
  const { palette } = useTheme()
  const client = useApolloClient()

  const [createModule, { data: createModuleData }] = useMutation(
    CREATE_MODULE,
    {
      async onCompleted(createModuleData) {
        const { createModule: result } = createModuleData

        // display success message .. option to redirect to module page
        setSpinner(false)
        setServerError(null)
        setNewModuleInfo(result)

        // write new Module to query
        // first get the modules list .. this should be in the cache anyway
        const { getModules } = client.readQuery({
          query: GET_MODULES
        })

        // now write query to the cache .. this should update the list on the front end
        // ok this works
        client.writeQuery({
          query: GET_MODULES,
          data: {
            getModules: [
              ...getModules,
              { ...result, requesting_user_role: "owner" }
            ]
          }
        })
      },
      onError(error: ApolloError) {
        setSpinner(false)
        setServerError(error)
        console.log(error)
      }
    }
  )

  const {
    values,
    setValues,
    errors,
    field,
    createSubmitHandler
    // isValid // <-- was having trouble with this.. think it's because I got weird with the form. Anyway 'submit' works ok
  } = useForm({
    validationSchema: creationSchema
  })

  // start up backend in local mode

  const onSubmit = React.useMemo(() => {
    return createSubmitHandler((values) => {
      // console.log("SUBMITTING FORM")
      let { name, sizes } = values
      createModule({
        variables: {
          data: { name: (name as string).trim(), numOfResolutions: sizes }
        }
      })
    })
  }, [])

  // set some default values
  useEffect(() => {
    // set the default form options. This also "triggers" the errors (if the second param is true)..
    // I'd have to resort to more compliacted code to not show them right away
    setValues((v) => {
      return {
        ...v,
        sizes: 1
      }
    }, true)
  }, [])

  // sometimes I have trouble with the 'isvalid' ..
  // .. I think it's because I'm doing things kinda weird. Anyway. MANUAL VALIDATION
  // This is SOLELY for the 'submit' button. OnSubmit works fine as is (I think). Luckily errors is triggered from the get-go, or this wouldn't work!
  useEffect(() => {
    let valid = true
    Object.keys(errors).forEach((error) => {
      if (typeof errors[error] !== "undefined") {
        valid = false
      }
    })

    setFormValid(valid)
  }, [errors])

  return (
    <ModalComponent
      open={addModalOpen}
      title={newModuleInfo ? "Success!" : "Create A New Module"}
      spinner={spinner}
      onClose={() => {
        setAddModalOpen(false)
      }}
    >
      {/* The succsfully create message */}
      {newModuleInfo && (
        <div className="standard-padding-bottom" style={{ width: "100%" }}>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <CheckCircleOutlineIcon
                className="veryLargeIcon"
                style={{
                  color: palette.success.main,
                  position: "relative",
                  bottom: "5px"
                }}
              />
            </Grid>
            <Grid item>
              <Typography variant="h6" component="h6" gutterBottom>
                Module{" "}
                <Link
                  component={RouterLink}
                  to={`/module/${newModuleInfo.id}`}
                  className="frontend-link"
                >
                  {newModuleInfo.name}
                </Link>{" "}
                has been created.
              </Typography>
            </Grid>

            <Grid item>
              <Link
                component={RouterLink}
                to={`/module/${newModuleInfo.id}`}
                className="frontend-link"
              >
                <Grid
                  container
                  item
                  direction="row"
                  alignItems="center"
                  justify="center"
                >
                  <Grid item>Edit &nbsp;</Grid>
                  <Grid item>
                    <ArrowForwardIcon
                      style={{ position: "relative", top: "2px" }}
                    />
                  </Grid>
                </Grid>
              </Link>
            </Grid>
          </Grid>
        </div>
      )}
      {/* The create form */}
      {!newModuleInfo && (
        <div className="standard-padding" style={{ width: "100%" }}>
          {serverError && (
            <Typography
              variant="body2"
              gutterBottom
              style={{ color: palette.error.main }}
            >
              <FrontendSvrErrMsg error={serverError} />
            </Typography>
          )}
          <form autoComplete="off" onSubmit={onSubmit}>
            <TextField
              error={!!errors.name}
              helperText={errors.name}
              id="outlined-basic"
              label="Module Name"
              variant="outlined"
              style={{ width: "100%" }}
              name="name"
              value={values.name ? values.name : ""}
              onChange={field.onChange}
            />
            <div className="standard-padding">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={responsive}
                    onChange={() => {
                      let newResponsiveValue: boolean
                      let sizes: number
                      if (responsive) {
                        // we're going from responsive to Not responsive .. so set sizes to one
                        newResponsiveValue = false
                        sizes = 1
                      } else {
                        newResponsiveValue = true
                        sizes = 2 // meh .. just make 2 the default
                      }
                      setValues((v) => {
                        return {
                          ...v,
                          sizes
                        }
                      }, true)
                      setResponsive(newResponsiveValue)
                    }}
                    name="responsive"
                    color="primary"
                  />
                }
                label="Responsive? (warning - this can not be changed)"
              />
            </div>

            {responsive && (
              <div className="standard-padding">
                <FormControl variant="outlined" className={"sizes-select"}>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Screen Sizes
                  </InputLabel>

                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    name="sizes"
                    value={values.sizes || 2}
                    onChange={(event, value: number) => {
                      setValues((v) => {
                        return {
                          ...v,
                          sizes: event.target.value
                        }
                      }, true)
                    }}
                    label="Screen Sizes"
                  >
                    <MenuItem value={2}>2 Sizes (i.e. small, large)</MenuItem>
                    <MenuItem value={3}>
                      3 Sizes (i.e. small, med and large)
                    </MenuItem>
                  </Select>
                  <FormHelperText>Choose wisely, no going back!</FormHelperText>
                </FormControl>
              </div>
            )}

            <Grid
              container
              direction="row-reverse"
              className="standard-padding"
            >
              <Grid item>
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  type="submit"
                  disabled={!formValid}
                >
                  <Typography
                    variant="h6"
                    component="h6"
                    onClick={() => {
                      setSpinner(true)
                    }}
                  >
                    Create
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      )}
    </ModalComponent>
  )
}

export default CreateModule
