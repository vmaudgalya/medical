import React from 'react'
import { render } from 'react-dom'
import App from '../components/App'
import Login from '../components/Login'
import DrugDetails from '../components/DrugDetails'
import DrugList from '../components/DrugList'
import { Router, Route, IndexRoute } from 'react-router'


render((
  <Router>
    <Route path="/" component={App}>
      <IndexRoute component={Login}/>
      <Route path="login" component={Login} />
      <Route path="details" component={DrugDetails} />
      <Route path="review" component={DrugList} />
    </Route>
  </Router>
), document.getElementById('container'))
