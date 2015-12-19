import Reflux from 'Reflux'
import React, { Component } from 'react'
import { Card, FlatButton, RaisedButton, TextField, AppBar, Tabs, Tab } from 'material-ui'
import DashboardActions from '../actions/DashboardActions'
import Store from '../stores'
import { History, Link } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

const DrugDetails = React.createClass({

  mixins: [Reflux.connect(Store), History],

  _handleChangeTabs(value, e, tab) {
    console.log("value: " + value)
  },

  // componentDidUpdate() {
  //   if (!this.state.username) {
  //     console.info('redirecting unauthorized user')
  //     this.history.pushState(null, '/login', null)
  //   }
  // },
  //
  // componentWillMount() {
  //   if (!this.state.username) {
  //     console.info('redirecting unauthorized user')
  //     this.history.pushState(null, '/login', null)
  //   }
  // },

  render() {
    return (
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
    )
  }

})

export default DrugDetails
