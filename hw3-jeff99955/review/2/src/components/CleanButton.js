import React from "react";
export default ({cleanDone, cleanButtonStyle}) => {
    return(
        <div className="todo-app__clean" style={cleanButtonStyle}>
            <button className="button" onClick={cleanDone}>Clear completed</button>
        </div>
    )
}