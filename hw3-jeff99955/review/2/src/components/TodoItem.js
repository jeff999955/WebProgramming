import React, {Component} from "react";
import x_img from "../img/x.png";

class TodoItem extends Component {
    clickHandling = () => {
        if(this.props.done){
            this.props.itemUndone();
        }
        else{
            this.props.itemDone();
        }
    }

    render() {
        return (
            <li className="todo-app__item">
                <div className="todo-app__checkbox">
                    <input type="checkbox" id={this.props.id} checked={this.props.done} onChange={this.clickHandling}/>
                    <label htmlFor={this.props.id}/>
                </div>
                <h1 className={this.props.done?"todo-app__item-detail completedItem":"todo-app__item-detail"}>
                    {this.props.text}
                </h1>
                <img src={x_img} className="todo-app__item-x" onClick={this.props.removeItem}/>
            </li>
        );
    }
}

export default TodoItem;