import { gql } from "@apollo/client";

export default gql`
	mutation($username: [String!]!) {
		createChatroom(data: { users: $username }) {
			id
			users
		}
	}
`;
