import Reflux from 'Reflux'
import React from 'react'
import { RaisedButton, TextField, DropDownMenu } from 'material-ui'
import DashboardActions from '../actions/DashboardActions'
import Store from '../stores'
import { History, Link } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

const DrugDetails = React.createClass({

  mixins: [Reflux.connect(Store), History],

  _handleItemSubmit() {
    // submit based on state of all input fields
    console.log('submitted item');
  },

  render() {
    let options = [
       { payload: '1', text: 'Over the counter' },
       { payload: '2', text: 'Prescription' }
    ]

    return (
      <div className="drugDetails">
        <TextField
          hintText="Drug Name"
          floatingLabelText="Drug Name" />
        <br />
        <TextField
          hintText="Class"
          floatingLabelText="Class" />
        <br />
        <DropDownMenu menuItems={options} labelStyle={{fontFamily: 'Roboto, sans-serif'}}/>
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
