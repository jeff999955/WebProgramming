import React from 'react';
export default ({onKeyDown}) => {
    return (
        <input type="text" placeholder="What needs to be done?" className="todo-app__input" onKeyDown={onKeyDown}/>
    )
}