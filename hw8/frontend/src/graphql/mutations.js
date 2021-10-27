import { gql } from "apollo-boost";

export const CREATE_MESSAGE_MUTATION = gql`
  mutation createMessage(
    $from: String!
    $to: String!
    $body: String!
  ) {
    createMessage(
      data: {
        from: $from
        to: $to
        body: $body
      }
    ) {
      from
      to
      body
    }
  }
`;
