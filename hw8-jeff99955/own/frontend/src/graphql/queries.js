import { gql } from 'apollo-boost'

export const MESSAGES_QUERY = gql`
  query q($username: String){
    messages(username: $username){
      from
      to
      body
    }
  }
`
