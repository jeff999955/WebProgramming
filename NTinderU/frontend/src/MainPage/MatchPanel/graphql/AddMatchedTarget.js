import { gql } from "@apollo/client";

export default gql`
	mutation($username: String!, $target: String!) {
		addMatchedUser(data: { username: $username, target: $target }) {
			username
			liked
		}
		createChatroom(data: { users: [$username, $target] }) {
			id
		}
	}
`;
