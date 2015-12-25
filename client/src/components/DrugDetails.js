import Reflux from 'Reflux'
import React from 'react'
import { RaisedButton, TextField, SelectField } from 'material-ui'
import DashboardActions from '../actions/DashboardActions'
import Store from '../stores'
import { History } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

const DrugDetails = React.createClass({

  mixins: [Reflux.connect(Store), History],

  _handleItemSubmit() {
    let today = new Date()
    let drug = {
      drugName: this.state.drugName,
      drugClass: this.state.drugClass,
      drugRegulation: (this.state.drugRegulation ? this.state.drugRegulation : 'Over the counter'),
      drugSymptoms: this.state.drugSymptoms,
      drugInteractions: this.state.drugInteractions,
      drugDosage: this.state.drugDosage,
      username: this.state.username,
      date: `${today.getFullYear()}-${(today.getMonth()%12)+1}-${today.getDate()}`
    }
    if (this.state.isEditing) {
      console.log('editting drug right now')
      // DashboardActions.updateDrug(drug)
    } else {
      DashboardActions.addDrug(drug)
      console.log('submitted drug: ' + JSON.stringify(drug))
    }
  },

  _handleNameOnChange(e) {
    this.setState({ drugName: e.target.value })
  },

  _handleClassOnChange(e) {
    this.setState({ drugClass: e.target.value })
  },

  _handleRegulationOnChange(e, selectedIndex, menuItem) {
    this.setState({ drugRegulation: menuItem.text })
  },

  _handleSymptomsOnChange(e) {
    this.setState({ drugSymptoms: e.target.value })
  },

  _handleInteractionsOnChange(e) {
    this.setState({ drugInteractions: e.target.value })
  },

  _handleDosageOnChange(e) {
    this.setState({ drugDosage: e.target.value })
  },

  _validateFieldsPopulated() {
    if (this.state.drugName && this.state.drugClass &&
      this.state.drugSymptoms && this.state.drugInteractions && this.state.drugDosage) {
        return false
      }
    return true
  },

  componentDidMount() {
    this.refs.drugNameField.setValue(this.state.drugName)
    this.refs.classField.setValue(this.state.drugClass)
    this.refs.symptomField.setValue(this.state.drugSymptoms)
    this.refs.interactionsField.setValue(this.state.drugInteractions)
    this.refs.dosageField.setValue(this.state.drugDosage)
  },

  render() {
    let options = [
       { payload: '1', text: 'Over the counter' },
       { payload: '2', text: 'Prescription' }
    ]
    return (
      <div className="drugDetails">
        <TextField
          ref="drugNameField"
          hintText="Drug Name"
          floatingLabelText="Drug Name"
          onChange={this._handleNameOnChange} />
        <br />
        <TextField
          hintText="Class"
          ref="classField"
          floatingLabelText="Class"
          onChange={this._handleClassOnChange} />
        <br />
        <SelectField
          style={{marginTop: '20px'}}
          selectedIndex={this.state.drugRegulation === 'Prescription' ? 1 : 0}
          ref="regulationMenu"
          menuItems={options}
          onChange={this._handleRegulationOnChange} />
        <br />
        <TextField
          hintText="Symptoms"
          ref="symptomField"
          floatingLabelText="Symptoms"
          onChange={this._handleSymptomsOnChange} />
        <br />
        <TextField
          hintText="Interactions"
          ref="interactionsField"
          floatingLabelText="Interactions"
          onChange={this._handleInteractionsOnChange} />
        <br />
        <TextField
          hintText="Dosage"
          ref="dosageField"
          floatingLabelText="Dosage"
          onChange={this._handleDosageOnChange} />
        <br />
        <RaisedButton
          label="Submit"
          primary={true}
          disabled={this._validateFieldsPopulated()}
          onClick={this._handleItemSubmit} />
      </div>
    )
  }

})

export default DrugDetails
