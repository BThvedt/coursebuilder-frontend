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
  Link
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
import CreateModule from "./components/CreateModule"
import { GET_MODULES } from "../../grqphql/queries"
import FrontendSvrErrMsg from "../../../frontend_shared/FrontendSvrErrMsg"
// import { Module } from "webpack"

interface IProps {
  user: USER // we do not get this prop in isoation
}

const List: FC<IProps> = ({ user }) => {
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [serverError, setServerError] = useState<ApolloError>(null)
  const { palette } = useTheme()
  const {
    loading,
    error,
    data: { getModules: modulesList } = []
  } = useQuery(GET_MODULES)

  return (
    <>
      <CreateModule
        addModalOpen={addModalOpen}
        setAddModalOpen={setAddModalOpen}
      />

      <div className="standard-padding">
        <Grid container>
          <Grid container item justify="space-between">
            <Grid item>
              <Typography variant="h3" component="h3" gutterBottom>
                Welcome, {user.name}!
              </Typography>
            </Grid>
            <Grid item>
              <Button variant="outlined" startIcon={<AddIcon />}>
                <Typography
                  variant="h6"
                  component="h6"
                  onClick={() => {
                    setAddModalOpen(true)
                  }}
                >
                  Add Module
                </Typography>
              </Button>
            </Grid>
          </Grid>
          <Grid container item justify="space-between">
            <Grid item>
              <Typography variant="h5" component="h5">
                Modules
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5" component="h5">
                Role
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <hr />
      <div>
        {error && (
          <Typography
            variant="h6"
            component="h6"
            gutterBottom
            style={{
              color: palette.error.main
            }}
          >
            <FrontendSvrErrMsg error={error} />
          </Typography>
        )}

        {/* <FrontendSvrErrMsg /> */}
        {modulesList?.length ? (
          <TableContainer>
            <Table>
              <TableBody>
                {modulesList.map((module: any) => {
                  return (
                    <TableRow className="standard-padding" key={module.id}>
                      <TableCell>
                        <Typography variant="h6" component="h6" gutterBottom>
                          <Link
                            component={RouterLink}
                            to={`/module/${module.id}`}
                            className="frontend-link"
                          >
                            {module.name}
                          </Link>
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="h6" component="h6" gutterBottom>
                          {module.requesting_user_role}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <>
            {!error && !loading && (
              <div className="standard-padding" style={{ textAlign: "center" }}>
                <Typography variant="h6" component="h6" gutterBottom>
                  You have no modules.{" "}
                  <Link
                    className="frontend-link"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setAddModalOpen(true)
                    }}
                  >
                    Create One!
                  </Link>
                </Typography>
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}

export default List
