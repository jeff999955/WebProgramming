import React from "react";
import ReactDOM from "react-dom";
// import './index.css';
import TodoApp from "./containers/TodoApp";
import * as serviceWorker from "./serviceWorker";

export class item {
    constructor(id, content, stat){
        this.id = id;
        this.content = content;
        this.stat = stat;
    }
}

ReactDOM.render(
    <React.StrictMode>
        <TodoApp className="todo-app__root" />
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
