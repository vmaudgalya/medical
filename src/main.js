import ReactDOM from 'react-dom'
import React from 'react'
import App from './components/App'
require('./main.scss')

ReactDOM.render(<App message="Hello World" />, document.getElementById('container'))
