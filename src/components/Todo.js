import React , {useState,useEffect} from "react";
import axios from 'axios';
const Todo = () => {
    const [todo, setTodo] = useState([])
    const URL = "https://jsonplaceholder.typicode.com/todos";
    useEffect(() => {
        axios
            .get(URL)
            .then(res => { setTodo(res.data.slice(0, 10)) })
    }, [])
    const onChangeHandler = (id) => {
        let newToDO = [...todo]
        newToDO.forEach( item => {
            if(item.id === id){
                item.completed = !item.completed
            }
        })
        setTodo(newToDO)
    }
    const filterHandler = () => {
        let newToDO = []
        todo.forEach( item => {
            if(item.completed){
                newToDO.push(item)
            }
        })
        setTodo(newToDO)
    }

    const showAllHandler = () => {
        axios
            .get(URL)
            .then(res => { setTodo(res.data.slice(0, 10)) })
    }

    const todoList = todo.map((todo) => (
        todo.completed ? <div className='content-container active' id={todo.id} key={todo.id}>
            <input type='checkbox' checked={todo.completed} onChange={() => onChangeHandler(todo.id)} />
            <p className='content-paragraph'>{todo.title}</p>
        </div> : <div className='content-container' id={todo.id} key={todo.id}>
            <input type='checkbox' checked={todo.completed} onChange={() => onChangeHandler(todo.id)} />
            <p className='content-paragraph'>{todo.title}</p>
        </div>
    ));
    return (
        <div className="todo-container">
           {todoList}
           <button onClick={() => filterHandler()} className="filter-btn">
                Filter by completed
           </button>
           <button onClick={() => showAllHandler()} className="all-btn">
                Show All
           </button>
        </div>
    )
}

export default Todo;
