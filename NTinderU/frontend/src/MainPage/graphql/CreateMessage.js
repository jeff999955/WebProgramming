import { gql } from "@apollo/client";

export default gql`
	mutation($id: ID!, $from: String!, $to: String!, $body: String!) {
		createMessage(id: $id, data: { from: $from, to: $to, body: $body }) {
			from
			body
			timestamp
		}
	}
`;
