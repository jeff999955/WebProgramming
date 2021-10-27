import React, { useState } from "react";
import App from "../App/App";
import { Button, Input } from "antd";
import "../App/App.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [logged, setLogged] = useState(false);

  const p = () => console.log("ee");
  return logged ? (
    <App username={username}/>
  ) : (
    <div className="App">
      <div className="App-title">
        <h1>Simple Chat Login</h1>
      </div>
        <br />
      <Input.Search
        rows={4}
        value={username}
        enterButton="Send"
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Input the your username"
        onSearch={() => {
          if(username)
            setLogged(true);
          else
            alert("Please enter the name you want to use")
        }}
      ></Input.Search>
    </div>
  );
};

export default Login;
