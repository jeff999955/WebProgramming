import React from "react";
import deleteButton from "../img/x.png";

function Content(props){
    if(props.item_active === true){
        return <h1 className="todo-app__item-detail" >{props.content}</h1>;
    }else{
        return <h1 className="todo-app__item-detail" style={{ textDecoration: 'line-through' }}>{props.content}</h1>;
    }
}

//props:content, item_id, item_display, item_active
function Item(props){
    const _handleActive = props.HandleActive;
    const _handleDelete = props.HandleDelete;
    const i = props.item_id;
    return(
        <li className="todo-app__item" >
            <div className="todo-app__checkbox">
                <input id={i} type="checkbox" onClick= {(e)=> _handleActive(i)} checked = {!props.item_active}/>
                <label htmlFor={i}></label>
            </div>
            <Content item_active={props.item_active} content={props.content}/>
            <img alt={i} src={deleteButton} className="todo-app__item-x" onClick={()=>_handleDelete(i)}></img>
        </li>
    );
}
export default Item;
