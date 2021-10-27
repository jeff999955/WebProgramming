import React, { useState, useContext } from "react";
import { useMutation, useQuery } from "@apollo/client";
import MoodButton from "./MoodButton/MoodButton";
import ContextStore from "../../ContextStore";
import QueryMatch from "./graphql/QueryMatch";
import AddLikedTarget from "./graphql/AddLikedTarget";
import AddMatchedTarget from "./graphql/AddMatchedTarget";
import "./MatchPanel.scss";

const MatchPanel = ({ matchCount }) => {
	const { loggedInUser } = useContext(ContextStore);
	const [matchIndex, setMatchIndex] = useState(0);
	const [isEnd, setIsEnd] = useState(false);
	const { loading, error, data, refetch } = useQuery(QueryMatch, {
		variables: { username: loggedInUser, max_count: matchCount },
	});
	const [addLikedTarget] = useMutation(AddLikedTarget);
	const [addMatchedTarget] = useMutation(AddMatchedTarget);

	const nextPeople = async () => {
		if (matchIndex === data.match.length - 1) {
			setIsEnd(true);
			await refetch();
			setMatchIndex(0);
			setIsEnd(false);
		} else setMatchIndex(matchIndex + 1);
	};
	const getMatchObject = () => {
		if (data === null) {
			return {
				username: "No People. Press Any Button to refetch",
				liked: [],
				photo: "https://via.placeholder.com/320x500.png",
			};
		}
		if (data.match.length === 0 || isEnd) {
			return {
				username: "No People. Press Any Button to refetch",
				liked: [],
				photo: "https://via.placeholder.com/320x500.png",
			};
		} else {
			return {
				username: data.match[matchIndex].username,
				liked: data.match[matchIndex].liked,
				photo: data.match[matchIndex].photo,
			};
		}
	};

	const likeSomeone = () => {
		let obj = getMatchObject();
		let target = obj.username;
		if (target !== "No People. Press Any Button to refetch") {
			addLikedTarget({
				variables: {
					username: loggedInUser,
					target: target,
				},
			});
			if (obj.liked.includes(loggedInUser)) {
				addMatchedTarget({
					variables: {
						username: loggedInUser,
						target: target,
					},
				});
			}
		}
	};

	if (loading) return <span>Loading...</span>;

	if (error) return <></>;

	return (
		<div className="match-panel">
			<span>{getMatchObject().username}</span>
			<img className="user-picture-big" src={getMatchObject().photo} alt="帥哥 || 美女" />
			<div className="mood-buttons">
				<MoodButton type="x" onClick={nextPeople} />
				<MoodButton
					type="heart"
					onClick={async () => {
						await likeSomeone();
						nextPeople();
					}}
				/>
			</div>
		</div>
	);
};

export default MatchPanel;
