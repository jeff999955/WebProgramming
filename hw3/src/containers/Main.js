import React, { Component } from "react";
import ListItem from "../components/ListItem";
import { item } from "../index"
import Counter from "../components/Counter"

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = { items: [], change: false, showing: 0 };
        this.rerender = this.rerender.bind(this);
    }
    add = (e) => {
        if (e.keyCode == 13 && e.target.value.length) {
            const it = new item(this.state.items.length, e.target.value, 0);
            this.state.items.push(it);
            e.target.value = "";
            this.setState(s => ({ items: s.items }));
            console.log(this.state)
        }
    }
    show(rerender) {
        if(this.state.showing == 0)
            return this.state.items.filter(e => e.stat >= 0).map(e => <ListItem update={rerender.bind(this)} list={this.state.items} key={e.id} ID={e.id} content={e.content} />);
        else if(this.state.showing == 1)
            return this.state.items.filter(e => e.stat == 0).map(e => <ListItem update={rerender.bind(this)} list={this.state.items} key={e.id} ID={e.id} content={e.content} />);
        else
            return this.state.items.filter(e => e.stat > 0).map(e => <ListItem update={rerender.bind(this)} list={this.state.items} key={e.id} ID={e.id} content={e.content} />);
    }
    rerender(id, stat) {
        var it = this.state.items[id];
        it.stat = (stat >= 0) ? !stat : stat;
        this.state.items.splice(id, 1, it);
        this.setState(state => ({ change: !state.change }));
        console.log(this.state.items);
    }
    all = () => this.setState({showing : 0})
    active = () => this.setState({showing: 1})
    completed = () => this.setState({showing : 2})
    clear = () => this.setState(s => ({items: s.items.map(e => (e.stat == 1) ? new item(e.id, e.content, -1) : e)}));
    render() {
        var rerender = this.rerender;
        return (
            <>
                <section className="todo-app__main">
                    <input onKeyUp={this.add} id="txt_input" className="todo-app__input" placeholder="What needs to be done?" />
                    <ul className="todo-app__list" id="todo_list">
                        {this.show(rerender)}
                    </ul>
                </section>
                <footer className="todo-app__footer" id="todo-footer">
                    <Counter cnt={this.state.items.filter(e => e.stat == 0).length} />
                    <ul className="todo-app__view-buttons">
                        <button id="btn_all" onClick={this.all}>All</button>
                        <button id="btn_active" onClick={this.active}>Active</button>
                        <button id="btn_completed" onClick={this.completed}>Completed</button>
                    </ul>
                    <div className="todo-app__clean">
                        <button id="clear_c" onClick={this.clear}>Clear Complete</button>
                    </div>
                </footer>
            </>
        );
    }
}

export default Main;
