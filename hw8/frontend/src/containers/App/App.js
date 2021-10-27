import React, { useEffect, useState, useRef } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";

import {
  MESSAGES_QUERY,
  CREATE_MESSAGE_MUTATION,
  MESSAGES_SUBSCRIPTION,
} from "../../graphql";
import "./App.css";
import { Button, Input, message, Tag } from "antd";

const App = (args) => {
  const current_username = args.username;
  const [username, setUsername] = useState("");
  const [body, setBody] = useState("");
  const bodyRef = useRef(null);
  const msgRef = useRef(null);

  const scrollToBottom = () => {
    msgRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const { loading, error, data, subscribeToMore } = useQuery(MESSAGES_QUERY, {
    variables: { username: current_username },
  });
  const [addMessage] = useMutation(CREATE_MESSAGE_MUTATION);

  const displayStatus = (s) => {
    if (s.msg) {
      const { type, msg } = s;
      const content = {
        content: msg,
        duration: 0.5,
      };

      switch (type) {
        case "success":
          message.success(content);
          break;
        case "info":
          message.info(content);
          break;
        case "danger":
        default:
          message.error(content);
          break;
      }
    }
  };
  useEffect(() => {
    console.log("data changed");
    console.log(data);
    scrollToBottom();
  }, [data]);

  useEffect(() => {
    subscribeToMore({
      document: MESSAGES_SUBSCRIPTION,
      variables: { username: current_username },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newMsg = subscriptionData.data.message.data;
        if (newMsg.from !== current_username) {
          displayStatus({
            type: "info",
            msg: `Got a new message from ${newMsg.from}`,
          });
        }
        console.log({
          ...prev,
          message: [newMsg, ...prev.messages],
        });
        return {
          ...prev,
          messages: [...prev.messages, newMsg],
        };
      },
    });
  }, [subscribeToMore]);

  return (
    <div className="App">
      <div className="App-title">
        <h1>Simple Chat</h1>
        <Button
          type="primary"
          danger
          onClick={() => {
            console.log(data);
            console.log("not implemented");
          }}
        >
          Clear
        </Button>
      </div>
      <div>
        <h3>Currently Logged in as {current_username}</h3>
      </div>
      <div className="App-messages">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error</p>
        ) : (
          data.messages.map(({ from, to, body }, i) => (
            <p className="App-message" key={i}>
              <Tag color="blue">{from}</Tag> {body}
            </p>
          ))
        )}
        <div ref={msgRef}></div>
      </div>
      <Input
        placeholder="username you want to send to"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ marginBottom: 10 }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            bodyRef.current.focus();
          }
        }}
      ></Input>
      <Input.Search
        rows={4}
        value={body}
        ref={bodyRef}
        enterButton="Send"
        onChange={(e) => setBody(e.target.value)}
        placeholder="Type your message here..."
        onSearch={(msg) => {
          if (!msg || !username) {
            displayStatus({
              type: "error",
              msg: "Please enter a username and a message body.",
            });
            return;
          } else if (!msg) {
            displayStatus({
              type: "error",
              msg: "Please enter a message to send.",
            });
            return;
          } else if (!username) {
            displayStatus({
              type: "error",
              msg: "Please enter a username to send.",
            });
            return;
          } else if (username == current_username) {
            displayStatus({
              type: "error",
              msg: "You should not send message to yourself.",
            });
            return;
          } else {
            displayStatus({
              type: "success",
              msg: `Message sent to ${username}`,
            });
            console.log({
              from: current_username,
              to: username,
              body: body,
            });
            addMessage({
              variables: {
                from: current_username,
                to: username,
                body: body,
              },
            });
            setBody("");
          }
        }}
      ></Input.Search>
    </div>
  );
};

export default App;
