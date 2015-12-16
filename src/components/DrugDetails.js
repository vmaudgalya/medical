import Reflux from 'Reflux'
import React, { Component } from 'react'
import { Card, FlatButton, RaisedButton, TextField, AppBar } from 'material-ui'
import DashboardActions from '../actions/DashboardActions'
import Store from '../stores'
import { History, Link } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

const MedicineDetails = React.createClass({

  mixins: [Reflux.connect(Store), History],

  _handleItemSubmit() {
    // DashboardActions.addItem()  
  }

  componentWillMount() {
    if (!this.state.username) {
      console.info('redirecting unauthorized user')
      this.history.pushState(null, '/login', null)
    }
  },

  render() {
    return (
      <div>
      <AppBar
        title="Amazing Medical App"
        showMenuIconButton={false}
        iconElementRight={<div>
          <FlatButton label="Details" />
          {' '}
          <FlatButton label="Review" />
          {' '}
          <FlatButton label="Logout" /> </div>} />
          <div className="drugDetails">
            <TextField
              hintText="Medicine Name"
              floatingLabelText="Medicine Name" />
            <br />
            <TextField
              hintText="Class"
              floatingLabelText="Class" />
            <br />
            <TextField
              hintText="Symptoms"
              floatingLabelText="Symptoms" />
            <br />
            <TextField
              hintText="Interactions"
              floatingLabelText="Interactions" />
            <br />
            <TextField
              hintText="Dosage"
              floatingLabelText="Dosage" />
            <br />
            <RaisedButton label="Submit" primary={true} onClick={this._handleItemSubmit}/>
            </div>
          </div>
    )
  }

})

export default MedicineDetails
