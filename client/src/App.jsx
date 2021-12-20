import './App.scss';
import React from 'react';
import styled from 'styled-components';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import PageNotFound from 'pages/PageNotFound';
import { ShowTodoList } from 'components/showTodoList';
import { CreateTodo } from 'components/createTodo';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={ShowTodoList} />          
          <Route exact path="/create-todo" component={CreateTodo} />
          <Route path="*"><PageNotFound/></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
