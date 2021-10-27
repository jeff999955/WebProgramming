import { gql } from "@apollo/client";

export default gql`
	mutation($username: String!, $target: String!) {
		addLikedUser(data: { username: $username, target: $target }) {
			username
			liked
		}
	}
`;
