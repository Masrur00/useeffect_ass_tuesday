import React, { useEffect, useState } from 'react'

const Todo = () => {
    const [todos, setTodos] = useState([]);
    const [newData, setNewData] = useState("");

    const saveInfo = () => {
        fetch("http://localhost:8585/todos", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                title: newData,
                done: false
            })
        })
            .then(res => res.json()).then(d => {
                setTodos([...todos, d])
                setNewData("")
            })
    }

    const deleteInfo = (id) => {
        fetch(`http://localhost:8585/todos/${id}`,
            { method: 'DELETE' });
        getInfo();
    }


    const editInfo = (id) => {
        
        fetch(`http://localhost:8585/todos/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                title: newData,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                getInfo();                
            });
    }

    useEffect(() => {
        getInfo();
    }, [])

    const getInfo = () => {
        fetch("http://localhost:8585/todos")
            .then(res => res.json())
            .then(d => {
                setTodos(d);
            })
    }

    return (
        <>
            <div>
                <input value={newData} type="text" onChange={({ target }) => setNewData(target.value)} />
                <button onClick={() => saveInfo()}>+</button>
            </div>

            {todos.length ? todos.map(todo => <div key={todo.id}>{todo.id} {todo.title}
                <button onClick={() => editInfo(todo.id)}>Edit</button>
                <button onClick={() => deleteInfo(todo.id)}>Delete</button>
            </div>) : null}
        </>
    )
}

export default Todo
