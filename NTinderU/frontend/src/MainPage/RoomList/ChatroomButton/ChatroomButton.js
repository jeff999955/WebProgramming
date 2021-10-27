import React from "react";
import "./ChatroomButton.scss";

const ChatroomButton = (props) => {
	const click = () => {
		props.sRID(props.roomID);
		props.sTN(props.username);
		props.sC(props.idx);
	};
	return (
		<button className={`chatroom-button${props.choosing ? " choosing" : ""}`} onClick={click}>
			<img
				className="chatroom-button-picture"
				src="https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg"
				alt="user big"
			/>
			<div className="chatroom-information">
				<div className="chatroom-button-username">{props.username}</div>
				<div className="chatroom-button-lastmessage">{props.lastMessage}</div>
			</div>
		</button>
	);
};

export default ChatroomButton;
