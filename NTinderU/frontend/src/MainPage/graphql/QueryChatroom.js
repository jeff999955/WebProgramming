import { gql } from "@apollo/client";

export default gql`
	query($id: ID!, $target: String!) {
		chatroom(id: $id) {
			id
			users
			messages {
				from
				body
				timestamp
			}
		}
		user(username: $target) {
			photo
		}
	}
`;
