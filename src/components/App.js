import React, { Component } from 'react'
import mui, { AppBar, Card, FlatButton,
  TextField, RaisedButton, CircularProgress } from 'material-ui'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedIn: false
    }
  }

  handleClick() {
    this.setState({
      loggedIn: true
    })
  }

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
              hintText="Username" />
              <br />
            <TextField
              className="passwordField"
              hintText="Password"
              type="password" />
              <br />
            <RaisedButton
              label="Login"
              secondary={true}
              onClick={this.handleClick.bind(this)}
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
}
export default App
