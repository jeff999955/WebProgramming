import React, { useState } from "react";
import Header from "../components/Header";
import ToDoList from "../components/ToDoList"


function TodoApp(){
    const[left_cnt, setLeftCnt] = useState(0);
    const[filter, setFilter] = useState(0);//0:All  1:Active    2:Completed
    const[info_list, setInfoList] = useState([]);
    

    const _handleKeyDown = (event) => {
        if (event.key === 'Enter' && event.target.value !== '') {
            //console.log("Before push, list_len: " + info_list.length);
            info_list.push({value: event.target.value, active: true});
            setInfoList( [...info_list] );
            setLeftCnt(left_cnt+1);
            //console.log("After push, list_len: " + info_list.length+" info_List is now: "+ info_list);
            event.target.value="";
        }
    }

    const _handleActive = (index) => {
        info_list[index].active = (info_list[index].active)? false: true;
        if(info_list[index].active) setLeftCnt(left_cnt+1);
        else setLeftCnt(left_cnt-1);
        //console.log(index+" active becomes "+ info_list[index].active);
        setInfoList( [...info_list] );
    }
    
    const _handleFilter = (type) =>{
        setFilter(type);
    }

    const _handleDelete = (index) =>{
        if(info_list[index].active) setLeftCnt(left_cnt-1);
        info_list.splice(index, 1);
        setInfoList( [...info_list] );
    }

    const _handleClearCompleted = () =>{
        const newList = info_list.filter( ele => ele.active);
        setInfoList( newList );
    }
    
    return (
        <>
            <Header text = "todos" />
            <section className = "todo-app__main">
            <input className="todo-app__input" id="todo-input" type="text" placeholder="What needs to be done?" onKeyDown={_handleKeyDown} />
            <ToDoList List={info_list} Filter={filter} HandleActive={_handleActive} HandleDelete ={_handleDelete}/>
            </section>
            <footer className = "todo-app__footer" id="todo-footer">
            <div className = "todo-app__total" >{left_cnt} Left</div>
                <ul className = "todo-app__view-buttons">
                    <li ><button onClick={()=>_handleFilter(0)} >All</button></li>
                    <li ><button onClick={()=>_handleFilter(1)} >Active</button></li>
                    <li ><button onClick={()=>_handleFilter(2)} >Completed</button></li>
                </ul>
                <div className = "todo-app__clean">
                    <button onClick={()=>_handleClearCompleted()}>Clear completed</button>
                </div>
            </footer>
        </>
    );
    
}

export default TodoApp;
