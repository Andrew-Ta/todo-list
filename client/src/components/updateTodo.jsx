import { useState } from "react";
import axios from "axios";
import styled from "styled-components";

export function UpdateTodo({ _id, handleClose, handleUpdate }) {
    const [data, setData] = useState({ title: "", description: "" });

    function handleChange(e) {
        setData((data) => ({ ...data, [e.target.name]: e.target.value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        console.log({ _id }, { data });

        axios
            .put(`http://localhost:8000/api/todo/${_id}`, data)
            .then((res) => {
                setData({ title: "", description: "" });
                console.log(res.data.message);
            })
            .catch((err) => {
                console.log("Failed to update todo");
                console.log(err.message);
            });
    }

    return (
        <UpdateForm onSubmit={(e) => {
                handleSubmit(e);
                handleUpdate();
                handleClose();
            }}>

            <label htmlFor="title" className="label">
                <input
                type="text"
                name="title"
                className="input"
                onChange={handleChange}
                placeholder="Title"/>
            </label>
            <textarea
                type="text"
                name="description"
                className="input"
                onChange={handleChange}
                placeholder="Descrription"
            />
            <button type="submit" className="button">
                Update
            </button>
        </UpdateForm>
    );
}

const UpdateForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: Arial, Helvetica, sans-serif;


    input {
        font-size: 1rem;
        border: none;
        padding: 0.5rem 1rem;
        /* border-top-right-radius: 0.5rem; */
        /* border-top-left-radius: 0.5rem; */
        margin-top: 0.35rem;
        margin-bottom: 0.35rem;
        width: 320px;
        background: linear-gradient(180deg,#fff,#c3c3ae);
    }

    textarea {
        font-family: Arial, Helvetica, sans-serif;
        resize: none;
        font-size: 1rem;
        border: none;
        padding: 0.5rem 1rem;
        margin-bottom: 0.35rem;
        min-height: 6rem;
        width: 320px;
        background: linear-gradient(180deg,#c3c3ae,#c3c3ae);
    }
    
    button {
        background-color: #c3b219; /* Green */
        border: none;
        color: white;
        padding: 0.25rem 1rem;
        text-align: center;
        text-decoration: none;
        border-bottom-right-radius: 0.5rem;
        border-bottom-left-radius: 0.5rem;
        margin-bottom: 1rem;
        width: 320px;
        height: 32px;
        font-size: 1.1rem;

    }

`
