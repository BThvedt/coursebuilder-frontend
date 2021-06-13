import React, { FC, useEffect, useState, useContext } from "react"
import { USER, LocalLogin } from "@makeamodule/shared-frontend"
import { ModuleContext } from "../../Context"
import {
  enterTransitions,
  exitTransitions
} from "../../../frontend_shared/transitions"
import BackendErrorMessage from "../../../frontend_shared/BackendErrorMessage"
import SuccessMessage from "../../../frontend_shared/SuccessMessage"
import {
  Grid,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  TableBody,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TableHead,
  Button,
  useTheme,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
  Backdrop
} from "@material-ui/core"
import { Alert, AlertTitle } from "@material-ui/lab"
import {
  useQuery,
  useMutation,
  useApolloClient,
  useLazyQuery,
  ApolloError
} from "@apollo/client"
import AddIcon from "@material-ui/icons/Add"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import { Link as RouterLink } from "react-router-dom"
import { GET_MODULE } from "../../grqphql/queries"
import FrontendSvrErrMsg from "../../../frontend_shared/FrontendSvrErrMsg"
import { useParams } from "react-router-dom"
// import { Module } from "webpack"
import { Module } from "../../../generated/graphql-frontend"
import CloseIcon from "@material-ui/icons/Close"
//import { BorderColor, CopyrightRounded } from "@material-ui/icons"
import { UPDATE_MODULE } from "../../grqphql/mutations"
import DeleteModuleModal from "./components/DeleteModuleModal"
import * as yup from "yup"
import { useForm } from "react-yup"
import {
  hasAccessLevel,
  hasModuleRoleLevel,
  OrgRoleName,
  UserRoleName
} from "../../../frontend_shared/permissions"

const creationSchema = yup
  .object({
    name: yup
      .string()
      .required("Name is a required field")
      .min(3, "What the .. hey, name must be at least 3 characters!"),
    resolutions: yup.array().of(
      yup.object().shape({
        width: yup.number(), // should do fancy verification stuff later
        height: yup.number(),
        breakpoint: yup.number()
      })
    ),
    sizes: yup.number().positive().integer().min(1).max(3),
    transitions: yup.array().of(
      yup.object().shape({
        type: yup.string(), // should do fancy verification stuff later
        enter: yup.string(),
        enterDuration: yup.number(),
        exit: yup.string(),
        exitDuration: yup.number()
      })
    )
  })
  .defined()

interface IProps {
  module: Module
}

const niceTransitionNames = {
  forwardTransition: "Navigating Forward",
  backwardTransition: "Navigating Back",
  loadingTransition: "Loading Screen",
  moduleTransition: "Showing Module"
}

const SettingsEditor: FC<IProps> = ({ module }) => {
  let [deleteModuleModalOpen, setDeleteModuleModalOpen] = useState(false)
  const { bodyClickCounter, user } = useContext(ModuleContext)
  const [canDelete, setCanDelete] = useState(false)
  const [backendErrors, setBackendErrors] = useState<ApolloError | null>(null)
  const [successMessage, setSuccessMessage] = useState<String | null>(null)
  const [loading, setLoading] = useState(false)
  const { palette } = useTheme()
  const client = useApolloClient()

  const [updateModule, { data: updatedModuleDate }] = useMutation(
    UPDATE_MODULE,
    {
      async onCompleted(updatedModuleDate) {
        setLoading(false)
        const { updateModule: result } = updatedModuleDate
        let { name, resolutions, transitions } = values

        window.scrollTo(0, 0)
        setSuccessMessage(name)

        // write new Module to query
        // first get the modules list .. this should be in the cache anyway
        const { getModule: moduleData } = client.readQuery({
          query: GET_MODULE
        })

        // now write query to the cache .. this should update the list on the front end
        // ok this works
        client.writeQuery({
          query: GET_MODULE,
          data: {
            getModule: { ...moduleData, name, resolutions, transitions }
          }
        })
      },
      onError(errors: ApolloError) {
        setLoading(false)
        window.scrollTo(0, 0)
        setBackendErrors(errors)
        console.log(errors)
      }
    }
  )

  const {
    values,
    setValues,
    errors,
    field,
    createSubmitHandler
  }: // isValid // <-- was having trouble with this.. think it's because I got weird with the form. Anyway 'submit' works ok
  {
    values: any
    setValues: any
    errors: any
    field: any
    createSubmitHandler: any
  } = useForm({
    validationSchema: creationSchema
  })

  const onSubmit = React.useMemo(() => {
    return createSubmitHandler((values: any) => {
      setBackendErrors(null)
      setSuccessMessage(null)
      setLoading(true)
      updateModule({
        variables: {
          data: { id: module.id, ...values }
        }
      })
    })
  }, [])

  useEffect(() => {
    let { orgRole } = user
    if (hasAccessLevel(orgRole as OrgRoleName, "EMPLOYEE")) {
      setCanDelete(true)
    } else if (
      hasModuleRoleLevel(module.requesting_user_role as UserRoleName, "owner")
    ) {
      setCanDelete(true)
    }

    // now set the form values
    let { id, name, resolutions, transitions } = module
    // hmm .. why "v" is this "implicitly any"? I should wonder about this
    setValues((v: any) => {
      return {
        ...v,
        name,
        // to avoid immutable object errors, make copy of array items.
        // Might as well pull out __typename too, although I think it would work if I left it in
        resolutions: resolutions.map(
          ({ __typename, ...resolution }) => resolution
        ),
        transitions: transitions.map(
          ({ __typename, ...transition }) => transition
        )
      }
    }, true)
  }, [])

  return (
    <div id="module-settings-page">
      <DeleteModuleModal
        modalOpen={deleteModuleModalOpen}
        setModalOpen={setDeleteModuleModalOpen}
        moduleUserRole={module.requesting_user_role}
        name={module.name}
        id={module.id}
      />
      {loading && (
        <Backdrop open={true} className="loading-backdrop" onClick={() => {}}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}

      <Grid container item direction="column" xs={12}>
        <div className="standard-padding-no-top">
          <Grid item container direction="row">
            {backendErrors && (
              <Grid item xs={12}>
                <div className="standard-padding-no-sides">
                  <BackendErrorMessage error={backendErrors} />
                </div>
              </Grid>
            )}
            {!backendErrors && successMessage && (
              <Grid item xs={12}>
                <div className="standard-padding-no-sides">
                  <Alert severity="success">
                    <AlertTitle>Sucessfully updated Module</AlertTitle>
                    <Typography>
                      Module <strong>{successMessage}</strong> has been updated
                    </Typography>
                  </Alert>
                </div>
              </Grid>
            )}
            <Grid item>
              <Typography variant="h5" component="h5">
                Settings
              </Typography>
            </Grid>
          </Grid>
        </div>
        <div className="standard-padding-no-top">
          {Object.keys(values).length && (
            <form autoComplete="off" onSubmit={onSubmit}>
              {/* {JSON.stringify(values.transitions[3])} */}
              <Grid item container direction="column">
                <Grid item xs={4}>
                  <TextField
                    id="outlined-basic"
                    name="name"
                    label="Module Name"
                    variant="outlined"
                    style={{ width: "100%" }}
                    value={values.name ? values.name : ""}
                    error={!!errors.name}
                    helperText={errors.name}
                    onChange={field.onChange}
                  />
                </Grid>

                <Grid container item direction="column">
                  <div className="standard-padding-no-sides">
                    <Grid item>
                      <Typography variant="h6" component="h6">
                        Module Transitions
                      </Typography>
                    </Grid>
                    <Grid container item direction="row">
                      {module.transitions.map((transition, index) => {
                        return (
                          <Grid item xs={2} key={transition.name}>
                            <div className="transition-box">
                              <div className="standard-padding-bottom">
                                <Typography variant="body1">
                                  {niceTransitionNames[transition.name]}
                                </Typography>
                              </div>
                              <div className="small-padding-no-sides">
                                <FormControl className={"transitions-select"}>
                                  <InputLabel id="demo-simple-select-outlined-label">
                                    Transition Type
                                  </InputLabel>

                                  <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    name={`transitions[${index}].type`}
                                    value={
                                      values.transitions[index].type
                                        ? values.transitions[index].type
                                        : "simultaneous"
                                    }
                                    onChange={field.onChange}
                                  >
                                    <MenuItem value="simultaneous">
                                      Simultaneous
                                    </MenuItem>
                                    <MenuItem value="out-in">Out-In</MenuItem>
                                  </Select>
                                </FormControl>
                              </div>
                              <div className="standard-padding-bottom ">
                                <FormControl className={"transitions-select"}>
                                  <InputLabel id="demo-simple-select-outlined-label">
                                    Enter Transition
                                  </InputLabel>

                                  <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    name={`transitions[${index}].enter`}
                                    value={
                                      values.transitions[index].enter
                                        ? values.transitions[index].enter
                                        : "animate__fadeIn"
                                    }
                                    onChange={field.onChange}
                                  >
                                    {enterTransitions.map((enterTransition) => {
                                      return (
                                        <MenuItem
                                          value={enterTransition.value}
                                          key={enterTransition.value}
                                        >
                                          {enterTransition.name}
                                        </MenuItem>
                                      )
                                    })}
                                  </Select>
                                </FormControl>
                              </div>
                              <div className="inline-textfield-container">
                                <TextField
                                  label="Enter Duration"
                                  id={`${transition.name}-enter-duration`}
                                  //defaultValue={resolution.width as number}
                                  value={
                                    values.transitions[index].enterDuration
                                      ? values.transitions[index].enterDuration
                                      : 0
                                  }
                                  name={`transitions[${index}].enterDuration`}
                                  onChange={field.onChange}
                                  type="number"
                                  variant="outlined"
                                  size="small"
                                  className="textfield-with-inline-label small-padding-bottom"
                                />
                                <span className="inline-textfield-label">
                                  <Typography variant="body1">ms</Typography>
                                </span>
                              </div>
                              <div className="standard-padding-bottom">
                                <FormControl className={"transitions-select"}>
                                  <InputLabel id="demo-simple-select-outlined-label">
                                    Exit Transition
                                  </InputLabel>

                                  <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={
                                      values.transitions[index].exit
                                        ? values.transitions[index].exit
                                        : "animate__fadeOut"
                                    }
                                    name={`transitions[${index}].exit`}
                                    onChange={field.onChange}
                                  >
                                    {exitTransitions.map((exitTransition) => {
                                      return (
                                        <MenuItem
                                          value={exitTransition.value}
                                          key={exitTransition.value}
                                        >
                                          {exitTransition.name}
                                        </MenuItem>
                                      )
                                    })}
                                  </Select>
                                </FormControl>
                              </div>
                              <div className="inline-textfield-container">
                                <TextField
                                  label="Exit Duration"
                                  id={`${transition.name}-exit-duration`}
                                  //defaultValue={resolution.width as number}
                                  value={
                                    values.transitions[index].exitDuration
                                      ? values.transitions[index].exitDuration
                                      : 0
                                  }
                                  name={`transitions[${index}].exitDuration`}
                                  onChange={field.onChange}
                                  type="number"
                                  variant="outlined"
                                  size="small"
                                  className="textfield-with-inline-label"
                                />
                                <span className="inline-textfield-label">
                                  <Typography variant="body1">ms</Typography>
                                </span>
                              </div>
                            </div>
                          </Grid>
                        )
                      })}
                    </Grid>
                    <Grid item>
                      <Typography variant="h6" component="h6">
                        Resolutions
                      </Typography>
                    </Grid>
                    <Grid container item direction="row">
                      {module.resolutions.map((resolution, index) => {
                        return (
                          <Grid item xs={2} key={resolution.name}>
                            <div className="resolution-box">
                              <div className="standard-padding-bottom">
                                <Typography variant="body1">
                                  {resolution.name}
                                </Typography>
                              </div>
                              <TextField
                                label="width"
                                id={`${resolution.name}-width`}
                                value={
                                  values.resolutions[index].width
                                    ? values.resolutions[index].width
                                    : 0
                                }
                                name={`resolutions[${index}].width`}
                                onChange={field.onChange}
                                type="number"
                                variant="outlined"
                                size="small"
                                className="standard-padding-bottom"
                              />
                              <TextField
                                label="height"
                                id={`${resolution.name}-height`}
                                value={
                                  values.resolutions[index].height
                                    ? values.resolutions[index].height
                                    : 0
                                }
                                name={`resolutions[${index}].height`}
                                onChange={field.onChange}
                                type="number"
                                variant="outlined"
                                size="small"
                                className="standard-padding-bottom"
                              />
                              <TextField
                                label="breakpoint"
                                id={`${resolution.name}-breakpoint`}
                                value={
                                  values.resolutions[index].breakpoint
                                    ? values.resolutions[index].breakpoint
                                    : 0
                                }
                                name={`resolutions[${index}].breakpoint`}
                                onChange={field.onChange}
                                type="number"
                                variant="outlined"
                                size="small"
                                className="standard-padding-bottom"
                              />
                            </div>
                          </Grid>
                        )
                      })}
                    </Grid>
                  </div>
                </Grid>

                <Grid container item xs={12}>
                  <div className="standard-padding-bottom">
                    <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        style={{ color: "white" }}
                        size="large"
                        type="submit"
                      >
                        <Typography>Submit</Typography>
                      </Button>
                    </Grid>
                  </div>
                </Grid>
              </Grid>
            </form>
          )}
        </div>
        <Grid item>
          <div className="standard-padding-top">
            <Typography variant="h6" component="h6">
              Languages - example, not functional
            </Typography>
            <Grid item xs={6}>
              <div className="standard-padding-top">
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Language</TableCell>
                        <TableCell align="right">Status</TableCell>
                        <TableCell align="right"></TableCell>
                        <TableCell align="right">Delete</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          <span style={{ fontWeight: 500 }}>English</span>
                        </TableCell>
                        <TableCell align="right">Master</TableCell>
                        <TableCell align="right"></TableCell>
                        <TableCell align="right">
                          <CloseIcon className="delete-language-icon" />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          <span style={{ fontWeight: 500 }}>Spanish</span>
                        </TableCell>
                        <TableCell align="right">Up to date</TableCell>
                        <TableCell align="right">
                          <Button variant="outlined" size="small" disabled>
                            Generate
                          </Button>
                        </TableCell>
                        <TableCell align="right">
                          <CloseIcon className="delete-language-icon" />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          <span style={{ fontWeight: 500 }}>Chinese</span>
                        </TableCell>
                        <TableCell align="right">
                          <strong>Up to date-Edited</strong>
                        </TableCell>
                        <TableCell align="right">
                          <Button variant="outlined" size="small" disabled>
                            Generate
                          </Button>
                        </TableCell>
                        <TableCell align="right">
                          <CloseIcon className="delete-language-icon" />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </Grid>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div style={{ marginTop: "1em" }}>
            <Accordion
              className="danger-zone-accordian"
              style={{
                borderColor: palette.error.light
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <div className="standard-padding-no-sides">
                  <Typography variant="h6" component="h6">
                    Danger Zone
                  </Typography>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <div
                  className="danger-zone"
                  style={{
                    borderColor: palette.error.light
                  }}
                >
                  <Grid item container direction="row" alignItems="center">
                    <Grid item xs={8}>
                      <Typography
                        variant="body1"
                        style={{
                          color: palette.error.light
                        }}
                      >
                        Delete this module
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Box display="flex" justifyContent="flex-end">
                        <Button
                          className="danger-zone-button"
                          variant="outlined"
                          disabled={!setCanDelete}
                          style={{
                            borderColor: palette.error.light,
                            color: palette.error.light
                          }}
                          onClick={() => {
                            setDeleteModuleModalOpen(true)
                          }}
                        >
                          Delete
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default SettingsEditor
