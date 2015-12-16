import React, { Component } from 'react'
import { History } from 'react-router'

class App extends Component {
  constructor(){
    super()
  }

  render(){
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

export default App
