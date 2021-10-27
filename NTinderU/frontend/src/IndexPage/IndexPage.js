import { useState } from "react";
import "./IndexPage.scss";
import logo from "./NTU.png";
import LoginPopup from "./LoginPopup/LoginPopup";

const IndexPage = () => {
	const [popUpShow, setPopUpShow] = useState(false);
	const [usernameError, setUsernameError] = useState(0);
	const [passwordError, setPasswordError] = useState(0);
	const [confirmError, setConfirmError] = useState(0);
	const [signin, setSignin] = useState(0);

	return (
		<div className="index">
			<div className="index-header">
				<img className="logo" alt="NTU-logo" src={logo} />
				<button
					size="lg"
					onClick={() => {
						setUsernameError(0);
						setPasswordError(0);
						setPopUpShow(true);
						setSignin(1);
					}}
				>
					Sign In
				</button>
			</div>
			<div className="index-wrapper">
				<div id="app-title">NTinderU</div>
				<button
					size="lg"
					onClick={() => {
						setUsernameError(0);
						setPasswordError(0);
						setConfirmError(0);
						setPopUpShow(true);
						setSignin(0);
					}}
				>
					Sign Up
				</button>
			</div>
			<LoginPopup
				signin={signin}
				setsignin={setSignin}
				show={popUpShow}
				onHide={() => setPopUpShow(false)}
				usernameError={usernameError}
				passwordError={passwordError}
				confirmError={confirmError}
				setUsernameError={setUsernameError}
				setPasswordError={setPasswordError}
				setConfirmError={setConfirmError}
			/>
		</div>
	);
};

export default IndexPage;
