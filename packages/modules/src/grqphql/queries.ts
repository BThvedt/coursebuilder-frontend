import { gql } from "@apollo/client"

export const TEST = gql`
  query {
    test
  }
`

export const GET_MODULES = gql`
  query {
    getModules {
      id
      name
      created_by
      requesting_user_role
    }
  }
`

export const GET_MODULE = gql`
  query getModule($id: ID!) {
    getModule(id: $id) {
      id
      created_by
      name
      resolutions {
        name
        width
        height
        breakpoint
      }
      transitions {
        name
        type
        enter
        enterDuration
        exit
        exitDuration
      }
      lesson_ids
      forward_transition_id
      backward_transition_id
      loading_transition_id
      module_transition_id
      languages
      default_language
      requesting_user_role
    }
  }
`
export const GET_ROLES_AND_PERMISSIONS = gql`
  query GetModuleRolesAndPermissions($moduleId: ID!) {
    getModuleRolesAndPermissions(moduleId: $moduleId) {
      user_ids_and_roles
      role_and_user_permissions
    }
  }
`
