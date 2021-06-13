import { gql } from "@apollo/client"

// export const LOGIN = gql`
//   mutation login($data: LoginUserInput!) {
//     login(data: $data) {
//       ... on TokenPayload {
//         token
//         user {
//           id
//           name
//           orgRole
//           email
//         }
//       }
//       ... on User {
//         id
//         name
//         orgRole
//         email
//       }
//     }
//   }
// `

export const LOGIN = gql`
  mutation login($data: LoginUserInput!) {
    login(data: $data) {
      ... on TokenPayload {
        token
        user {
          id
          name
          orgRole
          email
        }
      }
      ... on User {
        id
        name
        orgRole
        email
      }
    }
  }
`
