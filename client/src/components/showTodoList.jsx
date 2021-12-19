import { useState, useEffect } from "react";
import axios from "axios";

function TodoCard({ data }){
    const { _id, title, description } = data;
    return (
        <li key={_id}>
            <div className="title-description">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>

            <div className="button-container">
                <button className="button">Edit</button>
                <button className="button">Delete</button>
            </div>
        </li>
    );
}

export function ShowTodoList() {
    const [todo, setTodo] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/todo")
            .then((res) => {
                console.log(res.data);
                setTodo(res.data);
            })
            .catch((err) => {
                console.log(err)
            });
    }, []);

    return (
        <section className="container">
            <div className="contents">
                <h2>TODO List</h2>
                <ul className="list-container">
                    {todo.map((data) => {
                        <TodoCard data={data} />
                    })}
                </ul>
            </div>
        </section>
    )
}