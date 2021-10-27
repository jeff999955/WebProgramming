import React, { Component } from "react";
import Header from "../components/Header";
import TodoMain from "./TodoMain"
import Footer from "./Footer"

class TodoApp extends Component {
    constructor(props) {
        super(props);
        this.state = {mode: 0, itemArray: []}; //mode: 0(all), 1(active), 2(completed)
    }

    setMode = (newMode) => {
        this.setState({mode: newMode});
    }

    keyIn = (event) => {
        if(event.keyCode === 13 && event.target.value !== ""){
            let text = event.target.value;
            event.target.value = "";
            // console.log("submit input!");

            this.setState((state)=>{
                const NewArray = state.itemArray.concat({text: text, done: false});
                return {itemArray: NewArray};
            });
        }
    }
    
    removeItemByIndex = (index) => {
        this.setState((state) => {
            const NewArray = state.itemArray.filter((item, j)=> index !== j);
            return {itemArray: NewArray};
        })
    }

    itemDoneByIndex = (index) => {
        this.setState((state) => {
            const NewArray = state.itemArray.map((item, j)=>{
                if(index === j){
                    let newItem = {text: item.text, done: true};
                    return newItem;
                }
                else{
                    return item;
                }
            })
            return {itemArray: NewArray}
        })
    }

    itemUndoneByIndex = (index) => {
        this.setState((state) => {
            const NewArray = state.itemArray.map((item, j)=>{
                if(index === j){
                    let newItem = {text: item.text, done: false};
                    return newItem;
                }
                else{
                    return item;
                }
            })
            return {itemArray: NewArray}
        })
    }

    mainFuncs = {keyIn: this.keyIn,
        removeItemByIndex: this.removeItemByIndex,
        itemDoneByIndex: this.itemDoneByIndex,
        itemUndoneByIndex: this.itemUndoneByIndex};

    cleanDone = ()=>{
        for(let index = this.state.itemArray.length -1; index>=0; index--){
           if(this.state.itemArray[index].done){
               this.removeItemByIndex(index);
           }
        };
    }

    render() {
        let footer = undefined;
        if(this.state.itemArray.length !== 0){
            footer = <Footer mode={this.state.mode} setMode={this.setMode} itemArray={this.state.itemArray} cleanDone={this.cleanDone}/>;
        }
        return (
            <>
                <Header text="todos" />
                <TodoMain mode={this.state.mode} mainFuncs={this.mainFuncs} itemArray={this.state.itemArray}/>
                {footer}
            </>
        );
    }

}

export default TodoApp;
