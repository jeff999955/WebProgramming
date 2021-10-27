import React, { Component } from "react";
import Total from "../components/Total"
import CleanButton from "../components/CleanButton"

class Footer extends Component {
    render() {
        let itemNum = this.props.itemArray.length;
        let leftNum = this.props.itemArray.filter((item)=>!item.done).length;
        let doneNum = itemNum - leftNum;
        let cleanButtonStyle = {visibility: "visible"};
        if(doneNum === 0){
            cleanButtonStyle = {visibility: "hidden"};
        }

        return (
            <footer className="todo-app__footer" id="todo-footer">
                <Total leftNum={leftNum}/>
                <div className="todo-app__view-buttons">
                    <button onClick={()=>this.props.setMode(0)} className={this.props.mode === 0 ? "chosenButton":""}>All</button>
                    <button onClick={()=>this.props.setMode(1)} className={this.props.mode === 1 ? "chosenButton":""}>Active</button>
                    <button onClick={()=>this.props.setMode(2)} className={this.props.mode === 2 ? "chosenButton":""}>Completed</button>
                </div>
                <CleanButton cleanDone={this.props.cleanDone} cleanButtonStyle={cleanButtonStyle}/>
            </footer>
        )
    }
}

export default Footer;