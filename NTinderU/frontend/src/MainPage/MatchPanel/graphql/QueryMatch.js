import { gql } from "@apollo/client";

export default gql`
	query($username: String!, $max_count: Int!) {
		match(data: { username: $username, max_count: $max_count }) {
			username
			liked
			photo
		}
	}
`;
