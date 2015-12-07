import React, { Component } from 'react'
import Reflux from 'Reflux'
import mui, { AppBar, Card, FlatButton, TextField, RaisedButton, CircularProgress } from 'material-ui'
import DashboardActions from '../actions/DashboardActions'
import loginStore from '../stores/Login'
import { History } from 'react-router'

const Login = React.createClass({

  mixins: [Reflux.connect(loginStore), History],

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

  _handleKeyDown(e) {
    if (e.key === 'Enter' && this.state.username && this.state.password) {
      this._handleLoginClick()
    }
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
