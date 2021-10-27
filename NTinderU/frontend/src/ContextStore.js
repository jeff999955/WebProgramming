import { createContext } from "react";

export default createContext({
	loggedIn: false,
	setLoggedIn: () => {},
	loggedInUser: false,
	setLoggedInUser: () => {},
});
