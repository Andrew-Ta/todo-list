import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { UpdateTodo } from "./updateTodo";

function TodoCard({ data, handleDelete, handleEdit }){
    const { _id, title, description } = data;

    return (
        <li key={_id}>
            <div className="title-description">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>

            <div className="button-container">
                <button className="button" name={_id} onClick={handleEdit}>Edit</button>
                <button className="button" name={_id} onClick={handleDelete}>Delete</button>
            </div>
        </li>
    );
}



export function ShowTodoList() {
    const [todo, setTodo] = useState([]);
    const [open, setOpen] = useState(false);
    const [id, setId] = useState("");
    const [update, setUpdate] = useState(false);

    useEffect(
        function () {
            axios
                .get("http://localhost:8000/api/todo")
                .then((res) => {
                    console.log(res.data);
                    setTodo(res.data);
                })
                .catch((err) => {
                    console.log(err.message);
                });
        },
        [update]
    );

    function handleEdit(e) {
        setId(e.target.name); 
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
        <MainPageStyles className="container">
            <div className="contents">
                <h1>Todo List</h1>            
                <Link to="/create-todo" className="button-new">
                    <button className="button">New</button>
                </Link>
                <ul className="list-container">
                    {todo.map((data) => (
                        <TodoCard
                            data={data}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                        />
                    ))}
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
        </MainPageStyles>
    );
}

const MainPageStyles = styled.section`
    display: flex;
    justify-content: center;
    border: 1px solid gray;
    border-radius: 5px;
    text-align: center;
    padding: 2rem;
    margin: 5rem;

    h1 {
        font-size: 2rem;
        margin-bottom: 2rem;
    }

    button {
        /* Will change this to icons */
        text-decoration: none;
        color: #1f1c1c;
        border: 2px solid black;
        border-radius: 3px;
        padding: 0.11rem 0.5rem 0.25rem 0.5rem;
    }

`