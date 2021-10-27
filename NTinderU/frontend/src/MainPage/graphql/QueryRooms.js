import { gql } from "@apollo/client";

export default gql`
	query($username: String!) {
		getrooms(username: $username) {
			target
			roomID
		}
	}
`;
