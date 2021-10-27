import { gql } from 'apollo-boost'

export const INSERT_MESSAGE_MUTATION = gql `
	mutation ($sender: String!, $receiver: String!, $body: String!) {
		insertMessage(newMessage: { sender: $sender, receiver: $receiver, body: $body }) {
			_id
			sender
			receiver
			body
		}
	}
`