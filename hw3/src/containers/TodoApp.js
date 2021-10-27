import React, { Component } from "react";
import Header from "../components/Header";
import Main from "./Main";

class TodoApp extends Component {
    render() {
        return (
            <>
                <Header text="todos" />
                <Main />
            </>
        );
    }
}

export default TodoApp;
