import { gql } from 'apollo-boost'

export const MESSAGES_QUERY = gql`
    query {
        messages {
            _id
            sender 
            receiver
            body
        }
    }
`

export const CHATROOM_QUERY = gql`
    query chatRoom($user: String!) {
        chatRoom(user: $user) {
            _id
            sender
            receiver
            body
        }
    }
`