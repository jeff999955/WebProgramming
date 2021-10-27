import { useState } from "react";
import ChatroomButton from "./ChatroomButton/ChatroomButton";

const RoomList = ({ rooms, setRoomID, setTargetName }) => {
	const [chosen, setChosen] = useState(0);
	return (
		<div>
			{rooms.map((room, i) => (
				<ChatroomButton
					choosing={i === chosen}
					key={i}
					idx={i}
					username={room.target}
					roomID={room.roomID}
					sRID={setRoomID}
					sTN={setTargetName}
					sC={setChosen}
				/>
			))}
		</div>
	);
};

export default RoomList;
