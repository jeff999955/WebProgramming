import React from "react";
export default ({ cnt }) => {
    //    const {text} = props // expected to be { text: "" }
    return (
        <div className="todo-app__total">
            <p id="todo_counter"> {cnt ? cnt : "nothing "} left to do </p> 
        </div>
    );
};
