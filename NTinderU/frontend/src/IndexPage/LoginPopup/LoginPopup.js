import React, { useState, useEffect, useRef, useContext } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { Modal, Form, Button } from "react-bootstrap";
import { hashSync, compareSync } from "bcryptjs";
import CreateUser from "../graphql/CreateUser";
import ContextStore from "../../ContextStore";
import QueryUser from "../graphql/QueryUser";
import "./LoginPopup.scss";

const usernameErrors = [null, "Cannot be blank.", "User not found.", "Username has been used."];
const passwordErrors = [null, "Cannot be blank.", "Incorrect password."];
const confirmErrors = [null, "Cannot be blank.", "Inconsistant with password."];

const Popup = (props) => {
	const { setLoggedIn, setLoggedInUser } = useContext(ContextStore);

	const [usernameInput, setUsernameInput] = useState("");
	const [passwordInput, setPasswordInput] = useState("");
	const [confirmInput, setConfirmInput] = useState("");

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const [loadUser, { loading, data }] = useLazyQuery(QueryUser, {
		variables: { username },
	});

	const [createUser] = useMutation(CreateUser);

	const handleUsernameInput = (e) => setUsernameInput(e.target.value);
	const handlePasswordInput = (e) => setPasswordInput(e.target.value);
	const handleConfirmInput = (e) => setConfirmInput(e.target.value);

	const resetError = () => {
		props.setUsernameError(0);
		props.setPasswordError(0);
		props.setConfirmError(0);
	};

	const clearPasswordInput = () => {
		setPasswordInput("");
		setConfirmInput("");
	};

	const clearUserInfo = () => {
		setUsername("");
		setPassword("");
	};

	const checkFormat = () => {
		resetError();
		let fail = false;

		if (usernameInput === "") {
			props.setUsernameError(1);
			fail = true;
		} else props.setUsernameError(0);

		if (passwordInput === "") {
			props.setPasswordError(1);
			clearPasswordInput();
			fail = true;
		} else props.setPasswordError(0);

		if (!props.signin && (confirmInput === "" || passwordInput !== confirmInput)) {
			if (confirmInput === "") props.setConfirmError(1);
			else props.setConfirmError(2);
			clearPasswordInput();
			fail = true;
		} else props.setConfirmError(0);

		return !fail;
	};

	const queryResult = useRef(false);

	const enterEvent = () => {
		if (!checkFormat()) return;
		clearUserInfo();
		setUsername(usernameInput);
		setPassword(passwordInput);
		queryResult.current = true;
	};

	useEffect(() => {
		if (username) loadUser();
	}, [username, loadUser]);

	useEffect(() => {
		if (username && password && data) {
			if (!props.signin) {
				if (data.user !== null) {
					// username is used
					props.setUsernameError(3);
					clearPasswordInput();
					clearUserInfo();
				} else if (queryResult.current) {
					// new user
					const hashPassword = hashSync(password, 10);

					setTimeout(() => {
						setLoggedIn(true);
						setLoggedInUser(username);
					}, 2500);

					createUser({
						variables: { username, password: hashPassword },
					});
					// set login success
				}
				queryResult.current = false;
			} else {
				if (data.user === null) {
					// account not found
					props.setUsernameError(2);
					clearPasswordInput();
					clearUserInfo();
				} else if (queryResult.current) {
					if (!compareSync(password, data.user.password)) {
						// incorrect password
						props.setPasswordError(2);
						clearPasswordInput();
						clearUserInfo();
					}
					// login success
					else {
						setLoggedIn(true);
						setLoggedInUser(username);
					}
				}
				queryResult.current = false;
			}
		}
	}, [
		loading,
		data,
		username,
		password,
		passwordInput,
		props,
		createUser,
		setLoggedIn,
		setLoggedInUser,
	]);

	const inputEnter = (e) => (e.key === "Enter" ? enterEvent() : undefined);

	return (
		<Modal show={props.show} onHide={props.onHide} className="popup-modal" centered>
			<Modal.Header>
				<Modal.Title>{props.signin ? "Sign In" : "Sign Up"}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form className="popup">
					<Form.Group controlId="username">
						<Form.Label>Username</Form.Label>
						<Form.Control
							disabled={loading}
							type="text"
							placeholder="Username"
							onKeyUp={inputEnter}
							onChange={handleUsernameInput}
							value={usernameInput}
						/>
						<Form.Text className="error">
							{usernameErrors[props.usernameError]}
						</Form.Text>
					</Form.Group>
					<Form.Group controlId="password">
						<Form.Label>Password</Form.Label>
						<Form.Control
							disabled={loading}
							type="password"
							placeholder="Password"
							onKeyUp={inputEnter}
							onChange={handlePasswordInput}
							value={passwordInput}
						/>
						<Form.Text className="error">
							{passwordErrors[props.passwordError]}
						</Form.Text>
					</Form.Group>
					{props.signin ? (
						<Form.Text>
							Don't have an account?{" "}
							<button
								onClick={() => {
									resetError();
									clearUserInfo();
									setConfirmInput("");
									props.setsignin(0);
								}}
								type="button"
							>
								Sign Up
							</button>
						</Form.Text>
					) : null}
					{props.signin ? null : (
						<>
							<Form.Group controlId="password-again">
								<Form.Label>Confirm Password</Form.Label>
								<Form.Control
									disabled={loading}
									type="password"
									placeholder="Confirm Password"
									onKeyUp={inputEnter}
									onChange={handleConfirmInput}
									value={confirmInput}
								/>
								<Form.Text className="error">
									{confirmErrors[props.confirmError]}
								</Form.Text>
							</Form.Group>
							<Form.Text>
								Have an account?{" "}
								<button
									onClick={() => {
										resetError();
										clearUserInfo();
										props.setsignin(1);
									}}
									type="button"
								>
									Log in now
								</button>
							</Form.Text>
						</>
					)}
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={props.onHide}>
					Cancel
				</Button>
				<Button onClick={enterEvent}>{props.signin ? "Sign In" : "Sign Up"}</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default Popup;
