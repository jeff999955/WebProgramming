import React, {Component} from "react";
import Input from "../components/Input"
import TodoList from "./TodoList"


class TodoMain extends Component {
    render() {
        return (
        <section className = "todo-app__main">
            <Input onKeyDown={this.props.mainFuncs.keyIn}/>
            <TodoList itemArray={this.props.itemArray} 
            removeItemByIndex={this.props.mainFuncs.removeItemByIndex}
            itemDoneByIndex={this.props.mainFuncs.itemDoneByIndex}
            itemUndoneByIndex={this.props.mainFuncs.itemUndoneByIndex}
            mode={this.props.mode}/>
        </section>
        );
    }

}

export default TodoMain;