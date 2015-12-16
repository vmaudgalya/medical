import React, { Component } from 'react'
import Reflux from 'Reflux'
import mui, { AppBar, Card, FlatButton, TextField, RaisedButton, CircularProgress } from 'material-ui'
import DashboardActions from '../actions/DashboardActions'
import Store from '../stores'
import { History } from 'react-router'

const Login = React.createClass({

  mixins: [Reflux.connect(Store), History],

  _handleUsername(e) {
    this.setState({ username: e.target.value, usernameErrorText: "" })
  },

  _handlePassword(e) {
    this.setState({ password: e.target.value, passwordErrorText: "" })
  },

  _handleLoginClick() {
    DashboardActions.login(this.state.username, this.state.password, this.navigateAfterSomethingHappened)
  },

  _handleKeyDown(e) {
    if (e.key === 'Enter' && this.state.username && this.state.password) {
      this._handleLoginClick()
    }
  },

  _validateUsername(e) {
    let errorText = ""
    if (!e.target.value) { errorText = "Invalid username" }
    this.setState({ usernameErrorText: errorText })
  },

  _validatePassword(e) {
    let errorText = ""
    if (!e.target.value) { errorText = "Invalid password" }
    this.setState({ passwordErrorText: errorText })
  },

  navigateAfterSomethingHappened() {
    this.history.pushState(null, '/details', null);
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
              onBlur={this._validateUsername}
              onChange={this._handleUsername}
              onKeyDown={this._handleKeyDown} />
              <br />
            <TextField
              className="passwordField"
              label="Password"
              floatingLabelText="Password"
              hintText="Password"
              errorText={this.state.passwordErrorText}
              type="password"
              onBlur={this._validatePassword}
              onChange={this._handlePassword}
              onKeyDown={this._handleKeyDown} />
              <br />
            <RaisedButton
              label="Login"
              type="submit"
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
