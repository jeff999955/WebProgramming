import { gql } from "@apollo/client";

export default gql`
	mutation($username: String!, $password: String!) {
		createUser(data: { username: $username, password: $password }) {
			username
			password
		}
	}
`;
