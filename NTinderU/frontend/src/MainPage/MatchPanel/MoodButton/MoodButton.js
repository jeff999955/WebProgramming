import React from "react";
import "./MoodButton.scss";
import Heart from "../../../svg/Heart";
import X from "../../../svg/X";

const MoodButton = ({ type, onClick }) => (
	<button className={`mood-button${type ? ` mood-${type}` : ""}`} onClick={onClick}>
		{type === "heart" ? <Heart /> : type === "x" ? <X /> : null}
	</button>
);

export default MoodButton;
