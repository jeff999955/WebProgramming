import React from "react";
import Counter from "../components/Counter";

export default class Footer extends React.Component{
    constructor(props){
        super(props);
        this.state = {active:0, completed:0}
    }

    inc = () => this.setState(state => ({active: state.active + 1}));
    
    render(){
        return (
            <footer className="todo-app__footer" id="todo-footer">
                <Counter cnt={this.state.active + this.state.completed} />
                <ul className="todo-app__view-buttons">
                    <button id="btn_all">All</button>
                    <button id="btn_active" onClick={this.inc}>Active</button>
                    <button id="btn_completed">Completed</button>
                </ul>
                <div className="todo-app__clean">
                    <button id="clear_c">Clear Complete</button>
                </div>
            </footer>
        );
    }
}