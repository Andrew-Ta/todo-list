import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { UpdateTodo } from "./updateTodo";
import { CreateTodo } from "./createTodo" 

function TodoCard({ data, handleDelete, handleEdit }){
    const { _id, title, description } = data;

    return (
        <ListItemStyles key={_id}>
            <CardTopStyles>
                <h3>{title}</h3>                      
                <p>{description}</p>
                <div>
                    <EditTodoButton className="button" name={_id} onClick={handleEdit}>Edit</EditTodoButton>
                    <DeleteTodoButton className="button" name={_id} onClick={handleDelete}>Delete</DeleteTodoButton>                    
                </div>     
            </CardTopStyles>
        </ListItemStyles>
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
        <MainPageStyles>
            <ContentStyles>
                <h1>Todo List</h1>
                {/* <div>
                    <Link to="/create-todo" className="button-new">
                        <NewTodoButton>New</NewTodoButton>
                    </Link>
                </div> */}

                <div>
                    <div>
                        <CreateTodo
                            _id={id}
                            handleUpdate={handleUpdate}
                        />
                    </div>
                </div>    

                <ul className="list-container">
                    {todo.map((data) => (
                        <TodoCard
                            data={data}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                        />
                    ))}
                </ul>
            </ContentStyles>

            {open ? (
                <div className="update-container">
                    <div className="update-contents">
                        <p onClick={handleClose} className="close">&times;</p>
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
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 0;
    margin: 0;

    h1 {
        font-size: 2rem;
        margin-bottom: 2rem;
        color: #fff;
    }

`

const ContentStyles = styled.div`
    margin: 5rem;
    padding: 2rem;
    width: 90%;
    /* border: 1px solid gray; */
    border-radius: 5px;
    min-height: 7rem;
    background: linear-gradient(90deg,#292828,#2e2b29);
`

const ListItemStyles = styled.li`
    align-items: center;
    margin: 4px auto;
    color: #fff;
    background: linear-gradient(90deg,#805b36,#68615e);
    padding: 16px;
    border-radius: 5px;
`

const CardTopStyles = styled.div`
    display: flex;
    justify-content: space-between;
`

const EditTodoButton = styled.button`
    background-color: #cac713; /* Green */
    border: none;
    color: white;
    padding: 0.25rem 1rem;
    text-align: center;
    text-decoration: none;
    border-radius: 5px;
    margin-right: 1rem;
`

const DeleteTodoButton = styled.button`
    background-color: #b90b0b; /* Green */
    border: none;
    color: white;
    padding: 0.25rem 1rem;
    text-align: center;
    text-decoration: none;
    border-radius: 5px;
`