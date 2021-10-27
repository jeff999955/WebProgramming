import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import ContextStore from "../ContextStore";
import RoomList from "./RoomList/RoomList";
import MatchPanel from "./MatchPanel/MatchPanel";
import ChatPanel from "./ChatPanel/ChatPanel";
import QueryPhoto from "./graphql/QueryPhoto";
import SubscribeMatch from "./graphql/SubscribeMatch";
import "./MainPage.scss";

const MainPage = () => {
	const { loggedInUser } = useContext(ContextStore);
	const [mode, setMode] = useState("Matches");
	const matchCount = 30;
	const [roomid, setRoomID] = useState("none");
	const [target_name, setTargetName] = useState("none");
	const { loading, error, data, subscribeToMore } = useQuery(QueryPhoto, {
		variables: {
			username: loggedInUser,
		},
	});
	useEffect(() => {
		subscribeToMore({
			document: SubscribeMatch,
			variables: { username: loggedInUser },
			updateQuery: (prev, { subscriptionData }) => {
				return {
					prev,
					getrooms: [...prev.getrooms, subscriptionData.data.match.data],
					user: prev.user,
				};
			},
		});
	}, [loggedInUser, subscribeToMore]);

	if (loading || error) return <></>;

	return (
		<div className="main">
			<div className="left-panel">
				<div className="profile-wrapper">
					<img
						className="profile-picture"
						src={
							data.user
								? data.user.photo
								: "https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg"
						}
						alt="X"
					/>
					<div className="profile-title">My Profile</div>
				</div>
				<div className="mode-buttons">
					<button
						className={`${mode === "Matches" ? "mode-choosing" : ""}`}
						onClick={() => setMode("Matches")}
					>
						Matches
					</button>
					<button
						className={`${mode === "Messages" ? "mode-choosing" : ""}`}
						onClick={() => {
							let rooms = data.getrooms;
							if (rooms.length > 0) {
								setRoomID(rooms[0].roomID);
								setTargetName(rooms[0].target);
							}
							setMode("Messages");
						}}
					>
						Messages
					</button>
				</div>
				<div className="messages">
					{mode === "Messages" ? (
						<RoomList
							rooms={data.getrooms}
							setRoomID={setRoomID}
							setTargetName={setTargetName}
						></RoomList>
					) : null}
				</div>
			</div>
			{mode === "Matches" ? (
				<MatchPanel matchCount={matchCount} />
			) : roomid !== "none" ? (
				<ChatPanel
					current_roomid={roomid}
					target_username={target_name}
					current_username={loggedInUser}
				/>
			) : (
				<div>You don't have any chatroom</div>
			)}
		</div>
	);
};

export default MainPage;
