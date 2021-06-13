import { gql } from "@apollo/client"

export const CREATE_MODULE = gql`
  mutation CreateModule($data: createModuleInput!) {
    createModule(data: $data) {
      id
      name
      created_by
    }
  }
`

export const DELETE_MODULE = gql`
  mutation DeleteModule($id: ID!) {
    deleteModule(id: $id)
  }
`

export const UPDATE_MODULE = gql`
  mutation updateModuleSettings($data: updateModuleSettingsInput!) {
    updateModuleSettings(data: $data) {
      id
      name
      resolutions {
        name
      }
      transitions {
        name
      }
    }
  }
`

export const EDIT_MODULE_PERMISSIONS = gql`
  mutation EditModulePermissions($data: EditModulePermissionsInput!) {
    editModulePermissions(data: $data)
  }
`
