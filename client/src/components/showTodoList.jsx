import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { UpdateTodo } from "./updateTodo";
import { CreateTodo } from "./createTodo" 

function TodoCard({ data, handleDelete, handleEdit }){
    const { _id, title, description } = data;

    return (
        <ListItemStyles key={_id}>
            <TodoDivStyles>                
                <h3>{title}</h3>  
                <p>{description}</p>
            </TodoDivStyles>
            <ButtonDivStyles>
                <EditTodoButton className="button" name={_id} onClick={handleEdit}>Edit</EditTodoButton>
                <DeleteTodoButton className="button" name={_id} onClick={handleDelete}>Delete</DeleteTodoButton>                    
            </ButtonDivStyles>     
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
                .get("/api/todo")
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
            <header>
                <h1>Todo List</h1>
            </header>

            <CreateUpdateDiv>
                <CreateTodoDiv>
                    <h2>New Todo</h2>
                    <CreateTodo _id={id} handleUpdate={handleUpdate} />
                </CreateTodoDiv>
                {open ? (
                <UpdateDiv>
                    <h2>Edit Todo</h2>
                    <p onClick={handleClose} className="close">Minimize</p>
                    <UpdateTodo _id={id}
                                handleClose={handleClose}
                            handleUpdate={handleUpdate} />
                </UpdateDiv>
                ) : (
                    ""
                )}    
            </CreateUpdateDiv>         
            
            <ContentStyles>
                <ul>
                    {todo.map((data) => (
                        <TodoCard
                            data={data}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                        />
                    ))}
                </ul>
            </ContentStyles>
        {/* {open ? (
            <UpdateDiv>
                <h2>Edit Todo</h2>
                <p onClick={handleClose} className="close">Minimize</p>
                <UpdateTodo _id={id}
                            handleClose={handleClose}
                        handleUpdate={handleUpdate} />
            </UpdateDiv>
        ) : (
            ""
        )} */}
        </MainPageStyles>
    );
}

const MainPageStyles = styled.section`
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    /* justify-content: center; */
    text-align: center;
    font-family: Arial, Helvetica, sans-serif;
    width: 50%;
    border-radius: 10px;
    min-height: 11rem;
    background: linear-gradient(90deg,#292828,#2e2b29);
    padding: 2rem;

    header {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 2.5rem;
        margin-bottom: 2rem;
        color: #ffffff;
        background: linear-gradient(180deg,#847d7d,#8d8b8a);
        width: 100%;
        height: 5rem;
        border-radius: 5px;
        
    }
`

const CreateUpdateDiv = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
`

//CREATE TODO SECTION
const CreateTodoDiv = styled.div`
    h2 {
        color: #fff;
        font-size: 2rem;
        margin-bottom: 1rem;
    }
    
    margin-bottom: 2rem;
`

// UPDATE SECTION
const UpdateDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    h2 {
        color: white;
        font-size: 2rem;
        margin-bottom: 1rem;
    }

    p {
        width: 320px;
        background-color: #f8a305;
        border-top-right-radius: 0.5rem;
        border-top-left-radius: 0.5rem;
        color: white;
        padding: 0.25rem 1rem;
        text-align: center;
        text-decoration: none;
    }
`

// TODO ITEM SECTION
const ContentStyles = styled.div`
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    ul {
        width: 100%;
    }

`

const ListItemStyles = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
    color: #fff;
    background: linear-gradient(90deg,#805b36,#68615e);
    padding: 16px;
    border-radius: 5px; 
`
const TodoDivStyles = styled.div`
    display:flex;
    flex-direction: column;
    align-items: flex-start;
    margin-right: 1rem;

    h3 {
        margin-bottom: 0.5rem;
    }
`

const EditTodoButton = styled.button`
    background-color: #c3b219; /* Green */
    border: none;
    color: white;
    padding: 0.25rem 1rem;
    text-align: center;
    text-decoration: none;
    border-radius: 5px;
    width: 64px;
    margin-bottom: 0.5rem;
`

const DeleteTodoButton = styled.button`
    background-color: #6b0202; /* Green */
    border: none;
    color: white;
    padding: 0.25rem 1rem;
    text-align: center;
    text-decoration: none;
    border-radius: 5px;
    width: 64px;
`



const ButtonDivStyles = styled.div`
    display:flex;
    flex-direction: column;
    align-items: flex-end;
    width: 30%;


`