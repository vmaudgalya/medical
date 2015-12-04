import React, { Component } from 'react'
import Reflux from 'Reflux'
import mui, { AppBar, Card, FlatButton, TextField, RaisedButton, CircularProgress } from 'material-ui'
import DashboardActions from '../actions/dashboard'
import _ from 'lodash'
import { History } from 'react-router'

let users = [
    {"username":"admin", "password":"admin"},
    {"username":"user2", "password":"password2"},
    {"username":"user3","password":"password3"}
]


const store = Reflux.createStore({
  listenables: [DashboardActions],

  authenticateUser(username, password, login) {
    let userExists = false
    let user = { username, password }
    for (let i = 0; i < users.length; i++) {
      if (_.isEqual(users[i], user)) {
        userExists = true
      }
    }
    if (userExists) {
      this.trigger({
        loggedIn: true,
        isLoading: false
      })
      login()
      console.log('Success!');
    } else {
      this.trigger({
        isLoading: false,
        usernameErrorText: 'Invalid login',
        passwordErrorText: 'Invalid login'
      })
      console.log('Failure');
    }
  },

  onLogin(username, password, router) {
    // Perform authentication here
    this.trigger({
      isLoading: true
    })
    let errorMessage = "This field is required"
    if (!username && !password) {
      this.trigger({
        usernameErrorText: errorMessage,
        passwordErrorText: errorMessage
      })
      return
    } else if (!username) {
      this.trigger({
        usernameErrorText: errorMessage,
        passwordErrorText: ""
      })
      return
    } else if (!password) {
      this.trigger({
        usernameErrorText: "",
        passwordErrorText: errorMessage
      })
      return
    }
    this.trigger({
      usernameErrorText: "",
      passwordErrorText: ""
    })

    setTimeout(() => this.authenticateUser(username, password, router), 3000) // Simulate API call

  },

  getInitialState() {
    return {
      isLoading: false,
      loggedIn: false,
      username: null,
      password: null,
      usernameErrorText: "",
      passwordErrorText: ""
    }
  }
})

const Login = React.createClass({

  mixins: [Reflux.connect(store), History],

  _handleUsername(e) {
    e.preventDefault()
    this.setState({ username: e.target.value })
  },

  _handlePassword(e) {
    this.setState({ password: e.target.value })
  },

  _handleLoginClick() {
    DashboardActions.login(this.state.username, this.state.password, this.navigateAfterSomethingHappened)
  },

  navigateAfterSomethingHappened() {
    if (this.state.loggedIn) {
      this.history.pushState(null, '/form', null);
    }
  },

  render() {
    let view = this.state.isLoading ?
    <CircularProgress
      id="LoginLoader"
      mode="indeterminate" /> :
        <div>
          <AppBar
            title="Medical App"
            showMenuIconButton={false} />
          <Card className="loginCard">
              <br />
            <TextField
              label="Username"
              floatingLabelText="Username"
              hintText="Username"
              errorText={this.state.usernameErrorText}
              onChange={this._handleUsername} />
              <br />
            <TextField
              className="passwordField"
              label="Password"
              floatingLabelText="Password"
              hintText="Password"
              errorText={this.state.passwordErrorText}
              type="password"
              onChange={this._handlePassword} />
              <br />
            <RaisedButton
              label="Login"
              secondary={true}
              disabled={!(this.state.username && this.state.password)}
              onClick={this._handleLoginClick}
              style={{
                marginTop: '40px',
                marginLeft: '80px'
              }} />
          </Card>
        </div>
    return (
      <div className="centered">
        {view}
        {this.props.children}
      </div>
    )
  }

})

export default Login
