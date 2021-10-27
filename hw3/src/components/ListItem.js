import React from "react";
import x from "../img/x.png";

class ListItem extends React.Component {
    constructor(props){
        super(props);
        this.state = {lit : props.list[props.ID].stat};
    }
    trigger = (event) => {
        this.setState(s => ({lit: !s.lit}));    
    }

    delete = (event) => {
        this.setState(s => ({lit: -1}));
        console.log(this.state.lit);
        console.log(typeof this.props.update);
    }

    render(){
        var L = this.props.list;
        var ID = this.props.ID;
        const selected = {
            textDecoration: "line-through",
            opacity: 0.5
        }
        const nonselected = {
            textDecoration: "", opacity: 1
        }
        var rerender = this.props.update;
        return (
            <li className="todo-app__item">
                <div className="todo-app__checkbox">
                    <input type="checkbox" id={ID}  defaultChecked={L[ID].stat} onChange={() => {this.trigger(); rerender(this.props.ID, (this.state.lit)? 1 : 0)}}></input>
                    <label htmlFor={ID}></label>
                </div>
                <h1 className="todo-app__item-detail" style={(this.state.lit == 1) ? selected : nonselected}>
                    {this.props.content}
                </h1>
                <img alt="" src={x} className="todo-app__item-x" onClick={() => rerender(this.props.ID, -1)} />
            </li>
        );
    }
}

export default ListItem;

