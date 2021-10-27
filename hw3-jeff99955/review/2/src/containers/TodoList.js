import React, {Component} from "react";
import TodoItem from "../components/TodoItem"

class TodoList extends Component {
    render() {
        return (
            <ul className="todo-app__list">
                {this.showItem()}
            </ul>
        );
    }

    showItem() {
        let showList = this.props.itemArray.map((item, index)=>{
            if(this.checkMode(item)){
                return (<TodoItem text={item.text} id={index} key={index}
                done={item.done}
                removeItem={() => {this.props.removeItemByIndex(index)} }
                itemDone={() => {this.props.itemDoneByIndex(index)} }
                itemUndone={() => {this.props.itemUndoneByIndex(index)} }/>)
                }})
        return showList;
    }

    checkMode(item) {
        switch(this.props.mode){
            case 0:
                return true
            case 1:
                return item.done===false;
            case 2:
                return item.done===true;
            default:
                break;
        }
    }
}

export default TodoList;