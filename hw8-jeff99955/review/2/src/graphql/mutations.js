import { gql } from '@apollo/client'

export const CREATE_MESSAGE_MUTATION = gql `
  mutation addMessage(
    $from: String!
    $to: String!
    $body: String!
  ) {
    addMessage(
      from: $from
      to: $to
      body: $body
    ) {
      from
      to
      body
    }
  }
`

export const DELETE_MESSAGES_MUTATION = gql `
  mutation deleteAllMessage {
    deleteAllMessage
  }
`