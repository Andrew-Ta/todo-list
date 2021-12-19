import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import UpdateTodo from "./updateTodo";

function TodoCard({ data, handleDelete, handleEdit }){
    const { _id, title, description } = data;
    return (
        <li key={_id}>
            <div className="title-description">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>

            <div className="button-container">
                <button name={_id} className="button" onClick={handleEdit}>Edit</button>
                <button name={_id} className="button" onClick={handleDelete}>delete</button>
            </div>
        </li>
    );
}



function ShowTodoList() {
    const [todo, setTodo] = useState([]);
    const [open, setOpen] = useState(false);
    const [id, setId] = useState("");
    const [update, setUpdate] = useState(false);

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

    function handleEdit(e) {
        setId(e.tartget.name);
        setOpen(true);
    }

    function handleUpdate() {
        console.log("update:", update, !update);
        setUpdate(!update);
    }

    function handleDelete(e) {
        axios.delete(`http://localhost:8000/api/todo/${e.target.name}`);

        setTodo((data) => {
            return data.filter((todo) => todo._id !== e.target.name);
        });
    }

    function handleClose() {
        setId("");
        setOpen(false); 
    }

    return (
        <section className="container">
            <Link to="/create-todo" className="button-new">
                <button className="button">New</button>
            </Link>
            <div className="contents">
                <h2>TODO List</h2>
                <ul className="list-container">
                    {todo.map((data) => {
                        <TodoCard data={data} handleDelete={handleDelete} />
                    })}
                </ul>
            </div>
            {open ? (
                <div className="update-container">
                    <div className="update-contents">
                        <p onClick={handleClose} className="close">
                            &times;
                        </p>

                        <UpdateTodo
                            _id={id}
                            handleClose={handleClose}
                            handleUpdate={handleUpdate}
                        />
                    </div>
                </div>
            ) : (
                ""
            )}
        </section>
    )
}

export default ShowTodoList;