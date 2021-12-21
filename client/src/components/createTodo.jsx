import { useState } from "react";
import axios from "axios";
import styled from "styled-components";

export function CreateTodo() {
    const [data, setData] = useState({ title: "", description: "" });

    function handleChange(e) {
        setData((data) => ({ ...data, [e.target.name]: e.target.value }));
    }

    function handleSubmit(e) {
        // e.preventDefault();

        const todo = {
            title: data.title,
            description: data.description,
        };

        console.log({ todo });
        axios
            .post("http://localhost:8000/api/todo", data)
            .then((res) => {
                setData({ title: "", description: "" });
                console.log(res.data.message);
            })
            .catch((err) => {
                console.log("Error couldn't create TODO");
                console.log(err.message);
            });
    }

    return (
        <NewTodoForm onSubmit={handleSubmit} className="form-container" noValidate>
            <label className="label" htmlFor="title">
                <input
                type="text"
                name="title"
                value={data.title}
                onChange={handleChange}
                className="input"
                placeholder="Title"/>
            </label>
            <label className="label" htmlFor="description">
                <textarea
                type="text"
                name="description"
                value={data.description}
                onChange={handleChange}
                className="input"
                placeholder="Description"
                    />
            </label>
            <button type="submit" className="button">
                Add
            </button>
        </NewTodoForm>
    );
}

const NewTodoForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: Arial, Helvetica, sans-serif;

    input {
        font-size: 1rem;
        border: none;
        padding: 0.5rem 1rem;
        border-top-right-radius: 0.5rem;
        border-top-left-radius: 0.5rem;
        margin-bottom: 0.35rem;
        width: 320px;
        background: linear-gradient(180deg,#fff,#e7f0db);
    }

    textarea {
        font-family: Arial, Helvetica, sans-serif;
        resize: none;
        font-size: 1rem;
        border: none;
        padding: 0.5rem 1rem;
        margin-bottom: 0.15rem;
        min-height: 6rem;
        width: 320px;
        background: linear-gradient(180deg,#e7f0db,#e7f0db);
    }
    
    button {
        background-color: #017505; /* Green */
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
