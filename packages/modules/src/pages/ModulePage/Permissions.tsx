import React, { FC, useEffect, useState } from "react"
import { USER, LocalLogin } from "@makeamodule/shared-frontend"
import {
  Grid,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  TableBody,
  Typography,
  Button,
  useTheme,
  Tabs,
  Tab,
  Box,
  Link,
  FormControlLabel,
  Checkbox,
  Backdrop,
  CircularProgress
} from "@material-ui/core"
import {
  useQuery,
  useMutation,
  useApolloClient,
  useLazyQuery,
  ApolloError
} from "@apollo/client"
import AddIcon from "@material-ui/icons/Add"
import { Link as RouterLink } from "react-router-dom"
import { GET_MODULE } from "../../grqphql/queries"
import FrontendSvrErrMsg from "../../../frontend_shared/FrontendSvrErrMsg"
import BackendErrorMessage from "../../../frontend_shared/BackendErrorMessage"
import { Alert, AlertTitle } from "@material-ui/lab"
import { useParams } from "react-router-dom"
// import { Module } from "webpack"
import { Module } from "../../../generated/graphql-frontend"
import { GET_ROLES_AND_PERMISSIONS } from "../../grqphql/queries"
import { EDIT_MODULE_PERMISSIONS } from "../../grqphql/mutations"

interface IProps {
  module: Module
}

// I didn't type this on the backend .. so I'm just doing it here. I guess. Don't really think I need to but.. oh well
type OwnerPermissions = {
  deleteModule: boolean
  editPermissions: boolean
  addOrRemoveUsers: boolean
}

type DevPermissions = {
  editPermissions: boolean
  addOrRemoveUsers: boolean
}

type EditorPermissions = {
  arrangePages: boolean
}

type QAPermissions = {}

type ViewerPermissions = {}

// interface modulePermissionsObject {
//   owner: OwnerPermissions
//   dev: DevPermissions
//   editor: EditorPermissions
//   qa: QAPermissions
//   viewer: ViewerPermissions
// }

// type userRole = "owner" | "dev" | "editor" | "qa" | "viewer"
// type ASDFTHING =
//   | OwnerPermissions
//   | DevPermissions
//   | EditorPermissions
//   | QAPermissions
//   | ViewerPermissions
// type permissionName =
//   | "deleteModule"
//   | "editPermissions"
//   | "addOrRemoveUsers"
//   | "arrangePages"

const PermissionsEditor: FC<IProps> = ({ module }) => {
  const [backendErrors, setBackendErrors] = useState<ApolloError | null>(null)
  const [successMessage, setSuccessMessage] = useState<String | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const client = useApolloClient()
  const [modulePermissionsObject, setModulePermissionsObject] = useState<any>({
    owner: {
      deleteModule: true,
      editPermissions: true,
      addOrRemoveUsers: true
    },
    dev: {
      editPermissions: true,
      addOrRemoveUsers: true
    },
    editor: {
      arrangePages: true
    },
    qa: {},
    viewer: {}
  })
  let { id: moduleId } = useParams<{ id: string }>()

  const {
    loading,
    error,
    //data
    data: { getModuleRolesAndPermissions: rolesAndPermissions } = []
  } = useQuery(GET_ROLES_AND_PERMISSIONS, {
    variables: { moduleId }
  })

  useEffect(() => {
    // there will have to be two permissions objects here. The module permissions object, and the one
    // from the components, when that gets writtend. There will need to be another generated types file and another
    // link too.. at least one! But that's for the future

    if (!loading && rolesAndPermissions) {
      let { role_and_user_permissions } = rolesAndPermissions

      setModulePermissionsObject(role_and_user_permissions)
    }
  }, [loading])

  // out of lack of an obvious great way to do permissions that I could see, permissions are a json object
  // module role will have to be saved
  const [changePermissions, { data: updatedPermissionsData }] = useMutation(
    EDIT_MODULE_PERMISSIONS,
    {
      async onCompleted(updatedPermissionsData) {
        const { editModulePermissions: result } = updatedPermissionsData

        let { user_ids_and_roles, role_and_user_permissions } = result

        const data = client.readQuery({
          query: GET_ROLES_AND_PERMISSIONS,
          variables: { moduleId }
        })

        client.writeQuery({
          query: GET_ROLES_AND_PERMISSIONS,
          data: {
            getModuleRolesAndPermissions: {
              ...rolesAndPermissions,
              user_ids_and_roles,
              role_and_user_permissions
            }
          },
          variables: { moduleId }
        })

        setSubmitting(false)
        window.scrollTo(0, 0)
        setSuccessMessage(module.name)
      },
      onError(errors: ApolloError) {
        setSubmitting(false)
        window.scrollTo(0, 0)
        setBackendErrors(errors)
        console.log(errors)
      }
    }
  )

  const handleChange = (role: string, permission: string) => {
    let modulePermissionsCopy = { ...modulePermissionsObject }
    let newRolePermissions = { ...modulePermissionsCopy[role] }

    newRolePermissions[permission] = !newRolePermissions[permission]

    setModulePermissionsObject({
      ...modulePermissionsCopy,
      [role]: newRolePermissions
    })
  }

  useEffect(() => {
    console.log(
      "WIll neeed an additional link and additional output file eventually for compoennts service"
    )
    // I'm pretty sure only 2 schemas can be used per generated type output file, will need at least 2 output files then
    // for at least 3 services: auth, modules, and components
    // anyway this is just for the reminder
  }, [])

  return (
    <div id="permissions-settings-page">
      {submitting && (
        <Backdrop open={true} className="loading-backdrop" onClick={() => {}}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}

      {!loading && !error && (
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
                      <AlertTitle>Sucessfully updated Permissions</AlertTitle>
                      <Typography>
                        Permissions for <strong>{successMessage}</strong> have
                        been updated
                      </Typography>
                    </Alert>
                  </div>
                </Grid>
              )}
              <Grid item xs={2}>
                <Typography variant="h5" component="h5">
                  Roles
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h5" component="h5">
                  Permissions
                </Typography>
              </Grid>
            </Grid>
          </div>
          <div className="standard-padding-no-top">
            {/* Owner */}
            <Grid item>
              <Grid container direction="row" alignItems="center">
                <Grid item xs={2}>
                  <Typography variant="h6" component="h6">
                    Owner
                  </Typography>
                </Grid>
                <Grid item>
                  <div className="permissionsCheckbox">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={
                            modulePermissionsObject.owner.addOrRemoveUsers
                          }
                          onChange={() =>
                            handleChange("owner", "addOrRemoveUsers")
                          }
                          name="ownerAddRemoveUsers"
                          color="primary"
                        />
                      }
                      label="Add/Remove Users"
                    />
                  </div>
                </Grid>
                <Grid item>
                  <div className="permissionsCheckbox">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={
                            modulePermissionsObject.owner.editPermissions
                          }
                          onChange={() =>
                            handleChange("owner", "editPermissions")
                          }
                          name="ownerEditPermissions"
                          color="primary"
                        />
                      }
                      label="Edit Permissions"
                    />
                  </div>
                </Grid>
                <Grid item>
                  <div className="permissionsCheckbox">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={false}
                          onChange={() => console.log("To be implemented")}
                          name="ownerGenerateTranslations"
                          color="primary"
                          disabled
                        />
                      }
                      label="Generate Translations"
                    />
                  </div>
                </Grid>
                <Grid item>
                  <div className="permissionsCheckbox">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={modulePermissionsObject.owner.deleteModule}
                          onChange={() => handleChange("owner", "deleteModule")}
                          name="ownerDeleteModule"
                          color="primary"
                        />
                      }
                      label="Delete Module"
                    />
                  </div>
                </Grid>
              </Grid>
            </Grid>
            {/* Dev */}
            <Grid item>
              <Grid container direction="row" alignItems="center">
                <Grid item xs={2}>
                  <Typography variant="h6" component="h6">
                    Dev
                  </Typography>
                </Grid>
                <Grid item>
                  <div className="permissionsCheckbox">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={modulePermissionsObject.dev.addOrRemoveUsers}
                          onChange={() =>
                            handleChange("dev", "addOrRemoveUsers")
                          }
                          name="devAddRemoveUsers"
                          color="primary"
                        />
                      }
                      label="Add/Remove Users"
                    />
                  </div>
                </Grid>
                <Grid item>
                  <div className="permissionsCheckbox">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={modulePermissionsObject.dev.editPermissions}
                          onChange={() =>
                            handleChange("dev", "editPermissions")
                          }
                          name="devEditPermissions"
                          color="primary"
                        />
                      }
                      label="Edit Permissions"
                    />
                  </div>
                </Grid>
                <Grid item>
                  <div className="permissionsCheckbox">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={false}
                          onChange={() => {
                            console.log("to be implemented")
                          }}
                          name="ownerGenerateTranslations"
                          color="primary"
                          disabled
                        />
                      }
                      label="Generate Translations"
                    />
                  </div>
                </Grid>
              </Grid>
            </Grid>
            {/* Editor */}
            <Grid item>
              <Grid container direction="row" alignItems="center">
                <Grid item xs={2}>
                  <Typography variant="h6" component="h6">
                    Editor
                  </Typography>
                </Grid>
                <Grid item>
                  <div className="permissionsCheckbox">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={false}
                          onChange={() => {
                            console.log("to be implemented")
                          }}
                          name="editorEditText"
                          color="primary"
                          disabled
                        />
                      }
                      label="Edit Text"
                    />
                  </div>
                </Grid>
                <Grid item>
                  <div className="permissionsCheckbox">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={false}
                          onChange={() => {
                            console.log("to be implemented")
                          }}
                          name="editorEditStyles"
                          color="primary"
                          disabled
                        />
                      }
                      label="Edit Styles"
                    />
                  </div>
                </Grid>
                <Grid item>
                  <div className="permissionsCheckbox">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={false}
                          onChange={() => {
                            console.log("to be implemented")
                          }}
                          name="editorEditPositions"
                          color="primary"
                          disabled
                        />
                      }
                      label="Edit Positions"
                    />
                  </div>
                </Grid>

                <Grid item>
                  <div className="permissionsCheckbox">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={false}
                          onChange={() => {
                            console.log("to be implemented")
                          }}
                          name="editorEditFiles"
                          color="primary"
                          disabled
                        />
                      }
                      label="Edit Files"
                    />
                  </div>
                </Grid>
                <Grid item>
                  <div className="permissionsCheckbox">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={modulePermissionsObject.editor.arrangePages}
                          onChange={() => {
                            handleChange("editor", "arrangePages")
                          }}
                          name="editorEditPages"
                          color="primary"
                        />
                      }
                      label="Arrange Pages"
                    />
                  </div>
                </Grid>
              </Grid>
            </Grid>
            <Grid item></Grid>
            {/* QA */}
            <Grid item>
              <Grid container direction="row" alignItems="center">
                <Grid item xs={2}>
                  <Typography variant="h6" component="h6">
                    QA
                  </Typography>
                </Grid>
                <Grid item>
                  <div className="permissionsCheckbox">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={false}
                          onChange={() => {
                            console.log("to be implemented")
                          }}
                          name="QAEditText"
                          color="primary"
                          disabled
                        />
                      }
                      label="Edit Text"
                    />
                  </div>
                </Grid>
                <Grid item>
                  <div className="permissionsCheckbox">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={false}
                          onChange={() => {
                            console.log("to be implemented")
                          }}
                          name="QAEditStyles"
                          color="primary"
                          disabled
                        />
                      }
                      label="Edit Styles"
                    />
                  </div>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction="row" alignItems="center">
                <Grid item xs={2}>
                  <Typography variant="h6" component="h6">
                    Viewer
                  </Typography>
                </Grid>
                <Grid item>
                  <div className="permissionsCheckbox">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={false}
                          onChange={() => {
                            console.log("to be implemented")
                          }}
                          name="viewerViewTranslations"
                          color="primary"
                          disabled
                        />
                      }
                      label="View Translations"
                    />
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </div>
          <Grid container item xs={12}>
            <div className="standard-padding-bottom">
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ color: "white" }}
                  size="large"
                  type="submit"
                  onClick={() => {
                    setBackendErrors(null)
                    setSuccessMessage(null)
                    setSubmitting(true)
                    changePermissions({
                      variables: {
                        data: {
                          moduleId: moduleId,
                          permissionsObj: modulePermissionsObject
                        }
                      }
                    })
                  }}
                >
                  <Typography>Submit</Typography>
                </Button>
              </Grid>
            </div>
          </Grid>
          <Grid item>
            <Typography>
              Note: need to come back and update front/backend to approperately
              restrict roles from editing permissions for other roles
            </Typography>
          </Grid>
          <Grid item></Grid>
        </Grid>
      )}
    </div>
  )
}

export default PermissionsEditor
