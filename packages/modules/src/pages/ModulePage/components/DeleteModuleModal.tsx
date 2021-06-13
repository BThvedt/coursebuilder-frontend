import React, { FC, useState, useEffect, useContext } from "react"
import { ModuleContext } from "../../../Context"
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
import {
  hasAccessLevel,
  hasModuleRoleLevel,
  OrgRoleName,
  UserRoleName
} from "../../../../frontend_shared/permissions"
import { DELETE_MODULE } from "../../../grqphql/mutations"
import { GET_MODULES } from "../../../grqphql/queries"
import {
  useQuery,
  useMutation,
  useApolloClient,
  useLazyQuery,
  ApolloError
} from "@apollo/client"
import { useHistory } from "react-router-dom"

interface IProps {
  modalOpen: boolean
  setModalOpen: (open: boolean) => void
  id: string
  name: string
  moduleUserRole: string
}

const DeleteModuleModal: FC<IProps> = ({
  modalOpen,
  setModalOpen,
  id,
  name,
  moduleUserRole
}) => {
  const { palette } = useTheme()
  const { user } = useContext(ModuleContext)
  const [canDelete, setCanDelete] = useState(false)
  const [typedName, setTypedName] = useState("")
  const [spinner, setSpinner] = useState(false)
  const client = useApolloClient()
  let history = useHistory()
  const onSubmit = () => {
    console.log("form submeitted")
  }

  useEffect(() => {
    let { orgRole } = user
    if (hasAccessLevel(orgRole as OrgRoleName, "EMPLOYEE")) {
      setCanDelete(true)
    } else if (hasModuleRoleLevel(moduleUserRole as UserRoleName, "owner")) {
      setCanDelete(true)
    }
  }, [])

  const [deleteModule, { data: createModuleData }] = useMutation(
    DELETE_MODULE,
    {
      async onCompleted(data) {
        const { deleteModule: id } = data

        // display success message .. option to redirect to module page
        setSpinner(false)
        // setServerError(null)
        // setNewModuleInfo(result)

        // write new Module to query
        // first get the modules list .. this should be in the cache anyway
        const { getModules } = client.readQuery({
          query: GET_MODULES
        })

        let newModules = [...getModules]
        let index = newModules.findIndex((module) => module.id === id)
        console.log("INDEX IS")
        console.log(index)
        console.log("getmodules is")
        console.log(getModules)
        console.log("id is")
        console.log(id)
        newModules.splice(index, 1)

        console.log("new modules are")
        console.log(newModules)

        // now write query to the cache .. this should update the list on the front end
        // ok this works
        client.writeQuery({
          query: GET_MODULES,
          data: {
            getModules: newModules
          }
        })

        // history
        history.push("/modules")
      },
      onError(error: ApolloError) {
        setSpinner(false)
        // setServerError(error)
        // console.log(error)
      }
    }
  )

  return (
    <ModalComponent
      open={modalOpen}
      title={`Delete Module`}
      spinner={spinner}
      onClose={() => {
        setModalOpen(false)
      }}
    >
      <Grid container direction="column" className="standard-padding-no-top">
        <Grid item>
          <Typography variant="body1" gutterBottom>
            Type the name of the module to confirm delete
          </Typography>
        </Grid>
        <Grid item>
          <div className="standard-padding-top">
            <form autoComplete="off" onSubmit={onSubmit}>
              <TextField
                // error={!!errors.name}
                // helperText={errors.name}
                id="outlined-basic"
                label={name}
                variant="outlined"
                style={{ width: "100%" }}
                name="name"
                value={typedName ? typedName : ""}
                onChange={(e) => setTypedName(e.target.value)}
              />
            </form>
          </div>
        </Grid>
        <Grid container className="standard-padding" direction="row-reverse">
          <Grid item>
            <Button
              variant="outlined"
              type="submit"
              disabled={!canDelete || typedName != name}
              style={{
                borderColor: palette.error.light,
                color: palette.error.light
              }}
              onClick={() => {
                // alert(`Delete the module ${id}`)
                deleteModule({
                  variables: {
                    id
                  }
                })
              }}
            >
              Delete
            </Button>
          </Grid>
        </Grid>
      </Grid>

      {/* The create form */}
    </ModalComponent>
  )
}

export default DeleteModuleModal
