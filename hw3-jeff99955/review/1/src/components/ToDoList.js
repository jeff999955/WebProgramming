import React from "react";
import Item from "../components/Item";

function ToDoList(props){
    const list = props.List;
    //console.log("enter todoList. List is now:"+props.List);
    const ItemList = list.map(
        (ele, i)=>(
            (props.Filter === 0 || (props.Filter === 1 && ele.active) || (props.Filter === 2 && !ele.active) )?
            <Item key={i} content={ele.value} item_id={i} item_active={ele.active} HandleActive={props.HandleActive} HandleDelete={props.HandleDelete}/>:
            <div key={i}>{null}</div>
        )
    )
    return(
        <ul className = "todo-app__list" id="todo-list">
            {ItemList}
        </ul>
    );
}

export default ToDoList;