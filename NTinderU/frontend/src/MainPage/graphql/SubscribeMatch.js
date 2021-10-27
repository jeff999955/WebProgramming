import { gql } from "@apollo/client";

export default gql`
	subscription($username: String!) {
		match(username: $username) {
			data {
				target
				roomID
			}
		}
	}
`;
