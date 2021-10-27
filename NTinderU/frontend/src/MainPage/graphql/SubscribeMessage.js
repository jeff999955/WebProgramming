import { gql } from "@apollo/client";

export default gql`
	subscription($username: String!) {
		message(username: $username) {
			data {
				from
				to
				body
				timestamp
			}
		}
	}
`;
