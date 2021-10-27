import { gql } from 'apollo-boost'

export const CHATROOM_SUBSCRIPTION = gql`
	subscription ($user: String!) {
		chatRoom(user: $user) {
			mutation
			data { 
				_id
				sender
				receiver
				body
			}
		}
	}
`