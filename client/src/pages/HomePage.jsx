import React from 'react';
// import styled from 'styled-components';
import {ShowTodoList} from "../components/showTodoList";

const HomePage = () => {
    return ( 
        <div>
            <h1>To Do List Manager</h1>
            <ShowTodoList/>
        </div> 
    );
}

export default HomePage;