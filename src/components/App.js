import React, { Component } from 'react'
import Reflux from 'Reflux'
import mui, { AppBar, Card, FlatButton, TextField, RaisedButton, CircularProgress } from 'material-ui'
import actions from '../actions/dashboard'

const store = Reflux.createStore({
  listenables: [actions],

  onLogin() {
    // Perform authentication here
    this.trigger({ loggedIn:true })
  },

  getInitialState() {
    return { loggedIn: false }
  }
})

const App = React.createClass({

  mixins: [Reflux.connect(store)],

  handleUsername(e) {
    e.preventDefault()

  },

  handlePassword(e) {
    e.preventDefault()
  },

  render() {
    let view = this.state.loggedIn ?
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
              hintText="Username" />
              <br />
            <TextField
              className="passwordField"
              label="Username"
              hintText="Password"
              type="password" />
              <br />
            <RaisedButton
              label="Login"
              secondary={true}
              onClick={actions.login}
              style={{
                marginTop: '40px',
                marginLeft: '80px'
              }} />
          </Card>
        </div>

    return (
      <div className="centered">
        {view}
      </div>
    )
  }

})

export default App
