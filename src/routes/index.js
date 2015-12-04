import React from 'react'
import { render } from 'react-dom'
import App from '../components/App';
import Login from '../components/Login';
import Form from '../components/Form';
import { Router, Route, IndexRoute } from 'react-router'


render((
  <Router>
    <Route path="/" component={App}>
      <IndexRoute component={Login}/>
      <Route path="login" component={Login} />
      <Route path="form" component={Form} />
    </Route>
  </Router>
), document.getElementById('container'))
