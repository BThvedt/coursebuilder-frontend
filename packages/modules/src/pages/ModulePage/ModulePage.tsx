import React, { FC, useEffect, useState } from "react"
import { USER, LocalLogin } from "@makeamodule/shared-frontend"
import { Typography, useTheme, Tabs, Tab, Box } from "@material-ui/core"
import { useQuery, ApolloError } from "@apollo/client"
import { GET_MODULE } from "../../grqphql/queries"
import { useParams } from "react-router-dom"
import PageEditor from "./PageEditor"
import PermissinosEditor from "./Permissions"
import SettingsEditor from "./Settings"

// import { Module } from "webpack"

interface IProps {
  user: USER // we do not get this prop in isoation
}

const ModulePage: FC<IProps> = ({ user }) => {
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [serverError, setServerError] = useState<ApolloError>(null)
  const { palette } = useTheme()
  const [tabValue, setTabValue] = useState(0)
  let { id } = useParams<{ id: string }>()
  const {
    loading,
    error,
    data: { getModule: module } = []
  } = useQuery(GET_MODULE, {
    variables: { id }
  })

  return (
    <>
      {module && (
        <>
          <Typography variant="h3" gutterBottom>
            {module.name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {module.requesting_user_role}
          </Typography>

          <Tabs
            value={tabValue}
            onChange={(event, newValue) => {
              setTabValue(newValue)
            }}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="Pages" />
            <Tab label="Permissions" />
            <Tab label="Settings" />
          </Tabs>
          <div
            role="tabpanel"
            hidden={tabValue !== 0}
            id={`wrapped-tabpanel-1`}
          >
            {tabValue === 0 && (
              <Box p={3}>
                {/* <PermissinosEditor module={module} /> */}
                {/* <SettingsEditor module={module} /> */}
                <PageEditor module={module} />
              </Box>
            )}
          </div>

          <div
            role="tabpanel"
            hidden={tabValue !== 1}
            id={`wrapped-tabpanel-1`}
          >
            {tabValue === 1 && (
              <Box p={3}>
                <PermissinosEditor module={module} />
              </Box>
            )}
          </div>

          <div
            role="tabpanel"
            hidden={tabValue !== 2}
            id={`wrapped-tabpanel-1`}
          >
            {tabValue === 2 && (
              <Box p={3}>
                <SettingsEditor module={module} />
              </Box>
            )}
          </div>
        </>
      )}
    </>
  )
}

export default ModulePage
