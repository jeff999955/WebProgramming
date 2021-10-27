import { gql } from '@apollo/client'

export const MESSAGES_SUBSCRIPTION = gql `
subscription message ($name: String!) {
  message(name: $name) {
    mutation
    data {
      id
      from
      to
      body
    }
  }
}
`

export const DELETE_SUBSCRIPTION = gql `
subscription delete{
  delete{
    mutation
    data
  }
}
`