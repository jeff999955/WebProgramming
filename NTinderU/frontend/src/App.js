import React, { useState } from "react";
import IndexPage from "./IndexPage/IndexPage";
import ContextStore from "./ContextStore";
import MainPage from "./MainPage/MainPage";

const App = () => {
	const [loggedIn, setLoggedIn] = useState(false);
	const [loggedInUser, setLoggedInUser] = useState("");

	return (
		<ContextStore.Provider value={{ setLoggedIn, loggedInUser, setLoggedInUser }}>
			{loggedIn ? <MainPage /> : <IndexPage />}
		</ContextStore.Provider>
	);
};

export default App;
