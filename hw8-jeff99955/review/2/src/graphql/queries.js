import { gql } from '@apollo/client'

export const MESSAGES_QUERY = gql `
  query getMessage($name: String) {
    getMessage(name: $name) {
      id
      from
      to
      body
    }
  }
`