import { gql } from 'apollo-boost'

export const MESSAGES_SUBSCRIPTION = gql`
  subscription($username: String!){
    message(username: $username){
      mutation
      data {
        from
        to
        body
      }
    }
  }
`
