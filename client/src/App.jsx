import './App.scss';
import React from 'react';
import styled from 'styled-components';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import HomePage from 'pages/HomePage';
import PageNotFound from 'pages/PageNotFound';
import CreateTodo from 'pages/CreateTodoPage';



function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/"><HomePage/></Route>
          <Route exact path="/create-todo"><CreateTodo/></Route>
          <Route path="*"><PageNotFound/></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
