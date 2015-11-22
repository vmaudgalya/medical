import React, { Component, PropTypes } from 'react'

class App extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <h1>{this.props.message}</h1>      
    )
  }
}
export default App
