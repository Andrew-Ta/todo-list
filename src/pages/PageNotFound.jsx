import React from 'react'
import styled from 'styled-components';

const PageNotFound = () => {
    return ( 
        <ErrorStyles>
            <h1>Page Not Found</h1>
            <a href="/">Return to Home</a>
        </ErrorStyles> 
    );
}

const ErrorStyles = styled.header`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 2rem;
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    a {
        margin-top: 2rem;
        font-size: 1.5rem;
        text-decoration: none;
        color: #1f1c1c;
        border: 2px solid black;
        padding: 0 0.5rem;
        border-radius: 3px;
    }

    a:hover {
        background: #8f6517;
        color: white;
    }
    

` 
export default PageNotFound;